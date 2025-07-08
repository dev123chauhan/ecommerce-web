const EmptyCartItem = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <svg
        viewBox="0 0 240 240"
        className="w-48 h-48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cart Body */}
        <path
          d="M40 80h160l-20 100H60L40 80z"
          fill="#f3f4f6"
          stroke="#9ca3af"
          strokeWidth="4"
        />
        
        {/* Cart Handle */}
        <path
          d="M90 70c0-20 15-35 35-35s35 15 35 35"
          stroke="#9ca3af"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Wheels */}
        <circle cx="85" cy="190" r="12" fill="#9ca3af" />
        <circle cx="155" cy="190" r="12" fill="#9ca3af" />
        
        {/* Empty State Elements */}
        <path
          d="M100 120l40 40M140 120l-40 40"
          stroke="#9ca3af"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Decorative Dots */}
        <circle cx="120" cy="140" r="4" fill="#9ca3af" />
        <circle cx="100" cy="140" r="4" fill="#9ca3af" />
        <circle cx="140" cy="140" r="4" fill="#9ca3af" />
      </svg>
      <p className="mt-4 text-gray-500 text-lg">No Item in cart</p>
      <p className="text-gray-400 text-sm">Add items to get started</p>
    </div>
  );
};

export default EmptyCartItem;