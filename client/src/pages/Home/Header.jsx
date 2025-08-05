import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
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
              {isAuthenticated && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What are you looking for"
                    className="pl-3 pr-8 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                  <Search
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              )}

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
            <Menu
              onClick={toggleSidebar}
              className="cursor-pointer dark:text-white"
              size={24}
            />

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
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="bg-red-500  text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-colors"
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

          <div
            className={`fixed top-0 left-0 h-full w-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
              <Link to="/" className="text-2xl font-bold dark:text-white">
                ShopVibe
              </Link>
              <X
                onClick={toggleSidebar}
                className="cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1 transition-colors"
                size={28}
              />
            </div>

            <div className="p-6">
              {isAuthenticated && (
                <div className="mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="What are you looking for"
                      className="w-full pl-3 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                    <Search
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
              )}

              <nav className="mb-8">
                <ul className="space-y-6">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`block text-lg font-medium py-2 px-4 rounded-lg transition-all duration-200 ${
                          location.pathname === item.path
                            ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-l-4 border-red-500"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-500"
                        }`}
                        onClick={toggleSidebar}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
