import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { listProducts } from '../../action/ExploreProductAction';
import { toast } from 'sonner';
import { toggleWishlistItem, fetchWishlist } from '../../slice/WishlistSlice';
import ProductCard from '../../components/ProductCard/ProductCard'; // Assuming ProductCard is in the same directory

// Main ExploreProduct Component
const ExploreProduct = () => {
  const dispatch = useDispatch();
  const { loading: reduxLoading, error, products, pages } = useSelector((state) => state.productList);
  const { user } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [displayProducts, setDisplayProducts] = useState([]);
  const itemsPerPage = 8;

  // Fetch products based on current page
  useEffect(() => {
    dispatch(listProducts(page, itemsPerPage));
  }, [dispatch, page]);

  // Fetch user's wishlist if logged in
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user]);

  // Effect to handle the loading state and delayed products display
  useEffect(() => {
    if (!reduxLoading && products?.length > 0) {
      setLoading(true);
      
      // Transform products to ensure they have consistent structure
      const transformedProducts = products.map(product => ({
        ...product,
        id: product.id || product._id // Ensure id exists by using _id as fallback
      }));
      
      // Use setTimeout to delay showing the products
      const timer = setTimeout(() => {
        setDisplayProducts(transformedProducts);
        setLoading(false);
      }, 1500);  // 1.5 second delay
      
      return () => clearTimeout(timer);
    }
  }, [reduxLoading, products]);

  // Check if a product is in the user's wishlist
  const isInWishlist = (productId) => {
    return wishlistItems?.some(item => 
      (item.productId?._id === productId) || (item.productId === productId)
    );
  };

  // Handle toggling wishlist item
  const handleToggleWishlist = async (product) => {
    if (!user?.id) {
      return; // Already handled in ProductCard component
    }

    try {
      await dispatch(toggleWishlistItem({
        userId: user.id,
        productId: product._id || product.id
      })).unwrap();
      
      toast.success(
        isInWishlist(product._id || product.id) 
          ? 'Removed from Wishlist' 
          : 'Added to Wishlist'
      );
    } catch (error) {
      toast.error('Failed to update wishlist');
      console.error("Wishlist update error:", error);
    }
  };
 
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <div className="bg-red-500 text-white py-1 px-3 rounded-full inline-block text-sm mb-2">
            Our Products
          </div>
          <h2 className="text-2xl font-bold">Explore Our Products</h2>
        </div>
        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-full transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
              page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            className={`p-2 rounded-full transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
              page === pages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => setPage(page + 1)}
            disabled={page === pages}
            aria-label="Next page"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [...Array(itemsPerPage)].map((_, index) => (
                <ProductCard key={`skeleton-${index}`} loading={true} />
              ))
            : displayProducts?.map((product) => (
                <ProductCard 
                  key={product._id || product.id} 
                  product={product}
                  onToggleWishlist={handleToggleWishlist}
                  isInWishlist={isInWishlist(product._id || product.id)}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default ExploreProduct;









