// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Skeleton, Card } from 'antd';
// import PropTypes from 'prop-types';
// import {
//   Heart,
//   Eye,
//   ArrowLeft,
//   ArrowRight,
//   Star,
//   ShoppingCart,
// } from 'lucide-react';
// import { listProducts } from '../../action/ExploreProductAction';
// import { addToCart } from "../../slice/CartSlice";
// import { toast } from 'sonner';
// // Skeleton Loader for ProductCard
// const ProductCardSkeleton = () => (
//   <Card
//     className="rounded-lg shadow-md overflow-hidden"
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

// // Product Card Component
// const ProductCard = ({ product, loading = false }) => {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   // const [productToAdd, setProductToAdd] = useState(null);
//   // const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
//   if (loading) {
//     return <ProductCardSkeleton />;
//   }
//   const handleAddToCart = async (product) => {
//     if (!isAuthenticated) {
//       // setProductToAdd(product);
//       // setIsLoginPopupOpen(true);
//       return;
//     }

//     try {
//       await dispatch(
//         addToCart({
//           userId: user.id, // Assuming you have user info in auth state
//           product: {
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             image: product.image,
//           },
//         })
//       ).unwrap();
//       toast.success("Item Added to Cart");
//       // Optionally show success message
//     } catch (error) {
//       // Handle error (show error message)
//       console.error("Failed to add to cart:", error);
//     }
//   };
//   return (
//     <div className="rounded-lg shadow-md overflow-hidden">
//       <div className="relative">
//         <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
//         {product.isNew && (
//           <span className="absolute top-2 left-2 bg-green-400 text-white text-xs font-bold px-2 py-1 rounded">
//             NEW
//           </span>
//         )}
//         <div className="absolute top-2 right-2 space-y-2">
//           <button className="p-1.5 rounded-full shadow-md">
//             <Heart className="w-4 h-4" />
//           </button>
//           <button className="p-1.5 rounded-full shadow-md">
//             <Eye className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
//         <div className="flex items-center mb-2">
//           <span className="text-red-500 font-bold mr-2">${product.price}</span>
//           <div className="flex items-center">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'text-yellow-400  fill-current' : 'text-gray-300'}`} />
//             ))}
//             <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
//           </div>
//         </div>
//       </div>
//       <button    onClick={() => handleAddToCart(product)} className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors">
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
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     rating: PropTypes.number.isRequired,
//     reviews: PropTypes.number.isRequired,
//     image: PropTypes.string.isRequired,
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
//   const [loading, setLoading] = useState(true);  // Local loading state
//   const [displayProducts, setDisplayProducts] = useState([]);  // State for displaying products
//   const itemsPerPage = 8;

//   useEffect(() => {
//     dispatch(listProducts(page, itemsPerPage));
//   }, [dispatch, page]);

//   // Effect to handle the loading state and delayed products display
//   useEffect(() => {
//     if (!reduxLoading && products?.length > 0) {
//       setLoading(true);  // Show loading state
      
//       // Use setTimeout to delay showing the products
//       const timer = setTimeout(() => {
//         setDisplayProducts(products);
//         setLoading(false);  // Hide loading state after timeout
//       }, 1500);  // 1.5 second delay
      
//       return () => clearTimeout(timer);  // Clean up timer on unmount or re-render
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
//             className={`p-2 rounded-full transition-colors ${
//               page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
//             }`}
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//           >
//             <ArrowLeft className="w-6 h-6" />
//           </button>
//           <button
//             className={`p-2 rounded-full transition-colors ${
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
//             ? [...Array(itemsPerPage)].map((_, index) => <ProductCard key={index} loading />)
//             : displayProducts?.map((product) => <ProductCard key={product._id} product={product} />)}
//         </div>
//       )}
//     </>
//   );
// };

// export default ExploreProduct;


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Card } from 'antd';
import PropTypes from 'prop-types';
import {
  Heart,
  Eye,
  ArrowLeft,
  ArrowRight,
  Star,
  ShoppingCart,
} from 'lucide-react';
import { listProducts } from '../../action/ExploreProductAction';
import { addToCart } from "../../slice/CartSlice";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Skeleton Loader for ProductCard
const ProductCardSkeleton = () => (
  
  <Card
    className="rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
    cover={
      <Skeleton.Image 
        active 
        style={{ 
          width: '100%', 
          height: '192px',  // Matches h-48 in original
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }} 
      />
    }
  >
    <Skeleton 
      active 
      title={{ width: '60%' }} 
      paragraph={{ 
        rows: 2, 
        style: { marginTop: '16px' } 
      }} 
    />
  </Card>
);

// Product Card Component
const ProductCard = ({ product, loading = false }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
  if (loading) {
    return <ProductCardSkeleton />;
  }
  
  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      // If you want to show login popup, uncomment these lines
      // setProductToAdd(product);
      // setIsLoginPopupOpen(true);
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user.id,
          product: {
            id: product.id || product._id, // Use _id as fallback if id is not available
            name: product.name,
            price: product.price,
            image: product.image,
          },
        })
      ).unwrap();
      toast.success("Item Added to Cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
  const handleProductClick = (product) => {
    // Create a URL-friendly slug from the product name
    const slug = product.name
      .toLowerCase()                // Convert to lowercase
      .replace(/[^\w\s-]/g, '')    // Remove special characters
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .trim();                      // Trim any leading/trailing spaces
    
    // Navigate with the slug
    navigate(`/product/${slug}`, { state: { product } });
  };
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img onClick={() => handleProductClick(product)} src={product.image} alt={product.name} className="w-full h-48 object-contain cursor-pointer" />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-400 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
        <div className="absolute top-2 right-2 space-y-2">
          <button className="p-1.5 rounded-full shadow-md">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full shadow-md">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-red-500 font-bold mr-2">${product.price}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
          </div>
        </div>
      </div>
      <button onClick={() => handleAddToCart(product)} className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add To Cart
      </button>
    </div>
  );
};

// PropTypes for ProductCard
ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    id: PropTypes.string, // Made optional since we're using _id as fallback
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
  loading: PropTypes.bool,
};

// Main ExploreProduct Component
const ExploreProduct = () => {
  const dispatch = useDispatch();
  const { loading: reduxLoading, error, products, pages } = useSelector((state) => state.productList);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [displayProducts, setDisplayProducts] = useState([]);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(listProducts(page, itemsPerPage));
  }, [dispatch, page]);

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

  return (
    <>
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
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            className={`p-2 rounded-full transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
              page === pages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => setPage(page + 1)}
            disabled={page === pages}
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
            ? [...Array(itemsPerPage)].map((_, index) => <ProductCardSkeleton key={index} />)
            : displayProducts?.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      )}
    </>
  );
};

export default ExploreProduct;













