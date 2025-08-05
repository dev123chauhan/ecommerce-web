import { useState } from "react";
import { CreditCard, Landmark, Wallet } from "lucide-react";

const PaymentOption = () => {
  const [selectedMethod, setSelectedMethod] = useState("credit-card");

  const paymentMethods = [
    {
      id: "credit-card",
      title: "Credit Card",
      description: "Pay with Visa, Mastercard, or American Express",
      icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: "digital-wallet",
      title: "Digital Wallet",
      description: "Pay with PayPal, Apple Pay, or Google Pay",
      icon: <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: "bank-transfer",
      title: "Bank Transfer",
      description: "Pay directly from your bank account",
      icon: <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8">
        <div className="space-y-2 mb-6">
          <h3 className="text-base sm:text-lg font-semibold">
            Select Payment Method
          </h3>
          <p className="text-sm text-gray-500">
            Choose your preferred payment option
          </p>
        </div>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`relative flex items-start space-x-2 sm:space-x-3 rounded-lg border p-3 sm:p-4 cursor-pointer 
                   transition-colors
                  ${
                    selectedMethod === method.id
                      ? "border-red-600"
                      : "border-gray-200"
                  }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name="payment-method"
                  id={method.id}
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="appearance-none w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 
                      checked:border-black checked:border-[5px] transition-all cursor-pointer"
                />
              </div>

              <label htmlFor={method.id} className="flex-1 cursor-pointer">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="text-gray-600 flex-shrink-0">
                    {method.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm sm:text-base truncate">
                      {method.title}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                      {method.description}
                    </div>
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm sm:text-base text-gray-600">
              Total Amount
            </span>
            <span className="text-base sm:text-lg font-semibold">$99.99</span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-0 sm:flex sm:space-x-3">
          <button
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-500 
                transition-colors font-medium text-sm sm:text-base disabled:opacity-50 
                disabled:cursor-not-allowed"
            disabled={!selectedMethod}
          >
            Pay Now
          </button>
          <button
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg 
                hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentOption;
