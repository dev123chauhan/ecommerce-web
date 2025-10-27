import StatusBadge from './StatusBadge';
const OrderLists = ({ order, currency, onSelect, calculateTotal, safeToFixed }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-lg">Order #{order.orderId}</h3>
            <StatusBadge status={order.status} size="small" />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(order.orderDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
              {' • '}
              {new Date(order.orderDate).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <button 
              onClick={() => onSelect(order)}
              className="text-sm text-[#db4444] hover:text-[#b83636] underline font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {order.items.map((item, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
              >
                {/* Product Column */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder-image.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        SKU: {item.id?.slice(-8).toUpperCase() || 'N/A'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Price Column */}
                <td className="px-4 py-4 text-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {currency}{safeToFixed(item.price)}
                  </span>
                </td>

                {/* Quantity Column */}
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium">
                    {item.quantity}
                  </span>
                </td>

                {/* Total Column */}
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {currency}{safeToFixed((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          
          {/* Footer with Grand Total */}
          <tfoot className="bg-gray-50 dark:bg-gray-900/30 border-t-2 border-gray-300 dark:border-gray-600">
            <tr>
              <td colSpan="3" className="px-4 py-4 text-right font-semibold text-gray-900 dark:text-white">
                Order Total:
              </td>
              <td className="px-4 py-4 text-right">
                <span className="text-lg font-bold text-[#db4444]">
                  {currency}{safeToFixed(calculateTotal(order.items, order.shipping))}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default OrderLists;