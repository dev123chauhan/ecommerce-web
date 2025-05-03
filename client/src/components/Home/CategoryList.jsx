import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategories, setSelectedSubCategories } from '../../slice/ShopSlice';
import { useGetCategoriesQuery } from '../../slice/ShopApiSlice';
import { Skeleton } from 'antd';

const CategoryList = () => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const dispatch = useDispatch();
  
  // Get selected categories from Redux store
  const { selectedCategories, selectedSubCategories } = useSelector(
    (state) => state.shop
  );
  
  // Fetch categories from the API
  const { data: allCategories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  // Filter to only show retail categories (not gaming-related)

  // const { data: allCategories } = useGetCategoriesQuery();
  // // Force loading state to true for testing
  // const categoriesLoading = true;

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

  // Create a filtered categories object
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

  // Handle category selection
  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
      
    dispatch(setSelectedCategories(newCategories));
    const bestSellingSection = document.getElementById('best-selling');
    if (bestSellingSection) {
      bestSellingSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Remove subcategories if category is unchecked
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

  // Handle subcategory selection
  const handleSubCategoryChange = (subCategory) => {
    const newSubCategories = selectedSubCategories.includes(subCategory)
      ? selectedSubCategories.filter(sc => sc !== subCategory)
      : [...selectedSubCategories, subCategory];
      
    dispatch(setSelectedSubCategories(newSubCategories));
    
    // Scroll to BestSellingProduct section when filter changes
    const bestSellingSection = document.getElementById('best-selling');
    if (bestSellingSection) {
      bestSellingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show Ant Design Skeleton loading state while categories are loading
  if (categoriesLoading || !allCategories) {
    return (
      <div className="w-full pr-4 py-2">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="mb-2">
            <Skeleton.Input active />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full pr-4 py-2">
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
                  <span>
                    {category}
                  </span>
                </div>
                <div>
                  {expandedCategories.includes(category)
                    ? <ChevronDown size={20} />
                    : <ChevronRight size={20} />
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
                <ul className="ml-6">
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
                        <span>
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



// // CategoryList.jsx
// import { useState } from 'react';
// import { ChevronRight, ChevronDown } from 'lucide-react';
// import { categoryData } from '../Category/CategoryData';
// const CategoryList = () => {
//   const [expandedCategories, setExpandedCategories] = useState([]);
//   const [selectedItems, setSelectedItems] = useState({});

//   const toggleCategory = (categoryName) => {
//     setExpandedCategories(prev => 
//       prev.includes(categoryName) 
//         ? prev.filter(name => name !== categoryName)
//         : [...prev, categoryName]
//     );
//   };

//   const toggleCheckbox = (category, subcategory = null) => {
//     setSelectedItems(prev => {
//       const newState = { ...prev };
//       const key = subcategory ? `${category}-${subcategory}` : category;
//       newState[key] = !prev[key];

//       // Scroll to BestSellingProduct section when checkbox is clicked
//       const bestSellingSection = document.getElementById('best-selling');
//       if (bestSellingSection) {
//         bestSellingSection.scrollIntoView({ behavior: 'smooth' });
//       }

//       // Dispatch custom event for product filtering
//       window.dispatchEvent(new CustomEvent('filterProducts', {
//         detail: {
//           selectedCategories: Object.entries(newState)
//             .filter(([, isSelected]) => isSelected)
//             .map(([key]) => key)
//         }
//       }));

//       return newState;
//     });
//   };

//   return (
//     <div className="w-full pr-4 py-2">
//       <ul>  
//         {categoryData.map((category, index) => (
//           <li key={index} className="">
//           {/* <li key={index} className="border-b last:border-b-0"> */}
//             <div className="py-2">
//               <div 
//                 className="flex justify-between items-center cursor-pointer group"
//                 onClick={() => toggleCategory(category.name)}
//               >
//                 <div className="flex items-center gap-2">
//                   <span className="">
//                     {category.name}
//                   </span>
//                 </div>
//                 <div className="">
//                   {expandedCategories.includes(category.name) 
//                     ? <ChevronDown size={20} />
//                     : <ChevronRight size={20} />
//                   }
//                 </div>
//               </div>

//               <div 
//                 className={`overflow-hidden transition-all duration-300 ease-in-out mb-3 ${
//                   expandedCategories.includes(category.name) 
//                     ? 'max-h-96 opacity-100 mt-2' 
//                     : 'max-h-0 opacity-0'
//                 }`}
//               >
//                 <ul className="ml-6">
//                   {category.subCategories.map((subCategory, subIndex) => (
//                     <li 
//                       key={subIndex} 
//                       className="py-1"
//                     >
//                       <div className="flex items-center gap-2">
//                         <input
                          
//                           type="checkbox"
//                           checked={selectedItems[`${category.name}-${subCategory}`] || false}
//                           onChange={() => toggleCheckbox(category.name, subCategory)}
//                           className="w-4 h-4 rounded accent-black"  // यहाँ accent-black add किया गया है

//                         />
//                         <span className="">
//                           {subCategory}
//                         </span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryList;





// import { useState } from 'react';
// import { ChevronRight, ChevronDown } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedCategories, setSelectedSubCategories } from '../../slice/ShopSlice';
// import { useGetCategoriesQuery } from '../../slice/ShopApiSlice';

// const CategoryList = () => {
//   const [expandedCategories, setExpandedCategories] = useState([]);
//   const dispatch = useDispatch();
  
//   // Get selected categories from Redux store
//   const { selectedCategories, selectedSubCategories } = useSelector(
//     (state) => state.shop
//   );
  
//   // Fetch categories from the API
//   const { data: allCategories, isLoading: categoriesLoading } = useGetCategoriesQuery();
//   // Filter to only show retail categories (not gaming-related)
//   const filteredCategoryNames = [
//     "Woman's Fashion",
//     "Men's Fashion",
//     "Electronics",
//     "Home & Lifestyle",
//     "Medicine",
//     "Sports & Outdoor",
//     "Baby's & Toys",
//     "Groceries & Pets",
//     "Health & Beauty"
//   ];

//   // Create a filtered categories object
//   const getFilteredCategories = () => {
//     if (!allCategories) return {};
    
//     const filtered = {};
//     filteredCategoryNames.forEach(categoryName => {
//       if (allCategories[categoryName]) {
//         filtered[categoryName] = allCategories[categoryName];
//       }
//     });
    
//     return filtered;
//   };
  
//   const categories = getFilteredCategories();

//   const toggleCategory = (categoryName) => {
//     setExpandedCategories(prev =>
//       prev.includes(categoryName)
//         ? prev.filter(name => name !== categoryName)
//         : [...prev, categoryName]
//     );
//   };

//   // Handle category selection
//   const handleCategoryChange = (category) => {
//     const newCategories = selectedCategories.includes(category)
//       ? selectedCategories.filter(c => c !== category)
//       : [...selectedCategories, category];
      
//     dispatch(setSelectedCategories(newCategories));
//     const bestSellingSection = document.getElementById('best-selling');
//     if (bestSellingSection) {
//       bestSellingSection.scrollIntoView({ behavior: 'smooth' });
//     }
//     // Remove subcategories if category is unchecked
//     if (selectedCategories.includes(category)) {
//       const newSubCategories = selectedSubCategories.filter(
//         sc => !categories[category]?.includes(sc)
//       );
//       dispatch(setSelectedSubCategories(newSubCategories));
//       const bestSellingSection = document.getElementById('best-selling');
//       if (bestSellingSection) {
//         bestSellingSection.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   };

//   // Handle subcategory selection
//   const handleSubCategoryChange = (subCategory) => {
//     const newSubCategories = selectedSubCategories.includes(subCategory)
//       ? selectedSubCategories.filter(sc => sc !== subCategory)
//       : [...selectedSubCategories, subCategory];
      
//     dispatch(setSelectedSubCategories(newSubCategories));
    
//     // Scroll to BestSellingProduct section when filter changes
//     const bestSellingSection = document.getElementById('best-selling');
//     if (bestSellingSection) {
//       bestSellingSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   // Show loading state while categories are loading
//   if (categoriesLoading || !allCategories) {
//     return (
//       <div className="w-full pr-4 py-2">
//         <div className="animate-pulse">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="h-10 bg-gray-200 rounded mb-2"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full pr-4 py-2">
//       <ul>
//         {Object.entries(categories).map(([category, subCategories], index) => (
//           <li key={index}>
//             <div className="py-2">
//               <div
//                 className="flex justify-between items-center cursor-pointer group" 
//                 onClick={() => toggleCategory(category)}
//               >
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={selectedCategories.includes(category)}
//                     onChange={() => handleCategoryChange(category)}
//                     className="w-4 h-4 rounded accent-black"
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                   <span>
//                     {category}
//                   </span>
//                 </div>
//                 <div>
//                   {expandedCategories.includes(category)
//                     ? <ChevronDown size={20} />
//                     : <ChevronRight size={20} />
//                   }
//                 </div>
//               </div>

//               <div
//                 className={`overflow-hidden transition-all duration-300 ease-in-out mb-3 ${
//                   expandedCategories.includes(category)
//                     ? 'max-h-96 opacity-100 mt-2'
//                     : 'max-h-0 opacity-0'
//                 }`}
//               >
//                 <ul className="ml-6">
//                   {subCategories.map((subCategory, subIndex) => (
//                     <li
//                       key={subIndex}
//                       className="py-1"
//                     >
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={selectedSubCategories.includes(subCategory)}
//                           onChange={() => handleSubCategoryChange(subCategory)}
//                           className="w-4 h-4 rounded accent-black"
//                         />
//                         <span>
//                           {subCategory}
//                         </span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryList;