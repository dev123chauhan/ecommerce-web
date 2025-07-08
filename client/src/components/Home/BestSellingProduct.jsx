import { useState, useEffect, useRef } from "react";
import { Skeleton } from "antd";
import noImage from "../../assets/no-image.png"
import { Heart, Eye, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import noproductfound from "../../assets/Not-found.gif";
import { useSelector, useDispatch } from "react-redux";
import { 
  useGetProductsQuery 
} from "../../slice/ShopApiSlice";
import { setProducts } from "../../slice/ShopSlice";

const renderStars = (rating, size = 'text-3xl') => {
  return Array(5)
    .fill(0)
    .map((_, index) => (
      <span
        key={`star-${index}`}
        className={`${size} text-yellow-400 ${
          index < rating ? "fill-current" : "stroke-current"
        }`}
      >
        ★
      </span>
    ));
};
const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={imageError || !product.image ? noImage : product.image}
          alt={product.name || "Product image"}
          className="w-full h-64 object-contain"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-2 right-2 space-y-2">
          <button className="p-2 rounded-full shadow-md transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full shadow-md transition-colors">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-red-500 font-bold mr-2">
            {product.currency}{product.price?.toFixed(2)}
          </span>
          {product.discountPercentage && (
            <span className="line-through">
              {product.currency}
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center">
        {renderStars(product.rating, 'text-3xl')}
      
        </div>
        <button className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors mt-2">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number,
    currency: PropTypes.string,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number,
    category: PropTypes.string.isRequired,
    subCategory: PropTypes.string.isRequired,
  }).isRequired,
};

const BestSellingProduct = () => {
  const [showAll, setShowAll] = useState(false);
  const viewAllButtonRef = useRef(null);
  const dispatch = useDispatch();
  const { 
    filteredProducts 
  } = useSelector((state) => state.shop);
  const { 
    data: shop, 
    isLoading: productsLoading, 
    error: productsError 
  } = useGetProductsQuery();
  
  useEffect(() => {
    if (shop) {
      dispatch(setProducts(shop));
    }
  }, [shop, dispatch]);

  const handleShowLess = () => {
    setShowAll(false);
    document.getElementById('best-selling').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleViewAll = () => {
    setShowAll(true);
    setTimeout(() => {
      viewAllButtonRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };
  

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 3);


  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="rounded-lg shadow-md overflow-hidden">
          <Skeleton.Image active className="!w-full !h-64" />
          <div className="p-4">
            <Skeleton active title={{ width: "50%" }} paragraph={{ rows: 3 }} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div id="best-selling" className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="bg-red-500 text-white py-1 px-3 rounded-full inline-block text-sm mb-2">
            This Month
          </div>
          <h2 className="text-2xl font-bold">Best Selling Products</h2>
        </div>
      </div>

      {productsLoading ? (
        <SkeletonLoader />
      ) : productsError ? (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          Error: {productsError.toString()}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 bg-gray-50 rounded-lg shadow-sm">
          <video
            src={noproductfound}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-md mx-auto"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {!productsLoading && filteredProducts.length > 3 && (
        <div className="flex items-center justify-center m-10">
          <button
            ref={viewAllButtonRef}
            onClick={showAll ? handleShowLess : handleViewAll}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            {showAll ? "Show Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BestSellingProduct;