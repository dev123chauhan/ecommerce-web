import  { useState, useEffect } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../slice/WishlistSlice";
import { toast } from "sonner";
import wishlistGif from "../../assets/Wishlist.gif";
import { Skeleton } from "antd";
import ProductRecommendations from "./RecommendedProduct";

const WishlistSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">

          <div className="relative p-4 bg-gray-100 dark:bg-gray-700">
            <div className="absolute top-2 right-2">
              <Skeleton.Button active size="small" shape="circle" />
            </div>
            <div className="absolute top-2 left-2">
              <Skeleton.Button active size="small"  />
            </div>
            <div className="flex justify-center items-center h-full mt-8">
              <Skeleton.Image active className="!w-full !h-40 sm:!h-48 mb-4" />
            </div>
          </div>
          

          <div className="p-4">
            <Skeleton active  paragraph={false} />
            <div className="flex items-center mt-2 mb-4">
              <Skeleton.Button active size="small"  />
              <Skeleton.Button active size="small"  />
            </div>
            

            <Skeleton.Button active block  />
          </div>
        </div>
      ))}
    </div>
  );
};

const Wishlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, loading } = useSelector((state) => state.wishlist);
  const [removing, setRemoving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {

      setIsLoading(true);
      

      dispatch(fetchWishlist(user.id));
      

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); 
      

      return () => clearTimeout(timer);
    }
  }, [dispatch, user]);

  const handleRemove = (productId) => {
    setRemoving(true); 
  
    setTimeout(async () => {
      try {
        await dispatch(
          removeFromWishlist({
            userId: user.id,
            productId,
          })
        ).unwrap();
  
        toast.success("Removed from wishlist");
      } catch (error) {
        toast.error("Failed to remove item");
        console.log(error);
      } finally {
        setRemoving(false); 
      }
    }, 1000);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-1 mt-20">
            <h2 className="text-2xl font-bold">Wishlist</h2>
            <span className="inline-flex items-center justify-center text-2xl font-bold">
              ({isLoading || loading ? "0" : items.length})
            </span>
          </div>
          {!isLoading && !loading && items.length > 0 && (
            <button className="px-4 py-2 border-2 border-solid text-black rounded-lg transition-colors">
              Move All To Bag
            </button>
          )}
        </div>

        {isLoading || loading || removing ? (
          <WishlistSkeleton />
        ) : items.length === 0 ? (
          <div className="">
            <img
              src={wishlistGif} 
              className="w-full max-w-md mx-auto"
            />
            <h1 className="text-center font-bold text-xl">No Product in Wishlist</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const product = item.productId;
              return (
                <div
                  key={product._id}
                  className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="absolute top-2 right-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Trash2
                        size={20}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>

                    <div className="p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-contain mx-auto"
                      />
                    </div>
                    
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 dark:text-white">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-3">
                      <span className="text-red-500 dark:text-red-400 font-bold mr-2">
                      {product.currency}{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="line-through text-sm text-gray-500 dark:text-gray-400">
                          {product.currency}{product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ProductRecommendations />
    </div>
  );
};

export default Wishlist;

