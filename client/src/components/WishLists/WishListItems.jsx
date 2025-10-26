import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../../redux/slice/wishlistSlice";
import wishlistGif from "../../../public/assets/Wishlist.gif";
import WishlistProductSkeleton from "../Skeleton/WishlistProductSkeleton";
import Card from "../../common/Card";
const WishlistItems = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, loading } = useSelector((state) => state.wishlist);

  const [removing, setRemoving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      setIsLoading(true);
      dispatch(fetchWishlist(user.id));

      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [dispatch, user]);

  const handleRemove = async (productId) => {
    setRemoving(true);
    try {
      await dispatch(
        removeFromWishlist({ userId: user.id, productId })
      ).unwrap();
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
      console.log(error);
    } finally {
      setRemoving(false);
    }
  };

  const isInWishlist = (productId) =>
    items.some((item) => item?.productId?._id === productId);

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between items-center mb-8 pt-20">
          <div className="flex items-center gap-1">
            <h2 className="text-2xl font-bold">Wishlist</h2>
            <span className="inline-flex items-center justify-center text-2xl font-bold">
              {isLoading || loading ? "0" : items.length}
            </span>
          </div>
          {!isLoading && !loading && items.length > 0 && (
            <button className="px-6 py-3 rounded-full border-2 border-solid dark:text-white dark:border-gray-700 text-black transition-colors">
              Move All To Bag
            </button>
          )}
        </div>

        {isLoading || loading || removing ? (
          <WishlistProductSkeleton />
        ) : items.length === 0 ? (
          <div className="text-center">
            <img src={wishlistGif} className="w-full max-w-md mx-auto" />
            <h1 className="text-center font-bold text-xl mt-4">
              No Product in Wishlist
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const product = item?.productId;
              if (!product) return null;

              return (
                <Card
                  key={product._id}
                  product={product}
                  showDiscount={
                    !!product.discount || !!product.discountPercentage
                  }
                  showAddToCart={true}
                  onAddToCart={() => toast("Add to cart clicked")}
                  onToggleWishlist={() => handleRemove(product._id)}
                  isInWishlist={isInWishlist(product._id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistItems;
