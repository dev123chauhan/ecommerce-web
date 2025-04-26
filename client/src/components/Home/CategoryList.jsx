// CategoryList.jsx
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { categoryData } from '../Category/CategoryData';
const CategoryList = () => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleCheckbox = (category, subcategory = null) => {
    setSelectedItems(prev => {
      const newState = { ...prev };
      const key = subcategory ? `${category}-${subcategory}` : category;
      newState[key] = !prev[key];

      // Scroll to BestSellingProduct section when checkbox is clicked
      const bestSellingSection = document.getElementById('best-selling');
      if (bestSellingSection) {
        bestSellingSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Dispatch custom event for product filtering
      window.dispatchEvent(new CustomEvent('filterProducts', {
        detail: {
          selectedCategories: Object.entries(newState)
            .filter(([, isSelected]) => isSelected)
            .map(([key]) => key)
        }
      }));

      return newState;
    });
  };

  return (
    <div className="w-full pr-4 py-2">
      <ul>  
        {categoryData.map((category, index) => (
          <li key={index} className="">
          {/* <li key={index} className="border-b last:border-b-0"> */}
            <div className="py-2">
              <div 
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-center gap-2">
                  <span className="">
                    {category.name}
                  </span>
                </div>
                <div className="">
                  {expandedCategories.includes(category.name) 
                    ? <ChevronDown size={20} />
                    : <ChevronRight size={20} />
                  }
                </div>
              </div>

              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out mb-3 ${
                  expandedCategories.includes(category.name) 
                    ? 'max-h-96 opacity-100 mt-2' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="ml-6">
                  {category.subCategories.map((subCategory, subIndex) => (
                    <li 
                      key={subIndex} 
                      className="py-1"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          
                          type="checkbox"
                          checked={selectedItems[`${category.name}-${subCategory}`] || false}
                          onChange={() => toggleCheckbox(category.name, subCategory)}
                          className="w-4 h-4 rounded accent-black"  // यहाँ accent-black add किया गया है

                        />
                        <span className="">
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

