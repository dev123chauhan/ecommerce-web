import { useState, useEffect, useRef } from "react";
import noproductfound from "../../../public/assets/Not-found.gif";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsQuery } from "../../redux/slice/ShopApiSlice";
import { setProducts } from "../../redux/slice/ShopSlice";
import { addToCart } from "../../redux/slice/CartSlice";
import {
  fetchWishlist,
  toggleWishlistItem,
} from "../../redux/slice/WishlistSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../Button/Button";
import { useModal } from "../../context/ModalContext"; 
import Card from "../Card/Card";
const BestSellingProducts = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const { openModal } = useModal();
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
      openModal("Login Required");
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
      openModal("Login Required");
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

  // const isInWishlist = (productId) => {
  //   return wishlistItems.some((item) => item && item.productId._id === productId);
  // };

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="primaryColor text-white py-1 px-3 rounded-full inline-block text-sm mb-2">
            This Month
          </div>
          <h2 className="text-2xl font-bold">Best Selling Products</h2>
        </div>
      </div>
      {productsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Card key={`skeleton-${index}`} loading={true} />
          ))}
        </div>
      ) : productsError ? (
        <div className="bg-red-100 text-red-500 p-4 mb-6 rounded">
          Error: {productsError.toString()}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 rounded-lg shadow-sm">
          <img
            src={noproductfound}
            alt="No products found"
            className="w-full max-w-md mx-auto"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <Card
              key={product._id}
              product={product}
              loading={false}
              showDiscount={false} 
              showAddToCart={true}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleFavoriteClick}
              onViewDetails={handleViewDetails}
              onProductClick={handleProductClick}
              isInWishlist={isInWishlist(product._id)}
            />
          ))}
        </div>
      )}
      {!productsLoading && filteredProducts.length > 3 && (
        <div className="flex items-center justify-center m-10">
          <Button
            ref={viewAllButtonRef}
            text={showAll ? "Show Less" : "View More"}
            onClick={showAll ? handleShowLess : handleViewAll}
            className="primaryColor text-white py-3"
          />
        </div>
      )}
    </div>
  );
};

export default BestSellingProducts;


