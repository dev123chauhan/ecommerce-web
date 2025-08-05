import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const OrderSummary = ({ 
  selectedPaymentMethod, 
  setSelectedPaymentMethod, 
  onPlaceOrder, 
  loading, 
  totalAmount, 
  currency 
}) => {
  
  const { items } = useSelector((state) => state.cart);

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white sticky top-4">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Order Summary
      </h3>


      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center py-4">
            No items in cart
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden  flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-medium text-sm truncate dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
              <span className="font-medium text-sm flex-shrink-0 ml-2 dark:text-white">
                {item.currency}{item.totalPrice}
              </span>
            </div>
          ))
        )}
      </div>


      <div className="border-t dark:border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
          <span className="dark:text-white">
            {currency}{totalAmount}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
          <span className="text-green-600 dark:text-green-400">Free</span>
        </div>
        <div className="border-t dark:border-gray-700 pt-2">
          <div className="flex justify-between font-semibold text-lg">
            <span className="dark:text-white">Total:</span>
            <span className="dark:text-white">
              {currency}{totalAmount}
            </span>
          </div>
        </div>
      </div>


      <div className="mt-6 space-y-4">
        <h4 className="font-semibold text-base dark:text-white">Payment Method</h4>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3">
            <input
              type="radio"
              id="razorpay"
              name="paymentMethod"
              value="razorpay"
              checked={selectedPaymentMethod === "razorpay"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 text-red-500 focus:ring-red-500 accent-red-500 cursor-pointer"
            />
            <label htmlFor="razorpay" className="flex-1 font-medium cursor-pointer dark:text-white">
              Pay with Razorpay
            </label>
            <img
              src="https://razorpay.com/assets/razorpay-glyph.svg"
              alt="Razorpay"
              className="h-6 w-auto"
            />
          </div>
        </div>
      </div>


      <div className="mt-6">
        <button
          onClick={onPlaceOrder}
          disabled={loading || !selectedPaymentMethod}
          className={`w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold text-sm ${
            loading || !selectedPaymentMethod 
              ? "opacity-70 cursor-not-allowed" 
              : "hover:shadow-lg transform hover:-translate-y-0.5"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Place Order"
          )}
        </button>
        

      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  selectedPaymentMethod: PropTypes.string,
  setSelectedPaymentMethod: PropTypes.func.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  totalAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string.isRequired,
};

export default OrderSummary;