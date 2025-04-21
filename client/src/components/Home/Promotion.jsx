import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Promotion = () => {
  return (
    <div className="bg-black text-white py-2 px-4 flex items-center justify-between">
      <div className="flex-1" />
      <div className="text-center text-sm sm:text-base flex-grow">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
        <Link to="" className="font-semibold underline hover:text-gray-300">
          ShopNow
        </Link>
      </div>
      <div className="flex items-center flex-1 justify-end">
        <span className="mr-2 text-sm hidden sm:inline">English</span>
        <ChevronDown size={16} />
      </div>
    </div>
  );
};

export default Promotion;