// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Skeleton, Card } from 'antd';
// import PropTypes from 'prop-types';
// import {
//   Heart,
//   Eye,
//   ArrowLeft,
//   ArrowRight,
//   ShoppingCart,
// } from 'lucide-react';
// import { listProducts } from '../../action/ExploreProductAction';
// import { addToCart } from "../../slice/CartSlice";
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';

// // Skeleton Loader for ProductCard
// const ProductCardSkeleton = () => (
  
//   <Card
//     className="rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
//     cover={
//       <Skeleton.Image 
//         active 
//         style={{ 
//           width: '100%', 
//           height: '192px',  // Matches h-48 in original
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center' 
//         }} 
//       />
//     }
//   >
//     <Skeleton 
//       active 
//       title={{ width: '60%' }} 
//       paragraph={{ 
//         rows: 2, 
//         style: { marginTop: '16px' } 
//       }} 
//     />
//   </Card>
// );
// const renderStars = (rating, size = 'text-3xl') => {
//   return Array(5)
//     .fill(0)
//     .map((_, index) => (
//       <span
//         key={`star-${index}`}
//         className={`${size} text-yellow-400 ${
//           index < rating ? "fill-current" : "stroke-current"
//         }`}
//       >
//         ★
//       </span>
//     ));
// };
// // Product Card Component
// const ProductCard = ({ product, loading = false }) => {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//     const navigate = useNavigate();
//   if (loading) {
//     return <ProductCardSkeleton />;
//   }
  
//   const handleAddToCart = async (product) => {
//     if (!isAuthenticated) {
//       // If you want to show login popup, uncomment these lines
//       // setProductToAdd(product);
//       // setIsLoginPopupOpen(true);
//       return;
//     }

//     try {
//       await dispatch(
//         addToCart({
//           userId: user.id,
//           product: {
//             id: product.id || product._id, // Use _id as fallback if id is not available
//             name: product.name,
//             price: product.price,
//             image: product.image,
//           },
//         })
//       ).unwrap();
//       toast.success("Item Added to Cart");
//     } catch (error) {
//       console.error("Failed to add to cart:", error);
//     }
//   };
//   const handleProductClick = (product) => {
//     // Create a URL-friendly slug from the product name
//     const slug = product.name
//       .toLowerCase()                // Convert to lowercase
//       .replace(/[^\w\s-]/g, '')    // Remove special characters
//       .replace(/\s+/g, '-')        // Replace spaces with hyphens
//       .trim();                      // Trim any leading/trailing spaces
    
//     // Navigate with the slug
//     navigate(`/product/${slug}`, { state: { product } });
//   };
//   return (
//     <div className="rounded-lg shadow-md overflow-hidden p-4">
//       <div className="relative">
//         <img onClick={() => handleProductClick(product)} src={product.image} alt={product.name} className="w-full h-48 object-contain cursor-pointer" />
//         {product.isNew && (
//           <span className="absolute top-2 left-2 bg-green-400 text-white text-xs font-bold px-2 py-1 rounded">
//             NEW
//           </span>
//         )}
//         <div className="absolute top-0 right-0 space-y-2">
//           <button className="p-1.5 rounded-full shadow-md">
//             <Heart className="w-5 h-5" />
//           </button>
//           <button className="p-1.5 rounded-full shadow-md">
//             <Eye className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//       <div className="">
//         <h3 className="font-semibold text-md">{product.name}</h3>
//         <div className="flex items-center mb-2">
//           <span className="text-red-500 font-bold mr-2">{product.currency}{product.price}</span>
//           <div className="flex items-center">
//           {renderStars(product.rating, 'text-3xl')}
//             <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
//           </div>
//         </div>
//       </div>
//       <button onClick={() => handleAddToCart(product)} className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors">
//         <ShoppingCart className="w-4 h-4 mr-2" />
//         Add To Cart
//       </button>
//     </div>
//   );
// };

// // PropTypes for ProductCard
// ProductCard.propTypes = {
//   product: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     id: PropTypes.string, // Made optional since we're using _id as fallback
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     rating: PropTypes.number.isRequired,
//     reviews: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
//     currency: PropTypes.string.isRequired,
//     isNew: PropTypes.bool,
//     colors: PropTypes.arrayOf(PropTypes.string),
//   }),
//   loading: PropTypes.bool,
// };

// // Main ExploreProduct Component
// const ExploreProduct = () => {
//   const dispatch = useDispatch();
//   const { loading: reduxLoading, error, products, pages } = useSelector((state) => state.productList);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [displayProducts, setDisplayProducts] = useState([]);
//   const itemsPerPage = 8;

//   useEffect(() => {
//     dispatch(listProducts(page, itemsPerPage));
//   }, [dispatch, page]);

//   // Effect to handle the loading state and delayed products display
//   useEffect(() => {
//     if (!reduxLoading && products?.length > 0) {
//       setLoading(true);
      
//       // Transform products to ensure they have consistent structure
//       const transformedProducts = products.map(product => ({
//         ...product,
//         id: product.id || product._id // Ensure id exists by using _id as fallback
//       }));
      
//       // Use setTimeout to delay showing the products
//       const timer = setTimeout(() => {
//         setDisplayProducts(transformedProducts);
//         setLoading(false);
//       }, 1500);  // 1.5 second delay
      
//       return () => clearTimeout(timer);
//     }
//   }, [reduxLoading, products]);
 
//   return (
//     <>
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
//         <div className="mb-4 sm:mb-0">
//           <div className="bg-red-500 text-white py-1 px-3 rounded-full inline-block text-sm mb-2">
//             Our Products
//           </div>
//           <h2 className="text-2xl font-bold">Explore Our Products</h2>
//         </div>
//         <div className="flex space-x-2">
//           <button
//             className={`p-2 rounded-full transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//               page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//             }`}
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//           >
//             <ArrowLeft className="w-6 h-6" />
//           </button>
//           <button
//             className={`p-2 rounded-full transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//               page === pages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//             }`}
//             onClick={() => setPage(page + 1)}
//             disabled={page === pages}
//           >
//             <ArrowRight className="w-6 h-6" />
//           </button>
//         </div>
//       </div>

//       {error ? (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           Error: {error}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {loading
//             ? [...Array(itemsPerPage)].map((_, index) => <ProductCardSkeleton key={index} />)
//             : displayProducts?.map((product) => <ProductCard key={product._id} product={product} />)}
//         </div>
//       )}
//     </>
//   );
// };

// export default ExploreProduct;


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
      
      {/* Pagination indicators if you want to show page numbers */}
      {/* {!loading && pages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[...Array(pages)].map((_, i) => (
              <button
                key={`page-${i+1}`}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  page === i + 1 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ExploreProduct;









