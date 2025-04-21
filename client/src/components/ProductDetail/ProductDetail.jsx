import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Star, Minus, Plus, Heart, Truck, RotateCcw } from 'lucide-react';
import { Star, Minus, Plus, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../slice/CartSlice';
import ProductRecommendations from '../Wishlist/RecommendedProduct';
// import { toggleFavorite } from '../../slice/WishlistSlice';
// import { toggleFavorite } from '../../slice/WishlistSlice';

const ProductDetail = () => {
  const location = useLocation();
const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state?.wishlist?.favorites ?? {});
  const { product } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('white');
  // const [selectedSize, setSelectedSize] = useState('M');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (!product) {
      navigate('/');
    } else {
      setMainImage(product.image);
    }
  }, [product, navigate]);

  if (!product) return null;

  // Create product images array using the main image
  // const productImages = Array(5).fill(product.image);
  const productId = product._id || product.id; // Handle both ID formats
  // const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['white', 'red'];

  const handleAddToCart = () => {
    if (!productId) return;
    dispatch(
      addToCart({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        color: selectedColor,
        // size: selectedSize
      })
    );
  };

  // const handleToggleFavorite = () => {
  //   dispatch(toggleFavorite(product.id));
  // };



  return (

    <div className='dark:bg-gray-900 dark:text-white transition-colors duration-300'>
    <div className="max-w-7xl mx-auto py-10">
      {/* Breadcrumb Navigation */}
      <div className="text-sm breadcrumbs mb-4 mt-10">
        <ul className="flex space-x-2">
          <li className="cursor-pointer hover:text-red-500" onClick={() => navigate('/')}>Home</li>
          <li>/</li>
          <li>Gaming</li>
          <li>/</li>
          <li className='font-bold'>{product.name}</li>
        </ul>
      </div>

      {/* Main Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Section */}
        <div className="flex">
         
          <div className="flex-grow">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto object-contain border border-gray-200 rounded p-4"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          {/* <p>{product.description}</p> */}
          <p className="mb-6 text-gray-600">
          {product.description}
          </p>
          {/* Ratings and Reviews */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(product.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              {[...Array(5 - product.rating)].map((_, i) => (
                <Star key={i + product.rating} className="w-5 h-5" />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews} Reviews) | In Stock</span>
          </div>

          {/* Price */}
          <div className="mb-4 flex items-center gap-3">
            <p className="text-2xl font-bold text-red-500">{product.currency}{product.price}</p>
            <p className="text-gray-500 line-through">{product.currency}{product.originalPrice}</p>
          </div>

          {/* Product Description */}
       

          {/* Color Selection */}
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

          {/* Size Selection */}
          {/* <div className="mb-6">
            <h3 className="font-semibold mb-2">Size:</h3>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded transition-colors ${
                    selectedSize === size
                      ? 'bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div> */}

          {/* Quantity and Actions */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-2 min-w-[40px] text-center">{quantity}</span>
              <button
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors flex-grow"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="border border-gray-300 p-2 rounded-md hover:border-red-500 transition-colors"
              // onClick={handleToggleFavorite}
            >
              <Heart
                className="w-6 h-6"
                fill={favorites[productId] ? "currentColor" : "none"}
                color={favorites[productId] ? "#EF4444" : "currentColor"}
              />
            </button>
          </div>

          {/* Delivery and Return Info */}
          {/* <div className="space-y-4">
            <div className="border border-gray-300 p-4 rounded-md flex items-center hover:border-red-500 transition-colors cursor-pointer">
              <Truck className="w-6 h-6 mr-4 text-gray-600" />
              <div>
                <h4 className="font-semibold">Free Delivery</h4>
                <p className="text-sm text-gray-600">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="border border-gray-300 p-4 rounded-md flex items-center hover:border-red-500 transition-colors cursor-pointer">
              <RotateCcw className="w-6 h-6 mr-4 text-gray-600" />
              <div>
                <h4 className="font-semibold">Return Delivery</h4>
                <p className="text-sm text-gray-600">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div> */}
          <button className='w-full rounded-lg bg-black text-white p-4 text-bold'>Buy Now</button>
        </div>
      </div>
    </div>
    <ProductRecommendations />
    </div>
  );
};

export default ProductDetail;