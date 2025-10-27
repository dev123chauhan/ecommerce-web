import { useContext, useState } from "react";
import viewIconWhite from "../../public/assets/viewWhite.png";
import viewIcon from "../../public/assets/view.png";
import { Skeleton } from "antd";
import wishlistIcon from "../../public/assets/Wishlist.png";
import wishlistIconWhite from "../../public/assets/wishlistWhite.png";
import wishlistIconFilled from "../../public/assets/heartfill.png";
import wishlistIconFilledWhite from "../../public/assets/Wishlist.png";
import Button from "./Button";
import { ThemeContext } from "../context/ThemeContext";
const Card = ({
  product,
  loading = false,
  showDiscount = false,
  showAddToCart = true,
  onAddToCart,
  onToggleWishlist, 
  onViewDetails,
  onProductClick,
  isInWishlist = false,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);
  const { theme } = useContext(ThemeContext);
  
  const isDarkMode = theme === "dark";

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={`star-${index}`}
          className={`text-[#FFAD33] text-4xl ${
            index < Math.floor(rating) ? "fill-current" : "stroke-current"
          }`}
        >
          ★
        </span>
      ));
  };

  if (loading) {
    return (
      <div className={`rounded-lg shadow-lg overflow-hidden ${className}`}>
        <Skeleton.Image active className="!w-full !h-48 sm:!h-60" />
        <div className="p-4">
          <Skeleton active paragraph={{ rows: 3 }} title={{ width: "60%" }} />
        </div>
      </div>
    );
  }

  const handleImageClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const getOriginalPrice = () => {
    if (product.originalPrice) {
      return product.originalPrice;
    }
    if (product.discountPercentage) {
      return (product.price / (1 - product.discountPercentage / 100)).toFixed(
        2
      );
    }
    return null;
  };

  const getDiscountText = () => {
    if (product.discount) {
      return product.discount;
    }
    if (product.discountPercentage) {
      return `-${product.discountPercentage}%`;
    }
    return null;
  };


  const getWishlistIcon = () => {
    if (isInWishlist) {
      return isDarkMode ? wishlistIconFilledWhite : wishlistIconFilled;
    }
    return isDarkMode ? wishlistIconWhite : wishlistIcon;
  };

  return (
    <div
      className={`rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      <div className="relative group">
        <img
          src={
            imageError || !product.image
              ? "https://via.placeholder.com/300x300?text=No+Image"
              : product.image
          }
          alt={product.name || "Product"}
          className="w-full h-48 sm:h-60 object-contain rounded-t cursor-pointer"
          onClick={handleImageClick}
          onError={() => setImageError(true)}
        />
        {showDiscount && getDiscountText() && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">
            {getDiscountText()}
          </span>
        )}
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button
            onClick={handleWishlistClick}
            className="p-2 dark:bg-gray-900 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
            aria-label="Add to wishlist"
          >
            <img
              src={getWishlistIcon()}
              className="cursor-pointer w-8 h-8"
              alt="Wishlist"
            />
          </button>
          {onViewDetails && (
            <button
              onClick={handleViewClick}
              className="p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:shadow-lg transition-all"
              aria-label="View details"
            >
              <img
                src={isDarkMode ? viewIconWhite : viewIcon}
                className="cursor-pointer w-8 h-6"
                alt="View"
              />
            </button>
          )}
        </div>
        {product.isNew && (
          <span className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            NEW
          </span>
        )}
      </div>

      <div className="p-4">
        <h3
          className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 cursor-pointer hover:text-red-500 transition-colors"
          onClick={handleImageClick}
        >
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <span className="text-red-500 font-bold text-sm sm:text-base mr-2">
            {product.currency || "$"}
            {product.price?.toFixed ? product.price.toFixed(2) : product.price}
          </span>
          {getOriginalPrice() && (
            <span className="text-gray-500 line-through text-xs sm:text-sm">
              {product.currency || "$"}
              {getOriginalPrice()}
            </span>
          )}
        </div>
        <div className="flex items-center mb-3">
          <div className="flex">{renderStars(product.rating || 0)}</div>
          {product.reviews && (
            <span className="text-gray-500 text-xs sm:text-sm ml-2">
              ({product.reviews})
            </span>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
        {showAddToCart && (
          <Button
            text="Add To Cart"
            onClick={handleAddToCartClick}
            className="w-full bg-black text-white py-3"
          />
        )}
      </div>
    </div>
  );
};

export default Card;


