import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function OrderSummary({ 
  selectedPaymentMethod, 
  setSelectedPaymentMethod, 
  onPlaceOrder, 
  loading, 
  totalAmount, 
  currency 
}) {
  const phonepe =
    "https://cdn.freelogovectors.net/wp-content/uploads/2023/11/phonepe_logo-freelogovectors.net_-640x474.png";
  const googlepay =
    "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png";
  const paytm =
    "https://cdn.iconscout.com/icon/free/png-256/free-paytm-logo-icon-download-in-svg-png-gif-file-formats--online-payment-brand-logos-pack-icons-226448.png?f=webp&w=256";
  
  const { items } = useSelector((state) => state.cart);


  const upiOptions = [
    { id: 1, name: "phonepe", src: phonepe, alt: "PhonePe" },
    { id: 2, name: "googlepay", src: googlepay, alt: "Google Pay" },
    { id: 3, name: "paytm", src: paytm, alt: "Paytm" },
  ];

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h3>

        <div className="space-y-3 mb-4">
          {items.length === 0 ? (
            <div className="text-gray-500">No items</div>
          ) : (
            items &&
            items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded p-1"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-medium">
                  {item.currency}
                  {item.totalPrice}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="border-t dark:border-gray-700 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
            <span>
              {currency}
              {totalAmount}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>
              {currency}
              {totalAmount}
            </span>
          </div>
        </div>


        <div className="mt-6 space-y-4">
          <h4 className="font-semibold text-base">Payment Method</h4>

          <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
            <input
              type="radio"
              id="UPI"
              name="paymentMethod"
              value="upi"
              checked={selectedPaymentMethod === "upi"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 rounded accent-black cursor-pointer"
            />
            <label htmlFor="UPI" className="font-medium">
              UPI
            </label>
            <div className="flex gap-6 ml-auto hover:cursor-pointer">
              {upiOptions.map((option, index) => (
                <div key={index}>
                  <img
                    key={option.name}
                    src={option.src}
                    alt={option.alt}
                    className="w-full h-full sm:h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
            <input
              type="radio"
              id="razorpay"
              name="paymentMethod"
              value="razorpay"
              checked={selectedPaymentMethod === "razorpay"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 rounded accent-black cursor-pointer"
            />
            <label htmlFor="razorpay" className="font-medium">
              Pay with Razorpay
            </label>
            <img
              src="https://razorpay.com/assets/razorpay-glyph.svg"
              alt="Razorpay"
              className="h-8 ml-auto"
            />
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="cash_on_delivery"
              checked={selectedPaymentMethod === "cash_on_delivery"}
              onChange={handlePaymentMethodChange}
              className="w-4 h-4 rounded accent-black cursor-pointer"
            />
            <label htmlFor="cashOnDelivery" className="font-medium">
              Cash on delivery
            </label>
          </div>
        </div>


        <div className="mt-6">
          <button
            onClick={onPlaceOrder}
            disabled={loading}
            className={`w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold text-sm ${
              loading ? "opacity-70 cursor-not-allowed" : ""
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
    </div>
  );
}

OrderSummary.propTypes = {
  selectedPaymentMethod: PropTypes.string.isRequired,
  setSelectedPaymentMethod: PropTypes.func.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  totalAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string.isRequired,
};