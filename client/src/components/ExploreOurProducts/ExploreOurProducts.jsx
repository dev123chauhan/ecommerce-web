import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { listProducts } from '../../redux/action/ExploreProductAction';
import { toggleWishlistItem, fetchWishlist } from '../../redux/slice/WishlistSlice';
import { addToCart } from '../../redux/slice/CartSlice';
import { useModal } from '../../context/ModalContext';
import Card from '../Card/Card';
const ExploreOurProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { loading: reduxLoading, error, products, pages } = useSelector((state) => state.productList);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [displayProducts, setDisplayProducts] = useState([]);
  const itemsPerPage = 8;


  useEffect(() => {
    dispatch(listProducts(page, itemsPerPage));
  }, [dispatch, page]);


  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user]);


  useEffect(() => {
    if (!reduxLoading && products?.length > 0) {
      setLoading(true);
      
      const transformedProducts = products.map(product => ({
        ...product,
        id: product.id || product._id 
      }));
      
      const timer = setTimeout(() => {
        setDisplayProducts(transformedProducts);
        setLoading(false);
      }, 1500);  
      
      return () => clearTimeout(timer);
    }
  }, [reduxLoading, products]);


  // const isInWishlist = (productId) => {
  //   return wishlistItems?.some(item => 
  //     (item.productId?._id === productId) || (item.productId === productId)
  //   );
  // };

 const isInWishlist = (productId) => {
  return wishlistItems.some(
    (item) => item?.productId?._id === productId
  );
};

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      openModal("Login Required");
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user.id,
          product: {
            id: product._id || product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        })
      ).unwrap();
      toast.success("Item Added to Cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const handleToggleWishlist = async (product) => {
    if (!user?.id) {
      openModal("Login Required");
      return; 
    }

    try {
      const productId = product._id || product.id;
      const wasInWishlist = isInWishlist(productId);
      
      await dispatch(toggleWishlistItem({
        userId: user.id,
        productId: productId
      })).unwrap();
      
      toast.success(
        wasInWishlist 
          ? 'Removed from Wishlist' 
          : 'Added to Wishlist'
      );
    } catch (error) {
      toast.error('Failed to update wishlist');
      console.error("Wishlist update error:", error);
    }
  };

  const handleViewDetails = (product) => {
   
    console.log("View details:", product);
  };


  const handleProductClick = (product) => {
    const slug = product.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    navigate(`/product/${slug}`, { state: { product } });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };
 
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <div className="primaryColor text-white py-1 px-3 rounded-full inline-block text-sm mb-2">
            Our Products
          </div>
          <h2 className="text-2xl font-bold">Explore Our Products</h2>
        </div>
        

        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-full transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              page === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={handlePreviousPage}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            className={`p-2 rounded-full transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              page === pages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={handleNextPage}
            disabled={page === pages}
            aria-label="Next page"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      {error ? (
        <div className="border border-[#db4444] text-[#db4444] px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? 
              [...Array(itemsPerPage)].map((_, index) => (
                <Card key={`skeleton-${index}`} loading={true} />
              ))
            : 
              displayProducts?.map((product) => (
                <Card 
                  key={product._id || product.id} 
                  product={product}
                  loading={false}
                  // showDiscount={true} 
                  showAddToCart={true}    
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onViewDetails={handleViewDetails}
                  onProductClick={handleProductClick}
                  isInWishlist={isInWishlist(product._id || product.id)}
                />
              ))}
        </div>
      )}
      {!loading && displayProducts.length > 0 && (
        <div className="flex justify-center items-center mt-6 text-gray-600">
          <span className="text-sm">
            Page {page} of {pages}
          </span>
        </div>
      )}
    </div>
  );
};

export default ExploreOurProducts;











