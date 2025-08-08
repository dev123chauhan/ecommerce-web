import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Moon, Sun, X } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContextProvider";
import AccountDropdown from "../Account/AccountDropdown";

const Header = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <>
      <header className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <nav className="border-b dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 hidden md:flex items-center justify-between py-5">
            <Link to="/" className="text-xl font-bold dark:text-white">
              ShopVibe
            </Link>

            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  <Link
                    to={item.path}
                    className={`hover:text-gray-600 dark:text-gray-200 dark:hover:text-white transition-colors ${
                      location.pathname === item.path
                        ? "border-b-2 border-black dark:border-white"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>

                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-6">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>

              {isAuthenticated ? (
                <AccountDropdown />
              ) : (
                <div className="space-x-4 flex items-center">
                  <Link
                    to="/login"
                    className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center justify-between px-4 py-4">
            <button onClick={toggleSidebar} className="cursor-pointer dark:text-white">
              {isOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

            <Link to="/" className="text-xl font-bold dark:text-white">
              ShopVibe
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>

              {isAuthenticated ? (
                <AccountDropdown />
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="bg-red-500  text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors whitespace-nowrap"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="border border-red-500 text-red-500 px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile dropdown menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen
                ? "max-h-96 opacity-100 pb-4 border-t border-gray-200 dark:border-gray-700"
                : "max-h-0 opacity-0 pb-0"
            }`}
          >
            <nav className="flex flex-col space-y-3 pt-4 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-base py-2 transform transition-all duration-200 hover:translate-x-2 ${
                    location.pathname === item.path
                      ? "text-red-600 font-medium"
                      : "text-gray-700 dark:text-gray-200 hover:text-red-500"
                  }`}
                  onClick={toggleSidebar}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>


        </nav>
      </header>
    </>
  );
};

export default Header;