import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetProductsQuery } from "../../redux/slice/shopApiSlice";
import { setProducts } from "../../redux/slice/shopSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import { fetchWishlist, toggleWishlistItem } from "../../redux/slice/wishlistSlice";
import BestSellingHeader from "./BestSellingHeader";
import BestSellingProducts from "./BestSellingProducts";
import { useModal } from "../../context/ModalContext";
const BestSelling = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const viewAllButtonRef = useRef(null);
  
  const [showAll, setShowAll] = useState(false);
  
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
      openModal("Login");
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
      openModal("Login");
      return;
    }

    try {
      await dispatch(
        toggleWishlistItem({
          userId: user.id,
          productId: product._id,
        })
      ).unwrap();
      
      const inWishlist = isInWishlist(product._id);
      toast.success(
        inWishlist ? "Removed from Wishlist" : "Added to Wishlist"
      );
    } catch (error) {
      toast.error("Failed to update wishlist");
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleViewDetails = (product) => {
    console.log("View details:", product);
  };

  const handleProductClick = (product) => {
    const slug = product.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    navigate(`/product/${slug}`, { state: { product } });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item?.productId?._id === productId
    );
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

  return (
    <div id="best-selling" className="container mx-auto max-w-7xl">
      <BestSellingHeader />
      
      <BestSellingProducts
        products={displayedProducts}
        allProducts={filteredProducts}
        isLoading={productsLoading}
        error={productsError}
        showAll={showAll}
        viewAllButtonRef={viewAllButtonRef}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleFavoriteClick}
        onViewDetails={handleViewDetails}
        onProductClick={handleProductClick}
        isInWishlist={isInWishlist}
        onShowLess={handleShowLess}
        onViewAll={handleViewAll}
      />
    </div>
  );
};

export default BestSelling;