import { useState, useEffect } from "react";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slice/ProductSlice";
import { addToCart } from "../../slice/CartSlice";  
import { fetchWishlist, toggleWishlistItem } from "../../slice/WishlistSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import PropTypes from "prop-types";

const ProductRecommendations = () => {
  const { items: products, loading } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);
  const [displayLimit] = useState(4);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: 1,
        limit: displayLimit,
      })
    );
  }, [dispatch, displayLimit]);


  useEffect(() => {
    if (products) {
      setAllProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user]);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      setProductToAdd(product);
      setIsLoginPopupOpen(true);
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user.id,
          product: {
            id: product.id,
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

  const handleLoginRedirect = () => {
    setIsLoginPopupOpen(false);
    navigate("/login", {
      state: {
        productToAdd: productToAdd,
      },
    });
  };

  const handleFavoriteClick = async (product) => {
    if (!user) {
      setIsLoginPopupOpen(true);
      return;
    }

    try {
      await dispatch(toggleWishlistItem({
        userId: user.id,
        productId: product._id
      })).unwrap();
      toast.success(
        isInWishlist(product._id) 
          ? 'Removed from Wishlist' 
          : 'Added to Wishlist'
      );
    } catch (error) {
      toast.error('Failed to update wishlist', error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId._id === productId);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
  };

  const handleSeeAll = () => {
    dispatch(
      fetchProducts({
        page: 1,
        limit: 100, 
      })
    );
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={`star-${index}`}
          className={`text-yellow-400 ${
            index < rating ? "fill-current" : "stroke-current"
          }`}
        >
          ★
        </span>
      ));
  };


  const Modal = ({ isOpen, onClose, children, className = "" }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={onClose}
        />
        <div
          className={`relative z-50 bg-white rounded-lg w-full max-w-md mx-4 max-h-full overflow-auto transform transition-all duration-300 scale-100 opacity-100 modal-content ${className}`}
        >
          {children}
        </div>
      </div>
    );
  };
  
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Just For You</h2>
        <button 
          className="bg-red-500 text-white py-2 px-4 rounded-md"
          onClick={handleSeeAll}
        >
          See All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading 
          ? Array(4).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-white p-4 rounded-lg shadow-sm">
                <Skeleton.Image active className="w-full h-48 mb-4" />
                <Skeleton active paragraph={{ rows: 3 }} title={{ width: "50%" }} />
              </div>
            ))
          : allProducts && allProducts.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-sm relative dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400">
                <div className="relative group ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain rounded-lg mb-4 cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  />
                  <button 
                    className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-80 hover:opacity-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                    onClick={() => handleProductClick(product)}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    className="absolute top-2 left-2 p-2 bg-white rounded-full opacity-80 hover:opacity-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteClick(product);
                    }}
                  >
                    <Heart
                      size={20}
                      fill={isInWishlist(product._id) ? "currentColor" : "none"}
                      className={isInWishlist(product._id) ? "text-red-500" : ""}
                    />
                  </button>
                  {product.discount && (
                    <span className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                      {product.discount}
                    </span>
                  )}
                  {product.isNew && (
                    <span className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                      NEW
                    </span>
                  )}
                </div>

                <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-500 font-bold">{product.currency}{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through">{product.currency}{product.originalPrice}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-gray-500">({product.reviews})</span>
                </div>

                <button 
                  className="w-full bg-black text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add To Cart
                </button>
              </div>
            ))}
      </div>


      <Modal
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        className="p-6"
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart size={48} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="mb-6 text-gray-600">
            Please log in to add items to your cart and continue shopping.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsLoginPopupOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </Modal>


      <style>{`
        .modal-content {
          animation: modalZoomIn 0.3s ease-out;
        }
        
        @keyframes modalZoomIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductRecommendations;