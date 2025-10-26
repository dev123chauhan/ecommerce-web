import { AlertCircle } from "lucide-react";
const Errors = ({ error }) => {
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <AlertCircle className="h-12 w-12 text-[#db4444] mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Error Loading Orders</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 primaryColor text-white rounded transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Errors;