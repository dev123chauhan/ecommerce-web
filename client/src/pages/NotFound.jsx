import {  useNavigate } from "react-router-dom";
import Button from "../common/Button";
const NotFound = () => {
  const navigate = useNavigate()
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
      <Button text="Back To Home" onClick={()=>navigate("/")} className="py-3 primaryColor text-white"/>
    </div>
    </div>
  );
};

export default NotFound;