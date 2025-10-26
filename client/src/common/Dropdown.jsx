import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ThemeContext } from "../context/ThemeContextProvider";
import wishlistIcon from "../../public/assets/Wishlist.png";
import wishlistIconWhite from "../../public/assets/wishlistWhite.png";
import cartIcon from "../../public/assets/Cart.png";
import cartIconWhite from "../../public/assets/cartWhite.png";
import userIcon from "../../public/assets/user.png";
import userIconWhite from "../../public/assets/userWhite.png";
import userActive from "../../public/assets/userActive.png";
import myOrderIcon from "../../public/assets/MyOrder.png";
import reviewsIcon from "../../public/assets/Reviews.png";
import logoutIcon from "../../public/assets/Logout.png";
import { logoutUser } from "../redux/action/authAction";
import { fetchCart } from "../redux/slice/cartSlice";
import { useCart } from "../context/cartContext";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const { openDrawer } = useCart();
  const isDarkMode = theme === "dark";

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Successfully logged out!");
  };

  useEffect(() => {
    if (user?.id && totalQuantity === 0) {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart) {
        dispatch(fetchCart(user.id));
      }
    }
  }, [user?.id, totalQuantity, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { img: myOrderIcon, text: "My Order", path: "/order" },
    { img: reviewsIcon, text: "My Reviews", path: "/review" },
    { img: logoutIcon, text: "Logout", onClick: handleLogout },
  ];

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const totalWishlistItems = wishlistItems.length;

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Wishlist Icon */}
        <div className="relative">
          <img
            src={isDarkMode ? wishlistIconWhite : wishlistIcon}
            onClick={() => navigate("/wishlist")}
            className="cursor-pointer w-8 h-8"
            alt="Wishlist"
          />
          {totalWishlistItems > 0 && (
            <span className="absolute -top-1 -right-1 primaryColor text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {totalWishlistItems}
            </span>
          )}
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <img
            src={isDarkMode ? cartIconWhite : cartIcon}
            onClick={openDrawer}
            className="cursor-pointer w-8 h-8"
            alt="Cart"
          />
          {totalQuantity > 0 && (
            <div className="absolute -top-1 -right-1 primaryColor text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalQuantity}
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer dark:text-white"
            onClick={toggleDropdown}
          >
            {/* ✅ Toggle between normal and active user icon */}
            <img
              src={
                isOpen
                  ? userActive
                  : isDarkMode
                  ? userIconWhite
                  : userIcon
              }
              className={`w-8 h-8 transition-transform duration-300 ${
                isOpen ? "scale-105" : ""
              }`}
              alt="User"
            />
            <span className="text-sm font-medium">{user?.username}</span>
          </div>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gradient-to-br from-[#9284A3] to-[#594F63] transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {menuItems.map((item, index) =>
                item.onClick ? (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200"
                    role="menuitem"
                  >
                    <img
                      src={item.img}
                      className="mr-3 w-6 h-6"
                      alt={item.text}
                    />
                    {item.text}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200"
                    role="menuitem"
                  >
                    <img
                      src={item.img}
                      className="mr-3 w-6 h-6"
                      alt={item.text}
                    />
                    {item.text}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
