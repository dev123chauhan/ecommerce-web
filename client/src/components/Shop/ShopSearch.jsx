import PropTypes from "prop-types";
import CategoryFilter from "./CategoryFilter";

export default function ShopSearch({ categories, handlers, loading }) {
  return (
    <div className="rounded-xl shadow-sm py-6 sticky top-8">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          value={handlers.searchTerm}
          onChange={handlers.handleSearchChange}
        />
      </div>

      {/* Categories */}
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <CategoryFilter categories={categories} handlers={handlers} loading={loading} />
    </div>
  );
}

ShopSearch.propTypes = {
  categories: PropTypes.object,
  handlers: PropTypes.shape({
    selectedCategories: PropTypes.array.isRequired,
    selectedSubCategories: PropTypes.array.isRequired,
    expandedCategories: PropTypes.array.isRequired,
    handleCategoryChange: PropTypes.func.isRequired,
    handleSubCategoryChange: PropTypes.func.isRequired,
    toggleCategory: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
};