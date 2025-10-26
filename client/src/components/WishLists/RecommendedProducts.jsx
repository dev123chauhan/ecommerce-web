import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchProducts } from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import { fetchWishlist, toggleWishlistItem } from "../../redux/slice/wishlistSlice";
import { useModal } from "../../context/ModalContext";
import Card from "../../common/Card";
const RecommendedProducts = () => {
  const { items: products, loading } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [ setProductToAdd] = useState(null);
  const [displayLimit] = useState(4);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: displayLimit }));
  }, [dispatch, displayLimit]);

  useEffect(() => {
    if (products) setAllProducts(products);
  }, [products]);

  useEffect(() => {
    if (user?.id) dispatch(fetchWishlist(user.id));
  }, [dispatch, user]);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      setProductToAdd(product);
      openModal("Login");
      return;
    }

    try {
      await dispatch(addToCart({
        userId: user.id,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      })).unwrap();
      toast.success("Item Added to Cart");
    } catch (error) {
      console.error(error);
    }
  };

  const handleWishlistToggle = async (product) => {
    if (!user) {
      openModal("Login");
      return;
    }

    try {
      await dispatch(toggleWishlistItem({ userId: user.id, productId: product._id })).unwrap();
      toast.success(isInWishlist(product._id) ? "Removed from Wishlist" : "Added to Wishlist");
    } catch (error) {
      toast.error("Failed to update wishlist",error);
    }
  };

  const isInWishlist = (productId) =>
    wishlistItems.some(item => item?.productId?._id === productId);

  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Just For You</h2>
        <button
          className="primaryColor text-white px-6 py-2 rounded-full"
          onClick={() => dispatch(fetchProducts({ page: 1, limit: 100 }))}
        >
          See All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {allProducts.map(product => (
          <Card
            key={product._id}
            product={product}
            loading={loading}
            showAddToCart
            showDiscount
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleWishlistToggle}
            onProductClick={handleProductClick}
            isInWishlist={isInWishlist(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;