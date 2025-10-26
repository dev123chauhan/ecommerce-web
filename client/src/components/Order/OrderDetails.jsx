import OrderItemsList from "./OrderItemsList";
import OrderSummary from "./OrderSummary";
import ShippingInfo from "./ShippingInfo";
import StatusBadge from "./StatusBadge";
const OrderDetails = ({ order, currency, onBack, safeToFixed }) => {
  const subtotal = order.items.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1),
    0
  );
  const shipping = parseFloat(order.shipping) || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="py-4 sm:py-8 max-w-7xl mx-auto px-4">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center text-[#db4444]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Order List
        </button>
        
        <div className="border-b pb-4 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold">Order Details</h1>
            <StatusBadge status={order.status} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-gray-600 dark:text-gray-400">Order Number</p>
              <p className="font-semibold">{order.orderId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 dark:text-gray-400">Order Date</p>
              <p className="font-semibold">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 dark:text-gray-400">Payment Method</p>
              <p className="font-semibold">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        <OrderItemsList items={order.items} currency={currency} safeToFixed={safeToFixed} />
        
        <OrderSummary 
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          currency={currency}
          safeToFixed={safeToFixed}
        />
        
        <ShippingInfo customerInfo={order.customerInfo} />

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="w-full sm:flex-1 primaryColor text-white py-3 sm:py-2 px-4 rounded-full transition duration-200">
            Track Order
          </button>
          <button className="w-full sm:flex-1 border border-gray-300 dark:border-gray-700 py-3 sm:py-2 px-4 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;