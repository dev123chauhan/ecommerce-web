import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import wishlistIcon from "../../public/assets/Wishlist.png";
import wishlistIconWhite from "../../public/assets/wishlistWhite.png";
import cartIcon from "../../public/assets/Cart.png";
import cartIconWhite from "../../public/assets/cartWhite.png";
import userIcon from "../../public/assets/user.png";
import userIconWhite from "../../public/assets/userWhite.png";
import userActive from "../../public/assets/userActive.png";
import { logoutUser } from "../redux/action/authAction";
import { fetchCart } from "../redux/slice/cartSlice";
import { ThemeContext } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { dropdownItems } from "../lib/dropdownItems";
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
    setIsOpen(false);
  };
  const menuItems = dropdownItems(handleLogout);
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
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const totalWishlistItems = wishlistItems.length;

  const handleItemClick = (item) => {
    if (item.onClick) item.onClick();
    else if (item.path) navigate(item.path);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      <div className="relative">
        <img
          src={isDarkMode ? wishlistIconWhite : wishlistIcon}
          onClick={() => navigate("/wishlist")}
          className="cursor-pointer w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform hover:scale-110 active:scale-95"
          alt="Wishlist"
        />
        {totalWishlistItems > 0 && (
          <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 primaryColor text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs font-semibold">
            {totalWishlistItems > 99 ? "99+" : totalWishlistItems}
          </span>
        )}
      </div>

      <div className="relative">
        <img
          src={isDarkMode ? cartIconWhite : cartIcon}
          onClick={openDrawer}
          className="cursor-pointer w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform hover:scale-110 active:scale-95"
          alt="Cart"
        />
        {totalQuantity > 0 && (
          <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 primaryColor text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-semibold">
            {totalQuantity > 99 ? "99+" : totalQuantity}
          </div>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer dark:text-white group"
          onClick={toggleDropdown}
        >
          <img
            src={isOpen ? userActive : isDarkMode ? userIconWhite : userIcon}
            className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 ${
              isOpen ? "scale-105" : "group-hover:scale-110"
            }`}
            alt="User"
          />
          <span className="hidden sm:inline-block text-xs sm:text-sm md:text-base font-medium truncate max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
            {user?.username}
          </span>
        </div>

        <div
          className={`absolute right-0 mt-2 w-48 sm:w-52 md:w-56 rounded-md shadow-lg bg-gradient-to-br from-[#9284A3] to-[#594F63] transition-all duration-300 ease-in-out z-50 ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className="w-full flex items-center px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base text-white hover:bg-white/10 active:bg-white/20 transition-colors duration-200"
                role="menuitem"
              >
                <img
                  src={item.img}
                  className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6"
                  alt={item.text}
                />
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
