import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Card } from 'antd';
import PropTypes from 'prop-types';
import {
  Heart,
  Eye,
  ShoppingCart,
  LogIn,
} from 'lucide-react';
import { addToCart } from "../../slice/CartSlice";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';


const ProductCardSkeleton = () => (
  <Card
    className="rounded-lg mb-10 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
    cover={
      <Skeleton.Image 
        active 
        style={{ 
          width: '100%', 
          height: '192px',
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


const ProductCard = ({ product, loading = false, onToggleWishlist = null }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);
  
  if (loading) {
    return <ProductCardSkeleton />;
  }
  
  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      setProductToAdd(product);
      setIsLoginModalOpen(true);
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user.id,
          product: {
            id: product.id || product._id, 
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
    const slug = product.name
      .toLowerCase()               
      .replace(/[^\w\s-]/g, '')    
      .replace(/\s+/g, '-')        
      .trim();                      
    navigate(`/product/${slug}`, { state: { product } });
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleImageView = (e) => {
    e.stopPropagation();
    setIsImageModalOpen(true);
  };

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(false);
    navigate("/login", {
      state: {
        productToAdd: productToAdd,
      },
    });
  };

  const isInWishlist = false; 

  return (
    <>
      <div className="rounded-lg shadow-md overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300 mb-10">
        <div className="relative">
          <img 
            onClick={() => handleProductClick(product)} 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-contain cursor-pointer" 
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-green-400 text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </span>
          )}
          {product.discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}
            </span>
          )}
          <div className="absolute top-0 right-0 space-y-2 p-2">
            <button 
              className="p-1.5 rounded-full shadow-md  hover:bg-gray-100 transition-colors"
              onClick={handleWishlistClick}
            >
              <Heart 
                className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : ''}`} 
                fill={isInWishlist ? "currentColor" : "none"}
              />
            </button>
            <button 
              className="p-1.5 rounded-full shadow-md  hover:bg-gray-100 transition-colors"
              onClick={handleImageView}
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="font-semibold text-md">{product.name}</h3>
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center space-x-2">
              <span className="text-red-500 font-bold">{product.currency || '₹'}{product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-500 text-sm line-through">
                  {product.currency || '₹'}{product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center">
            {renderStars(product.rating, 'text-3xl')}
              <span className="text-gray-500 text-xs ml-1">({product.reviews || 0})</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => handleAddToCart(product)} 
          className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors mt-2"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add To Cart
        </button>
      </div>


      <Modal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title={product.name}
      >
        <div className="p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[70vh] object-contain mx-auto"
          />
         
        </div>
      </Modal>


      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        className="max-w-md"
        title="Login Required"
      >
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <LogIn size={48} className="text-red-500" />
          </div>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Please log in to add items to your cart and continue shopping.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <LogIn className="mr-2" size={20} />
              Go to Login
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};


ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    image: PropTypes.string.isRequired,
    currency: PropTypes.string,
    isNew: PropTypes.bool,
    discount: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
  loading: PropTypes.bool,
  onToggleWishlist: PropTypes.func,
};

export default ProductCard;