import { useState, useEffect, useRef } from "react";
import { Skeleton } from "antd";
import noImage from "../../assets/no-image.png";
import { Heart, Eye, ShoppingCart, LogIn } from "lucide-react";
import PropTypes from "prop-types";
import noproductfound from "../../assets/Not-found.gif";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsQuery } from "../../slice/ShopApiSlice";
import { setProducts } from "../../slice/ShopSlice";
import { addToCart } from "../../slice/CartSlice";
import { fetchWishlist, toggleWishlistItem } from "../../slice/WishlistSlice";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const renderStars = (rating, size = "text-3xl") => {
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
const ProductCard = ({
  product,
  onAddToCart,
  onFavoriteClick,
  onImageClick,
  onProductClick,
  isInWishlist,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          onClick={() => onProductClick(product)}
          src={imageError || !product.image ? noImage : product.image}
          alt={product.name || "Product image"}
          className="w-full h-64 object-contain cursor-pointer"
          onError={() => setImageError(true)}
        />
        {product.discountPercentage && (
          <span className="absolute top-2 left-2 primaryColo text-white px-2 py-1 rounded text-xs sm:text-sm">
            -{product.discountPercentage}%
          </span>
        )}
        <div className="absolute top-2 right-2 space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick(product);
            }}
            className="p-2 rounded-full shadow-md transition-colors"
          >
            <Heart
              size={20}
              fill={isInWishlist(product._id) ? "currentColor" : "none"}
              className={isInWishlist(product._id) ? "text-red-500" : ""}
            />
          </button>
          <button
            onClick={() => onImageClick(product)}
            className="p-2 rounded-full shadow-md transition-colors"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-red-500 font-bold mr-2">
            {product.currency}
            {product.price?.toFixed(2)}
          </span>
          {product.discountPercentage && (
            <span className="line-through">
              {product.currency}
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </span>
          )}
        </div>
        <div className="flex items-center">
          {renderStars(product.rating, "text-3xl")}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full secondaryColor text-white py-2 rounded-md flex items-center justify-center transition-colors mt-2"
        >
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
  onAddToCart: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
  onProductClick: PropTypes.func.isRequired,
  isInWishlist: PropTypes.func.isRequired,
};

const BestSellingProduct = () => {
  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);
  const viewAllButtonRef = useRef(null);
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.shop);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    data: shop,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery();

  useEffect(() => {
    if (shop) {
      dispatch(setProducts(shop));
    }
  }, [shop, dispatch]);

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
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        })
      ).unwrap();
      toast.success("Item Added to Cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const handleFavoriteClick = async (product) => {
    if (!user) {
      setIsLoginPopupOpen(true);
      return;
    }

    try {
      await dispatch(
        toggleWishlistItem({
          userId: user.id,
          productId: product._id,
        })
      ).unwrap();
      toast.success(
        isInWishlist(product._id)
          ? "Removed from Wishlist"
          : "Added to Wishlist"
      );
    } catch (error) {
      toast.error("Failed to update wishlist");
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleImageClick = (product) => {
    setSelectedImage(product);
    setIsModalOpen(true);
  };

  const handleProductClick = (product) => {
    const slug = product.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    navigate(`/product/${slug}`, { state: { product } });
  };

  const handleLoginRedirect = () => {
    setIsLoginPopupOpen(false);
    navigate("/login", {
      state: {
        productToAdd: productToAdd,
      },
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.productId._id === productId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleShowLess = () => {
    setShowAll(false);
    document.getElementById("best-selling").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleViewAll = () => {
    setShowAll(true);
    setTimeout(() => {
      viewAllButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
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
    <div id="best-selling" className="container mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="primaryColor text-white py-1 px-3 rounded-full inline-block text-sm mb-2">
            This Month
          </div>
          <h2 className="text-2xl font-bold">Best Selling Products</h2>
        </div>
      </div>

      {productsLoading ? (
        <SkeletonLoader />
      ) : productsError ? (
        <div className="bg-red-100 text-red-500 p-4 mb-6 rounded">
          Error: {productsError.toString()}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4  rounded-lg shadow-sm">
          <img
            src={noproductfound}
            autoPlay
            className="w-full max-w-md mx-auto"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
              onFavoriteClick={handleFavoriteClick}
              onImageClick={handleImageClick}
              onProductClick={handleProductClick}
              isInWishlist={isInWishlist}
            />
          ))}
        </div>
      )}

      {!productsLoading && filteredProducts.length > 3 && (
        <div className="flex items-center justify-center m-10">
          <button
            ref={viewAllButtonRef}
            onClick={showAll ? handleShowLess : handleViewAll}
            className="primaryColor text-white py-2 px-4 rounded-md  transition duration-300"
          >
            {showAll ? "Show Less" : "View More"}
          </button>
        </div>
      )}
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
    </div>
  );
};

export default BestSellingProduct;
