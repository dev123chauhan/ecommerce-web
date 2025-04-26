import { useState, useEffect, useRef } from "react";
import { Skeleton } from "antd";
import { Heart, Eye, Star, ShoppingCart } from "lucide-react";
import { products } from "../../Products";
import PropTypes from "prop-types";
import noproductfound from "../../assets/Not-found.gif";

const ProductCard = ({ product }) => (
  <div className="rounded-lg shadow-md overflow-hidden">
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-contain"
      />
      <div className="absolute top-2 right-2 space-y-2">
        <button className="p-2 rounded-full shadow-md transition-colors">
          <Heart className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full shadow-md transition-colors">
          <Eye className="w-5 h-5" />
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
      <div className="flex items-center mb-2">
        <span className="text-red-500 font-bold mr-2">
          ${product.currentPrice}
        </span>
        {product.originalPrice && (
          <span className="line-through">${product.originalPrice}</span>
        )}
      </div>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(product.rating)
                ? "text-yellow-400 fill-current"
                : ""
            }`}
          />
        ))}
        <span className="ml-2">({product.reviews})</span>
      </div>
      <button className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add To Cart
      </button>
    </div>
  </div>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    subCategory: PropTypes.string.isRequired,
  }).isRequired,
};

const BestSellingProduct = () => {
  const [showAll, setShowAll] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);
  const viewAllButtonRef = useRef(null);

  const handleShowLess = () => {
    setShowAll(false);
    // Smooth scroll to the best-selling section
    document.getElementById('best-selling').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleViewAll = () => {
    setShowAll(true);
    // Add a small delay to ensure DOM is updated before scrolling
    setTimeout(() => {
      viewAllButtonRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  // Simulate loading
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const handleFilter = (event) => {
      const { selectedCategories } = event.detail;

      if (selectedCategories.length === 0) {
        setFilteredProducts(products);
        return;
      }

      const filtered = products.filter((product) => {
        return selectedCategories.some((category) => {
          const [mainCategory, subCategory] = category.split("-");

          if (subCategory) {
            // If a subcategory is selected, match both category and subcategory
            return (
              product.category === mainCategory &&
              product.subCategory === subCategory
            );
          } else {
            // If only main category is selected, match just the category
            return product.category === mainCategory;
          }
        });
      });

      setFilteredProducts(filtered);
    };

    window.addEventListener("filterProducts", handleFilter);
    return () => window.removeEventListener("filterProducts", handleFilter);
  }, []);

  const displayedProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, 3);

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="rounded-lg shadow-md overflow-hidden">
          <Skeleton.Image active className="!w-full !h-64" />
          <div className="p-4">
            <Skeleton active title={{ width: "50%" }} paragraph={{ rows: 3 }} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div id="best-selling" className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="bg-red-500 text-white py-1 px-3 rounded-full inline-block text-sm mb-2">
            This Month
          </div>
          <h2 className="text-2xl font-bold">Best Selling Products</h2>
        </div>
      
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4  rounded-lg shadow-sm">
          <img
            src={noproductfound}
            className="w-full max-w-md mx-auto"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!isLoading && filteredProducts.length > 3 && (
        <div className="flex items-center justify-center m-10">
          <button
            ref={viewAllButtonRef}
            onClick={showAll ? handleShowLess : handleViewAll}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            {showAll ? "Show Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BestSellingProduct;

