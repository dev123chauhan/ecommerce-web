const OrderSummary = ({ subtotal, shipping, tax, total, currency, safeToFixed }) => {
  return (
    <div className="border-t pt-4 mb-6">
      <div className="space-y-2 ml-auto max-w-xs">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span>{currency}{safeToFixed(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span>{currency}{safeToFixed(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span>{currency}{safeToFixed(tax)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>{currency}{safeToFixed(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;