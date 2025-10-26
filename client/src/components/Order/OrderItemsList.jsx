const OrderItemsList = ({ items, currency, safeToFixed }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Order Items</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id || `item-${index}`}
            className="flex flex-col sm:flex-row items-start sm:items-center border-b last:border-b-0 pb-4 last:pb-0 gap-4"
          >
            <img
              src={item.image || "/placeholder-image.jpg"}
              alt={item.name}
              className="w-20 h-20 object-contain rounded p-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-image.jpg";
              }}
            />
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold">{item.name}</h3>
              <div className="flex flex-wrap gap-4">
                <p className="text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Price: {currency}{safeToFixed(item.price)}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto text-left sm:text-right mt-2 sm:mt-0">
              <p className="font-semibold">
                {currency}{safeToFixed((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemsList;