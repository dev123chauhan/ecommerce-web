import { Package } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Button from "../../common/Button";
const EmptyOrders = () => {
  const navigate = useNavigate();
  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="py-12 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 mt-10 text-center sm:text-left">My Orders</h1>
        
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center max-w-md mx-auto">
            <Package className="h-24 w-24 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No Orders Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              You have not placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button
              onClick={() => navigate("/shop")} 
              text="Start Shopping" 
              className="primaryColor text-white py-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyOrders;