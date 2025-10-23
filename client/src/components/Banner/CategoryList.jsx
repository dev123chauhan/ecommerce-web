import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategories, setSelectedSubCategories } from '../../redux/slice/shopSlice';
import { useGetCategoriesQuery } from '../../redux/slice/shopApiSlice';
import { Skeleton } from 'antd';
const CategoryList = () => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const dispatch = useDispatch();
  const { selectedCategories, selectedSubCategories } = useSelector(
    (state) => state.shop
  );
  const { data: allCategories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const filteredCategoryNames = [
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty"
  ];
  
  const getFilteredCategories = () => {
    if (!allCategories) return {};
    
    const filtered = {};
    filteredCategoryNames.forEach(categoryName => {
      if (allCategories[categoryName]) {
        filtered[categoryName] = allCategories[categoryName];
      }
    });
    
    return filtered;
  };
  
  const categories = getFilteredCategories();

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };
  
  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
      
    dispatch(setSelectedCategories(newCategories));
    const bestSellingSection = document.getElementById('best-selling');
    if (bestSellingSection) {
      bestSellingSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (selectedCategories.includes(category)) {
      const newSubCategories = selectedSubCategories.filter(
        sc => !categories[category]?.includes(sc)
      );
      dispatch(setSelectedSubCategories(newSubCategories));
      const bestSellingSection = document.getElementById('best-selling');
      if (bestSellingSection) {
        bestSellingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubCategoryChange = (subCategory) => {
    const newSubCategories = selectedSubCategories.includes(subCategory)
      ? selectedSubCategories.filter(sc => sc !== subCategory)
      : [...selectedSubCategories, subCategory];
      
    dispatch(setSelectedSubCategories(newSubCategories));
    
    const bestSellingSection = document.getElementById('best-selling');
    if (bestSellingSection) {
      bestSellingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (categoriesLoading || !allCategories) {
    return (
      <div className="w-full pr-2 sm:pr-4 py-4">
        {[...Array(9)].map((_, i) => (
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
    <div className="w-full pr-2 sm:pr-4 py-2">
      <ul>
        {Object.entries(categories).map(([category, subCategories], index) => (
          <li key={index}>
            <div className="py-2">
              <div
                className="flex justify-between items-center cursor-pointer group" 
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 rounded accent-black"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-sm sm:text-base">
                    {category}
                  </span>
                </div>
                <div>
                  {expandedCategories.includes(category)
                    ? <ChevronDown size={18} className="sm:w-5 sm:h-5" />
                    : <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                  }
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out mb-3 ${
                  expandedCategories.includes(category)
                    ? 'max-h-96 opacity-100 mt-2'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="ml-4 sm:ml-6">
                  {subCategories.map((subCategory, subIndex) => (
                    <li
                      key={subIndex}
                      className="py-1"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedSubCategories.includes(subCategory)}
                          onChange={() => handleSubCategoryChange(subCategory)}
                          className="w-4 h-4 rounded accent-black"
                        />
                        <span className="text-sm sm:text-base">
                          {subCategory}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;