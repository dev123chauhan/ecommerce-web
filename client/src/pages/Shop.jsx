import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slice/cartSlice";
import { fetchWishlist, toggleWishlistItem } from "../redux/slice/wishlistSlice";
import { useModal } from "../context/ModalContext";
import { setProducts } from "../redux/slice/shopSlice";
import { useGetProductsQuery, useGetCategoriesQuery } from "../redux/slice/shopApiSlice";
import useShopHandlers from "../hooks/useShopHandlers";
import ShopSearch from "../components/Shop/ShopSearch";
import NoProductFound from "../components/NoProductFound/NoProductFound";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import Breadcrumb from "../common/Breadcrumb";
import Card from "../common/Card";
export default function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { filteredProducts } = useSelector((state) => state.shop);
  const { data: shop, isLoading: productsLoading } = useGetProductsQuery();
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [artificialLoading, setArtificialLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false); // ✅ fixed
  const handlers = useShopHandlers({
    categories,
    selectedCategories: [],
    selectedSubCategories: [],
    dispatch,
    setIsFiltering, 
  });

  useEffect(() => {
    if (shop) {
      dispatch(setProducts(shop));
      const timer = setTimeout(() => setArtificialLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [shop, dispatch]);

  useEffect(() => {
    if (user?.id) dispatch(fetchWishlist(user.id));
  }, [user, dispatch]);

  const isLoading = productsLoading || categoriesLoading || artificialLoading || isFiltering;


 const isInWishlist = (productId) => {
  return wishlistItems.some(
    (item) => item?.productId?._id === productId
    
  );
};
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

  const handleToggleWishlist = async (product) => {
    if (!user) return openModal("Login");
    const wasInWishlist = isInWishlist(product._id);
    try {
      await dispatch(toggleWishlistItem({ userId: user.id, productId: product._id })).unwrap();
      toast.success(wasInWishlist ? "Removed from Wishlist" : "Added to Wishlist");
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  const handleProductClick = (product) => {
    const slug = product.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    navigate(`/product/${slug}`, { state: { product } });
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <div className="pt-20">
        <Breadcrumb />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 lg:w-1/5">
          <ShopSearch categories={categories} handlers={handlers} loading={categoriesLoading} />
        </div>
        <div className="md:w-3/4 lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <ProductSkeleton />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card
                key={product._id}
                product={product}
                showDiscount
                showAddToCart
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onProductClick={handleProductClick}
                isInWishlist={isInWishlist(product._id)}
              />
            ))
          ) : (
            <NoProductFound />
          )}
        </div>
      </div>
    </div>
  );
}







 




