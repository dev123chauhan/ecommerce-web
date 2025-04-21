import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

const AnnouncementBanner = ({ onVisibilityChange }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Notify parent component when visibility changes
  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isVisible);
    }
  }, [isVisible, onVisibilityChange]);

  if (!isVisible) return null;

  return (
    <div className="relative bg-black text-white px-4 py-3">
      <div className="flex items-center justify-center gap-x-6 max-w-screen-xl mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden text-center text-sm flex-1">
          <p>Summer Sale For All Swim Suits - OFF 50%!</p>
          <a href="#" className="font-semibold underline">
            ShopNow
          </a>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-center flex-1 text-sm">
          <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
          <a href="#" className="font-semibold underline ml-2">
            ShopNow
          </a>
        </div>

        {/* Language Selector */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm">English</span>
          <svg 
            className="h-4 w-4 text-white"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-75"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

AnnouncementBanner.propTypes = {
  onVisibilityChange: PropTypes.func
};

export default AnnouncementBanner;
// import  { useState } from 'react';
// import { X } from 'lucide-react';

// const AnnouncementBanner = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   if (!isVisible) return null;

//   return (
//     <div className="relative bg-black text-white px-4 py-3">
//       <div className="flex items-center justify-center gap-x-6 max-w-screen-xl mx-auto">
//         {/* Mobile Layout */}
//         <div className="md:hidden text-center text-sm flex-1">
//           <p>Summer Sale For All Swim Suits - OFF 50%!</p>
//           <a href="#" className="font-semibold underline">
//             ShopNow
//           </a>
//         </div>

//         {/* Desktop Layout */}
//         <div className="hidden md:flex items-center justify-center flex-1 text-sm">
//           <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
//           <a href="#" className="font-semibold underline ml-2">
//             ShopNow
//           </a>
//         </div>

//         {/* Language Selector */}
//         <div className="hidden md:flex items-center gap-2">
//           <span className="text-sm">English</span>
//           <svg 
//             className="h-4 w-4 text-white"
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>

//         {/* Close Button */}
//         <button
//           onClick={() => setIsVisible(false)}
//           className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:opacity-75"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AnnouncementBanner;


