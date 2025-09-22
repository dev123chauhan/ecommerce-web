import { useState, useEffect, useRef } from "react";
import { Skeleton } from "antd";
import { Heart, Eye, ArrowLeft, ArrowRight, ShoppingCart, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slice/CartSlice";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../slice/ProductSlice";
import { fetchWishlist, toggleWishlistItem } from "../../slice/WishlistSlice";
import Modal from "../../components/Modal/Modal"; 
const FlashSale = () => {
  const { items: products } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [timeLeft, setTimeLeft] = useState({
    Days: 3,
    Hours: 23,
    Minutes: 19,
    Seconds: 56,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);

  const scrollContainerRef = useRef(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = { ...prevTime };
        if (newTime.Seconds > 0) {
          newTime.Seconds--;
        } else {
          newTime.Seconds = 59;
          if (newTime.Minutes > 0) {
            newTime.Minutes--;
          } else {
            newTime.Minutes = 59;
            if (newTime.Hours > 0) {
              newTime.Hours--;
            } else {
              newTime.Hours = 23;
              if (newTime.Days > 0) {
                newTime.Days--;
              }
            }
          }
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

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
    const slug = product.name
      .toLowerCase()                
      .replace(/[^\w\s-]/g, '')    
      .replace(/\s+/g, '-')        
      .trim();                      
    navigate(`/product/${slug}`, { state: { product } });
  };
  
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: 1,
        limit: 10,
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

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="primaryColor text-white px-4 py-2 rounded-t-lg inline-block mb-4">
          Todays
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-2xl sm:text-3xl font-bold">Flash Sales</h2>
          <div className="flex space-x-2 sm:space-x-4">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <div key={`${unit}-${index}`} className="text-center">
                <div className="px-3 py-2 rounded">
                  <div className="text-lg sm:text-2xl font-bold">
                    {value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-xs sm:text-sm">{unit}</div>
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
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide scroll-smooth"
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
                  className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-16px)]"
                >
                  <div className="cursor-pointer p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative mb-4 group">
                      <img
                        onClick={() => handleProductClick(product)}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 sm:h-60 object-contain rounded"
                      />
                      <span className="absolute top-2 left-2 primaryColor text-white px-2 py-1 rounded text-xs sm:text-sm">
                        {product.discount}
                      </span>
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
                    <h3 className="font-semibold text-sm sm:text-base">
                      {product.name}
                    </h3>
                  
                    <div className="flex items-center">
                      <span className="text-red-500 font-bold mr-2 text-sm sm:text-base">
                     {product.currency}{product.price}
                      </span>
                      <span className="line-through text-xs sm:text-sm">
                      {product.currency}{product.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      {renderStars(product.rating, 'text-3xl')}
                      <span className="text-sm sm:text-sm">
                        ({product.reviews})
                      </span>
                    </div>
                    <button
                      className="w-full secondaryColor text-white py-2 rounded-md flex items-center justify-center  transition-colors"
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


      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={selectedImage?.name}
      >
        {selectedImage && (
          <div className="p-4">
            <img
              src={selectedImage.image}
              alt={selectedImage.name}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          </div>
        )}
      </Modal>


      <Modal
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
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
              onClick={() => setIsLoginPopupOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 primaryColor text-white rounded-md flex items-center justify-center  transition-colors"
            >
              <LogIn className="mr-2" size={20} />
              Go to Login
            </button>
          </div>
        </div>
      </Modal>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FlashSale;
