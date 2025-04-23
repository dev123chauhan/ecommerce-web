import { useState, useEffect, useRef } from "react";
import { Skeleton } from "antd";
import {
  Heart,
  Eye,
  ArrowLeft,
  ArrowRight,
  X,
  ShoppingCart,
  LogIn,
} from "lucide-react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slice/CartSlice";
import { useNavigate } from "react-router-dom";
// import { products } from "../Products/Products";
import { fetchProducts } from "../../slice/ProductSlice"; // Add this import
import { fetchWishlist, toggleWishlistItem } from "../../slice/WishlistSlice";

// Modal Component
const Modal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className={`relative z-50 bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-auto transform transition-all duration-300 scale-100 opacity-100 modal-content ${className}`}
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

const FlashSale = () => {
  const { items: products, } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select authentication state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // State for various modals and loading
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);

  const scrollContainerRef = useRef(null);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = { ...prevTime };
        if (newTime.seconds > 0) {
          newTime.seconds--;
        } else {
          newTime.seconds = 59;
          if (newTime.minutes > 0) {
            newTime.minutes--;
          } else {
            newTime.minutes = 59;
            if (newTime.hours > 0) {
              newTime.hours--;
            } else {
              newTime.hours = 23;
              if (newTime.days > 0) {
                newTime.days--;
              }
            }
          }
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Loading simulation effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Modal overflow effect
  useEffect(() => {
    if (isModalOpen || isLoginPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, isLoginPopupOpen]);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      setProductToAdd(product);
      setIsLoginPopupOpen(true);
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user.id, // Assuming you have user info in auth state
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        })
      ).unwrap();
      toast.success("Item Added to Cart");
      // Optionally show success message
    } catch (error) {
      // Handle error (show error message)
      console.error("Failed to add to cart:", error);
    }
  };
  // Handle Login Redirect
  const handleLoginRedirect = () => {
    // Close login popup and redirect to login page
    setIsLoginPopupOpen(false);
    navigate("/login", {
      state: {
        productToAdd: productToAdd,
      },
    });
  };

  // Existing methods remain the same
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

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const targetScroll =
        container.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handleImageClick = (product) => {
    setSelectedImage(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
  };
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: 1,
        limit: 10,
        // Optionally add filters
        // category: 'flash-sale',
        // minPrice: 0,
        // maxPrice: 1000
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user]);

  const handleFavoriteClick = async (product) => {
    if (!user) {
      setIsLoginPopupOpen(true);
      return;
    }

    try {
      await dispatch(toggleWishlistItem({
        userId: user.id,
        productId: product._id // Use the MongoDB _id from your Product model
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
  return (
    <div className="w-full">
      {/* <Toaster position="top-right"/> */}
      <div className="p-4 max-w-7xl mx-auto">
        {/* Existing Flash Sale Header */}
        <div className="bg-red-500 text-white px-4 py-2 rounded-t-lg inline-block mb-4">
          Todays
        </div>

        {/* Existing Header Content */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-2xl sm:text-3xl font-bold">Flash Sales</h2>
          <div className="flex space-x-2 sm:space-x-4">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <div key={`${unit}-${index}`} className="text-center">
                <div className="px-3 py-2 rounded">
                  <div className="text-xs sm:text-sm">{unit}</div>
                  <div className="text-lg sm:text-2xl font-bold">
                    {value.toString().padStart(2, "0")}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-2 ">
            <button
              className="p-2 rounded-full transition-colors bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="p-2 rounded-full transition-colors bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Product Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-16px)] p-4"
                  >
                    <Skeleton.Image
                      active
                      className="!w-full !h-40 sm:!h-48 mb-4"
                    />
                    <Skeleton
                      active
                      paragraph={{ rows: 3 }}
                      title={{ width: "50%" }}
                    />
                  </div>
                ))
            : products && products.map((product, index) => (
                <div
                  key={index}
                  // key={product.id}
                  className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-16px)]"
                >
                  <div className="cursor-pointer p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative mb-4 group">
                      <img
                        onClick={() => handleProductClick(product)}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 sm:h-60 object-contain rounded"
                        // className="w-full h-40 sm:h-48 object-contain rounded"
                      />
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm">
                        {product.discount}
                      </span>
                      {/* <button
                        className={`absolute top-2 right-2 transition-colors ${
                          favorites[product.id] ? "text-red-500" : ""
                        }`}
                        onClick={() => handleFavoriteClick(product.id)}
                      >
                        <Heart
                          size={20}
                          fill={favorites[product.id] ? "currentColor" : "none"}
                        />
                      </button> */}
                      <button
                        className="absolute top-2 right-2 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteClick(product);
                        }}
                      >
                        <Heart
                          size={20}
                          fill={
                            isInWishlist(product._id) ? "currentColor" : "none"
                          }
                          className={
                            isInWishlist(product._id) ? "text-red-500" : ""
                          }
                        />
                      </button>
                      <button
                        className="absolute bottom-2 right-2 transition-colors"
                        onClick={() => handleImageClick(product)}
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                    <h3 className="font-semibold mb-2 text-sm sm:text-base">
                      {product.name}
                    </h3>
                  
                    <div className="flex items-center mb-2">
                      <span className="text-red-500 font-bold mr-2 text-sm sm:text-base">
                     {product.currency}{product.price}
                      </span>
                      <span className="line-through text-xs sm:text-sm">
                      {product.currency}{product.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                      <span className="ml-2 text-xs sm:text-sm">
                        ({product.reviews})
                      </span>
                    </div>
                    <button
                      className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Product Image Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedImage && (
          <div className="relative p-4">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
            <div className="mt-8 p-4">
              <img
                src={selectedImage.image}
                alt={selectedImage.name}
                className="w-full h-auto max-h-[70vh] object-contain mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4 text-center">
                {selectedImage.name}
              </h3>
            </div>
          </div>
        )}
      </Modal>

      {/* Login Required Popup */}
      <Modal
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        className="max-w-md p-6"
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <LogIn size={48} className="text-red-500" />
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
              <LogIn className="mr-2" size={20} />
              Go to Login
            </button>
          </div>
        </div>
      </Modal>

      {/* Custom Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
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

export default FlashSale;
