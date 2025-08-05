import { useState, useEffect, useRef } from "react";
import { User, ShoppingBag, Star, LogOut, Heart, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../action/AuthAction";
import { fetchCart } from "../../slice/CartSlice"; // Update with correct path
import { toast } from 'sonner';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
    toast.success("Successfully logged out!");
  };

  // Fetch cart data when component mounts if user is logged in
  useEffect(() => {
    if (user?.id && totalQuantity === 0) {
      // Check if we have cart data in localStorage first
      const savedCart = localStorage.getItem('cart');
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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { icon: <User size={18} />, text: "Manage My Account", path: "/account" },
    { icon: <ShoppingBag size={18} />, text: "My Order", path: "/order" },
    { icon: <Star size={18} />, text: "My Reviews", path: "/review" },
    { icon: <LogOut size={18} />, text: "Logout", onClick: handleLogout },
  ];

  const wishlistItems = useSelector(state => state.wishlist.items);
  const totalWishlistItems = wishlistItems.length;

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Heart
          onClick={() => navigate('/wishlist')}
          className="cursor-pointer transition-colors dark:text-white"
          size={25}
        /> 
        {totalWishlistItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {totalWishlistItems}
          </span>
        )}
      </div>

      <div className="relative">
        <ShoppingCart
          onClick={() => navigate('/cart')}
          className="cursor-pointer transition-colors dark:text-white"
          size={25}
        />
        {totalQuantity > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {totalQuantity}
          </div>
        )}
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer dark:text-white"
          onClick={toggleDropdown}
        >
          <User className="transition-colors" size={25} />
          <span className="text-sm font-medium">{user?.username}</span>
        </div>

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
                  <span className="mr-3">{item.icon}</span>
                  {item.text}
                </button>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors duration-200"
                  role="menuitem"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.text}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;