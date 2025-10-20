import PropTypes from "prop-types";
export default function SubCategoryFilter({ subCategories, expanded, handlers }) {
  return (
    <div
      className={`ml-6 overflow-hidden transition-all duration-300 ${
        expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="space-y-1">
        {subCategories.map((subCategory) => (
          <label key={subCategory} className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={handlers.selectedSubCategories.includes(subCategory)}
              onChange={() => handlers.handleSubCategoryChange(subCategory)}
              className="w-4 h-4 accent-black"
            />
            {subCategory}
          </label>
        ))}
      </div>
    </div>
  );
}

SubCategoryFilter.propTypes = {
  subCategories: PropTypes.array.isRequired,
  expanded: PropTypes.bool,
  handlers: PropTypes.shape({
    selectedSubCategories: PropTypes.array.isRequired,
    handleSubCategoryChange: PropTypes.func.isRequired,
  }).isRequired,
};
