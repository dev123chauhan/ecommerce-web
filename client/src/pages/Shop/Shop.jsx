import { useEffect, useState } from "react";
import { ChevronDown, LogIn } from "lucide-react";
import { Skeleton } from "antd";
import noproductfound from "../../assets/Not-found.gif";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { toast } from "sonner";
import { setSearchTerm, setSelectedCategories, setSelectedSubCategories, setProducts} from "../../slice/ShopSlice";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "../../slice/ShopApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../slice/CartSlice";
import CropText from "../../components/CropText/CropText";

const ProductCardSkeleton = () => (
  <div className="rounded-xl shadow-sm overflow-hidden mt-10">
    <div className="relative h-48 flex items-center justify-center p-4">
      <Skeleton.Image active className="!w-full !h-40 sm:!h-48 mb-4" />
    </div>
    <div className="p-5">
      <Skeleton
        active
        title={{ width: "60%" }}
        paragraph={{
          rows: 3,
          style: { marginTop: "16px" },
        }}
      />
      <Skeleton.Button
        active
        block
        style={{ marginTop: "16px", height: "40px" }}
      />
    </div>
  </div>
);

const Shop = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);
  const {
    data: shop,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    searchTerm,
    selectedCategories,
    selectedSubCategories,
    filteredProducts,
  } = useSelector((state) => state.shop);

  const [expandedCategories, setExpandedCategories] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [artificialLoading, setArtificialLoading] = useState(true);

  useEffect(() => {
    if (shop) {
      dispatch(setProducts(shop));

      const timer = setTimeout(() => {
        setArtificialLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [shop, dispatch]);

  const handleProductClick = (product) => {
    const slug = product.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    navigate(`/product/${slug}`, { state: { product } });
  };

  useEffect(() => {
    if (shop) {
      setIsFiltering(true);
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [searchTerm, selectedCategories, selectedSubCategories, shop]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    dispatch(setSelectedCategories(newCategories));

    if (selectedCategories.includes(category)) {
      const newSubCategories = selectedSubCategories.filter(
        (sc) => !categories[category].includes(sc)
      );
      dispatch(setSelectedSubCategories(newSubCategories));
    }
  };

  const handleSubCategoryChange = (subCategory) => {
    const newSubCategories = selectedSubCategories.includes(subCategory)
      ? selectedSubCategories.filter((sc) => sc !== subCategory)
      : [...selectedSubCategories, subCategory];

    dispatch(setSelectedSubCategories(newSubCategories));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
          />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354V3.21z"
          />
        </svg>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      );
    }

    return stars;
  };

  const isLoading =
    productsLoading || categoriesLoading || artificialLoading || isFiltering;
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  const handleLoginRedirect = () => {
    setIsLoginPopupOpen(false);
    navigate("/login", {
      state: {
        productToAdd: productToAdd,
      },
    });
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      setProductToAdd(product);
      setIsLoginPopupOpen(true);
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user.id,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        })
      ).unwrap();
      toast.success("Item Added to Cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="min-h-screen banner">
        <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 lg:w-1/4">
              <nav className="pt-6">
                <ul className="flex space-x-4">
                  <li>
                    <Link to="/" className="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="font-bold">
                      Shop
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="rounded-xl shadow-sm py-6 sticky top-8">
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>

                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="">
                  {categoriesLoading ? (
                    <div className="animate-pulse space-y-3">
                      {[...Array(8)].map((_, index) => (
                        <div key={index} className="py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-gray-300 rounded"></div>
                              <div className="h-5 bg-gray-300 rounded w-20 sm:w-24 md:w-32 lg:w-40"></div>
                            </div>
                            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    categories &&
                    Object.entries(categories).map(
                      ([category, subCategories]) => (
                        <div key={category} className="py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="w-4 h-4 rounded accent-black"
                              />
                              <label
                                htmlFor={category}
                                className="font-medium cursor-pointer text-sm sm:text-base"
                              >
                                {category}
                              </label>
                            </div>
                            <button
                              onClick={() => toggleCategory(category)}
                              className="p-1 rounded-full transition-colors hover:bg-gray-100"
                            >
                              <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
                                  expandedCategories.includes(category)
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                          </div>

                          <div
                            className={`ml-5 sm:ml-7 overflow-hidden transition-all duration-300 ease-in-out ${
                              expandedCategories.includes(category)
                                ? "max-h-96 opacity-100 mt-2"
                                : "max-h-0 opacity-0 mt-0"
                            }`}
                          >
                            <div className="space-y-2 pb-1">
                              {subCategories.map((subCategory) => (
                                <div
                                  key={subCategory}
                                  className="flex items-center transform transition-all duration-200 ease-in-out"
                                  style={{
                                    transitionDelay:
                                      expandedCategories.includes(category)
                                        ? `${
                                            subCategories.indexOf(subCategory) *
                                            50
                                          }ms`
                                        : "0ms",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    id={subCategory}
                                    checked={selectedSubCategories.includes(
                                      subCategory
                                    )}
                                    onChange={() =>
                                      handleSubCategoryChange(subCategory)
                                    }
                                    className="w-4 h-4 mr-2 sm:mr-3 accent-black rounded border-gray-300 focus:ring-black"
                                  />
                                  <label
                                    htmlFor={subCategory}
                                    className="text-xs sm:text-sm cursor-pointer"
                                  >
                                    {subCategory}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="md:w-3/4 lg:w-4/5">
              {productsError && (
                <div className="bg-red-100 text-red-500 p-4 mb-6 rounded">
                  Error: {productsError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                  ? [...Array(9)].map((_, index) => (
                      <ProductCardSkeleton key={index} />
                    ))
                  : filteredProducts.map((product) => (
                      <div
                        key={product._id}
                        className="rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="relative h-48 flex items-center justify-center p-4">
                          <img
                            onClick={() => handleProductClick(product)}
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain cursor-pointer"
                          />
                        </div>
                        <div className="p-5">
                          <div className="text-sm mb-2">
                            <CropText
                              text={`${product.category} • ${product.subCategory}`}
                              length={30}
                            />
                          </div>
                          <h3
                            className="text-lg font-semibold mb-3 cursor-pointer hover:text-gray-700"
                            onClick={() => handleProductClick(product)}
                          >
                            {product.name}
                          </h3>
                          <div className="flex items-center mb-3">
                            <span className="text-2xl font-bold mr-2">
                              {product.currency}
                              {product.price.toFixed(2)}
                            </span>
                            <span className="text-gray-500 line-through text-sm mr-2">
                              {product.currency}
                              {(
                                product.price /
                                (1 - product.discountPercentage / 100)
                              ).toFixed(2)}
                            </span>
                            <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full text-sm font-medium">
                              {product.discountPercentage}% off
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-yellow-400 mb-2">
                              {renderStarRating(product.rating)}
                              <span className="ml-2 text-sm font-medium text-gray-600">
                                {product.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="secondaryColor text-white px-4 py-2 rounded-lg  transition-colors duration-200 w-full"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
              </div>

              {!isLoading && filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-40 px-4  rounded-lg shadow-sm">
                  <img
                    src={noproductfound}
                    className="w-full max-w-md mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedImage?.name}
      >
        {selectedImage && (
          <div className="p-4">
            <img
              src={selectedImage.image}
              alt={selectedImage.name}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            />
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        className="max-w-md"
        title="Login Required"
      >
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <LogIn size={48} className="text-red-500" />
          </div>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Please log in to add items to your cart and continue shopping.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsLoginPopupOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 primaryColor text-white rounded-md flex items-center justify-center  transition-colors"
            >
              <LogIn className="mr-2" size={20} />
              Go to Login
            </button>
          </div>
        </div>
      </Modal>

      <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
    </div>
  );
};

export default Shop;
