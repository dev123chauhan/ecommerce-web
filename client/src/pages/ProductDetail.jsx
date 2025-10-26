import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  Minus, Plus, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import RecommendedProducts from "../components/WishLists/RecommendedProducts";
import { useModal } from "../context/ModalContext";
import { addToCart } from "../redux/slice/cartSlice";
import { toast } from "sonner";
import { toggleWishlistItem } from "../redux/slice/wishlistSlice";
import Button from "../common/Button";
const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.wishlist.favorites);
  const { openModal } = useModal();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
   const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { product } = location.state || {};
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  // const [selectedColor, setSelectedColor] = useState("white");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!product) {
      navigate("/");
    } else {
      setMainImage(product.image);
    }
  }, [product, navigate]);

  if (!product) return null;

  const productId = product._id || product.id;
  // const colors = ["white", "#db4444"];

  // const safeRating =
  //   typeof product.rating === "number" && isFinite(product.rating)
  //     ? Math.min(Math.max(0, Math.floor(product.rating)), 5)
  //     : 0;

  const handleCheckout = () => {
    if (!isAuthenticated) return openModal("Login");
    navigate("/billing");
  };
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

  const handleAddToCart = async () => {
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
  const isInWishlist = (productId) => {
  return wishlistItems.some(
    (item) => item?.productId?._id === productId
    
  );
};
    const handleWishlist = async (product) => {
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
    
  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pt-10">
        <div className="text-sm breadcrumbs mb-4 mt-10">
          <ul className="flex space-x-2">
            <li className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </li>
            <li>/</li>
            <li className="font-bold">{product.name}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT SIDE - IMAGE */}
          <div className="flex">
            <div className="flex-grow">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-auto object-contain rounded p-4"
              />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className=" text-gray-600">{product.description}</p>
            <div className="flex items-center mb-4">
              {renderStars()}
              <span className="text-gray-600">
                ({product.reviews || 0} Reviews) | In Stock
              </span>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <p className="text-2xl font-bold text-[#db4444]">
                {product.currency || "$"}
                {product.price}
              </p>
              {product.originalPrice && (
                <p className="text-gray-500 line-through">
                  {product.currency || "$"}
                  {product.originalPrice}
                </p>
              )}
            </div>
            {/* <div className="mb-6">
              <h3 className="font-semibold mb-2">Colours:</h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-black scale-110"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div> */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-1 py-2 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 py-2 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  className="px-1 py-2 transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* <button className='primaryColor text-white px-6 py-2 rounded-md  transition-colors flex-grow'>
                Add to Cart
              </button> */}
              <Button
                text="Add to Cart"
                onClick={handleAddToCart}
                className="primaryColor text-white py-3 w-full"
              />
              <button className="border border-gray-300 p-2 rounded-md  transition-colors">
                <Heart
                  onClick={handleWishlist}
                  className="w-6 h-6"
                  fill={favorites?.[productId] ? "currentColor" : "none"}
                  color={favorites?.[productId] ? "#db4444" : "currentColor"}
                />
              </button>
            </div>
            <Button
              onClick={handleCheckout}
              text="Buy Now"
              className="bg-black py-4 w-full text-white"
            />
            {/* <button
              onClick={handleCheckout}
              className='w-full rounded-lg bg-black text-white p-4 font-bold hover:bg-gray-800 transition-colors'
            >
              Buy Now
            </button> */}
          </div>
        </div>
      </div>
      <RecommendedProducts />
    </div>
  );
};

export default ProductDetail;
