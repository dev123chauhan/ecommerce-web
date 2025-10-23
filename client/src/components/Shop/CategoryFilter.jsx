import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import SubCategoryFilter from "./SubCategoryFilter";
import { Skeleton } from "antd";

export default function CategoryFilter({ categories, handlers, loading }) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {[...Array(23)].map((_, i) => (
           <div key={i} className="mb-2">
            <Skeleton.Input 
              active 
              style={{ 
                width: '100%',
                maxWidth: '100%'
              }}
              className="!w-full !h-8 sm:!h-10"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {categories &&
        Object.entries(categories).map(([category, subCategories]) => (
          <div key={category} className="py-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={handlers.selectedCategories.includes(category)}
                  onChange={() => handlers.handleCategoryChange(category)}
                  className="w-4 h-4 accent-black"
                />
                {category}
              </label>
              <button onClick={() => handlers.toggleCategory(category)} className="p-1">
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    handlers.expandedCategories.includes(category) ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <SubCategoryFilter
              subCategories={subCategories}
              expanded={handlers.expandedCategories.includes(category)}
              handlers={handlers}
            />
          </div>
        ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.object,
  handlers: PropTypes.shape({
    selectedCategories: PropTypes.array.isRequired,
    selectedSubCategories: PropTypes.array.isRequired,
    expandedCategories: PropTypes.array.isRequired,
    handleCategoryChange: PropTypes.func.isRequired,
    handleSubCategoryChange: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
};
