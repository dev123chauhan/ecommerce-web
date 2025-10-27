import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/slice/cartSlice";
import { fetchProducts } from "../../redux/slice/productSlice";
import { fetchWishlist, toggleWishlistItem } from "../../redux/slice/wishlistSlice";
import useCountdownTimer from "../../hooks/useCountdownTimer";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import FlashSaleHeader from "./FlashSaleHeader";
import FlashSaleProduct from "./FlashSaleProduct";
import { useModal } from "../../context/ModalContext";
export default function FlashSale() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: products } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [isLoading, setIsLoading] = useState(true);
  const timeLeft = useCountdownTimer({ Days: 3, Hours: 23, Minutes: 19, Seconds: 56 });
  const { scrollContainerRef, scroll } = useHorizontalScroll();
  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) dispatch(fetchWishlist(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) return openModal("Login");
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
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleFavoriteClick = async (product) => {
    if (!user) return openModal("Login");
    try {
      await dispatch(toggleWishlistItem({ userId: user.id, productId: product._id })).unwrap();
      toast.success(
        isInWishlist(product._id) ? "Removed from Wishlist" : "Added to Wishlist"
      );
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  const handleViewDetails = (product) => console.log("View details:", product);

  const handleProductClick = (product) => {
    const slug = product.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();
    navigate(`/product/${slug}`, { state: { product } });
  };

  // const isInWishlist = (id) => wishlistItems.some((item) => item.productId._id === id);
  const isInWishlist = (productId) => {
  return wishlistItems.some(
    (item) => item?.productId?._id === productId
    
  );
};

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="primaryColor text-white px-4 py-2 rounded-t-lg inline-block mb-4">
          Todays
        </div>
        <FlashSaleHeader timeLeft={timeLeft} onScroll={scroll} />
        <FlashSaleProduct
          products={products}
          isLoading={isLoading}
          scrollContainerRef={scrollContainerRef}
          handleAddToCart={handleAddToCart}
          handleFavoriteClick={handleFavoriteClick}
          handleViewDetails={handleViewDetails}
          handleProductClick={handleProductClick}
          isInWishlist={isInWishlist}
        />
      </div>
    </div>
  );
}


