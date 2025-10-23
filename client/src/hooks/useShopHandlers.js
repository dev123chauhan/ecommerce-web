import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSelectedCategories,
  setSelectedSubCategories,
} from "../redux/slice/shopSlice";

export default function useShopHandlers({ categories, setIsFiltering }) {
  const dispatch = useDispatch();
  const { searchTerm, selectedCategories, selectedSubCategories } = useSelector(
    (state) => state.shop
  );
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (category) =>
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );

  const handleCategoryChange = (category) => {
    // Start filtering animation
    setIsFiltering?.(true);

    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    dispatch(setSelectedCategories(newCategories));

    if (selectedCategories.includes(category)) {
      const newSubCategories = selectedSubCategories.filter(
        (sc) => !categories?.[category]?.includes(sc)
      );
      dispatch(setSelectedSubCategories(newSubCategories));
    }

    // End filtering animation after a short delay
    setTimeout(() => setIsFiltering?.(false), 300);
  };

  const handleSubCategoryChange = (subCategory) => {
    setIsFiltering?.(true);

    const newSubCategories = selectedSubCategories.includes(subCategory)
      ? selectedSubCategories.filter((sc) => sc !== subCategory)
      : [...selectedSubCategories, subCategory];
    
    dispatch(setSelectedSubCategories(newSubCategories));

    setTimeout(() => setIsFiltering?.(false), 300);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    
    // Only show filtering state if there's actual text
    if (value.length > 0 || searchTerm.length > 0) {
      setIsFiltering?.(true);
    }
    
    dispatch(setSearchTerm(value));
    
    setTimeout(() => setIsFiltering?.(false), 300);
  };

  return {
    searchTerm,
    selectedCategories,
    selectedSubCategories,
    expandedCategories,
    toggleCategory,
    handleCategoryChange,
    handleSubCategoryChange,
    handleSearchChange,
  };
}