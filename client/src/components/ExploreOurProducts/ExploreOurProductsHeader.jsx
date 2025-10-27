import { ArrowLeft, ArrowRight } from 'lucide-react';
export default function ExploreOurProductsHeader({ page, pages, onPreviousPage, onNextPage }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <div className="mb-4 sm:mb-0">
        <div className="primaryColor text-white py-1 px-3 rounded-full inline-block text-sm mb-2">
          Our Products
        </div>
        <h2 className="text-2xl font-bold">Explore Our Products</h2>
      </div>
      
      <div className="flex space-x-2">
        <button
          className={`p-2 rounded-full transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
            page === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          onClick={onPreviousPage}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ArrowLeft size={30} strokeWidth={1}  />
        </button>
        <button
          className={`p-2 rounded-full transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
            page === pages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          onClick={onNextPage}
          disabled={page === pages}
          aria-label="Next page"
        >
          <ArrowRight size={30} strokeWidth={1}  />
        </button>
      </div>
    </div>
  );
}