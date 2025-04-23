import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { categories } from "../Category/CategoryData";

const CategoryCard = ({ name, icon, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors duration-300 hover:cursor-pointer
      ${isActive ? "bg-red-500 text-white" : ""}`}
  >
    <div className={`w-16 h-16 flex items-center justify-center mb-2 ${isActive ? "text-white" : ""}`}>
      <span>{icon}</span>
    </div>
    <span className="text-sm font-medium">{name}</span>
  </div>
);

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const Category = () => {
  const scrollContainerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const targetScroll =
        container.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="bg-red-500 text-white py-2 px-4 rounded-t-lg inline-block mb-2">
        <span className="font-bold">Categories</span>
      </div>

      <div className="rounded-b-lg rounded-tr-lg">
        <h2 className="text-2xl font-bold mb-6">Browse By Category</h2>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {categories.map((category, index) => (
              <div
                key={`${category.name}-${index}`}
                className="flex-shrink-0 w-32"
              >
                <CategoryCard
                  {...category}
                  isActive={category.name === activeCategory}
                  onClick={() => setActiveCategory(category.name)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Category;