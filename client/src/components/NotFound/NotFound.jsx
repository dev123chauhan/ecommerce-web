import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <div className="flex flex-col items-center justify-center min-h-screen px-4 font-sans text-center">
      <div className="absolute top-5 left-5 text-sm text-gray-500">
        Home / 404 Error
      </div>
      <h1 className="text-5xl font-bold mb-4 sm:text-6xl">404 Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your visited page not found. You may go home page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-500 text-white text-lg rounded hover:bg-red-600 transition-colors duration-300"
      >
        Back to home page
      </Link>
    </div>
    </div>
  );
};

export default NotFound;