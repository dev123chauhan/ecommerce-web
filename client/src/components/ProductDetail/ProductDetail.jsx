import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, Heart } from 'lucide-react';
import {  useSelector } from 'react-redux';
import ProductRecommendations from '../../pages/Wishlist/RecommendedProduct';
const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state?.wishlist?.favorites || {});
  const { product } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('white');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (!product) {
      navigate('/');
    } else {
      setMainImage(product.image);
    }
  }, [product, navigate]);

  if (!product) return null;

  const productId = product._id || product.id; 
  const colors = ['white', 'red'];
  
  const safeRating = typeof product.rating === 'number' && isFinite(product.rating) 
    ? Math.min(Math.max(0, Math.floor(product.rating)), 5) 
    : 0;
  const handleCheckout = () => {
    navigate("/billing");
  };
  return (
    <div className='dark:bg-gray-900 dark:text-white transition-colors duration-300'>
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-0 pt-10">
        <div className="text-sm breadcrumbs mb-4 mt-10">
          <ul className="flex space-x-2">
            <li className="cursor-pointer hover:text-red-500" onClick={() => navigate('/')}>Home</li>
            <li>/</li>
            <li className='font-bold'>{product.name}</li>
          </ul>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex">
            <div className="flex-grow">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-auto object-contain rounded p-4"
              />
            </div>
          </div>


          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="mb-6 text-gray-600">
              {product.description}
            </p>
            

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(safeRating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                {[...Array(5 - safeRating)].map((_, i) => (
                  <Star key={i + safeRating} className="w-5 h-5" />
                ))}
              </div>
              <span className="text-gray-600">
                ({product.reviews || 0} Reviews) | In Stock
              </span>
            </div>


            <div className="mb-4 flex items-center gap-3">
              <p className="text-2xl font-bold text-red-500">
                {product.currency || '$'}{product.price}
              </p>
              {product.originalPrice && (
                <p className="text-gray-500 line-through">
                  {product.currency || '$'}{product.originalPrice}
                </p>
              )}
            </div>


            <div className="mb-6">
              <h3 className="font-semibold mb-2">Colours:</h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-1 py-2 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 py-2 min-w-[40px] text-center">{quantity}</span>
                <button
                  className="px-1 py-2 transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors flex-grow"
              >
                Add to Cart
              </button>
              <button
                className="border border-gray-300 p-2 rounded-md hover:border-red-500 transition-colors"
              >
                <Heart
                  className="w-6 h-6"
                  fill={favorites[productId] ? "currentColor" : "none"}
                  color={favorites[productId] ? "#EF4444" : "currentColor"}
                />
              </button>
            </div>

            <button  onClick={handleCheckout} className='w-full rounded-lg bg-black text-white p-4 text-bold'>Buy Now</button>
          </div>
        </div>
      </div>
      <ProductRecommendations />
    </div>
  );
};

export default ProductDetail;