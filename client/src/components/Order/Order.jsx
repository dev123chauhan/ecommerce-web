import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AlertCircle, Package } from "lucide-react";
import { Link } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const currency = items.length && items.length > 0 ? items[0].currency && items[0].currency : "₹";
  const baseUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setError("Please log in to view your orders");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/orders/user/${user.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        console.log("API Response:", data); 
        const formattedOrders = Array.isArray(data.orders) ? data.orders.map(order => ({
          _id: order._id,
          orderId: order._id.slice(-6).toUpperCase(), 
          orderDate: order.createdAt,
          status: order.status || "Processing", 
          paymentMethod: order.paymentMethod || "Card",
          shipping: 0, 
          items: order.items.map(item => ({
            id: item._id,
            name: item.name,
            image: item.image,
            price: parseFloat(item.price) || 0,
            quantity: parseInt(item.quantity) || 1,
          })),
          customerInfo: {
            name: order.shippingAddress?.firstName || "Customer",
            email: order.shippingAddress?.emailAddress || "No email provided",
            address: order.shippingAddress?.streetAddress + 
                    (order.shippingAddress?.apartment ? ", " + order.shippingAddress.apartment : ""),
            city: order.shippingAddress?.townCity || "Unknown",
            zipCode: "10001" 
          }
        })) : [];
        
        setOrders(formattedOrders);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, baseUrl]);

  const safeToFixed = (value, decimals = 2) => {
    const num = parseFloat(value);
    return isNaN(num) ? "0.00" : num.toFixed(decimals);
  };

  const calculateOrderTotal = (items, shipping = 0) => {
    if (!items || !Array.isArray(items)) return 0;
    
    const subtotal = items.reduce(
      (sum, item) => sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1),
      0
    );
    const tax = subtotal * 0.08;
    return subtotal + (parseFloat(shipping) || 0) + tax;
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen dark:bg-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-red-500 border-r-transparent mb-4"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen dark:bg-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Error Loading Orders</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (selectedOrder) {
    const subtotal = selectedOrder.items.reduce(
      (sum, item) => sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1),
      0
    );
    const shipping = parseFloat(selectedOrder.shipping) || 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
      <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <div className="min-h-screen py-4 sm:py-8 max-w-7xl mx-auto px-4">
          <button 
            onClick={handleBackToList}
            className="mb-6 flex items-center text-red-500 hover:text-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Order List
          </button>
          
          <div className="border-b pb-4 mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h1 className="text-xl sm:text-2xl font-bold">Order Details</h1>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap
                ${selectedOrder.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800' : 
                  selectedOrder.status.toLowerCase() === 'processing' ? 'bg-blue-100 text-blue-800' : 
                  selectedOrder.status.toLowerCase() === 'shipped' ? 'bg-purple-100 text-purple-800' : 
                  'bg-gray-100 text-gray-800'}`}
              >
                {selectedOrder.status}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-gray-600 dark:text-gray-400">Order Number</p>
                <p className="font-semibold">{selectedOrder.orderId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 dark:text-gray-400">Order Date</p>
                <p className="font-semibold">
                  {new Date(selectedOrder.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 dark:text-gray-400">Payment Method</p>
                <p className="font-semibold">{selectedOrder.paymentMethod}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {selectedOrder.items.map((item, index) => (
                <div
                  key={item.id || `item-${index}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center border-b last:border-b-0 pb-4 last:pb-0 gap-4"
                >
                  <img
                    src={item.image || "/placeholder-image.jpg"}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded  p-2"
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

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-semibold">{selectedOrder.customerInfo.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-semibold">{selectedOrder.customerInfo.email}</p>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <p className="text-gray-600 dark:text-gray-400">Shipping Address</p>
                <p className="font-semibold">
                  {selectedOrder.customerInfo.address}
                  <br />
                  {selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.zipCode}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="w-full sm:flex-1 bg-red-500 text-white py-3 sm:py-2 px-4 rounded hover:bg-red-600 transition duration-200">
              Track Order
            </button>
            <button className="w-full sm:flex-1 border border-gray-300 dark:border-gray-700 py-3 sm:py-2 px-4 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No orders found state
  if (orders.length === 0) {
    return (
      <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <div className="min-h-screen py-12  max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 mt-10  text-center sm:text-left">My Orders</h1>
          
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center max-w-md mx-auto">
              <Package className="h-24 w-24 text-gray-400 dark:text-gray-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No Orders Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                You have not placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link 
                to="/shop" 
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-200 font-semibold"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300 py-10">
      <div className="min-h-screen py-8 max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 mt-10">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order._id || `order-${Math.random()}`} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-red-200 dark:hover:border-red-900 transition-colors"
              onClick={() => handleOrderSelect(order)}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{order.orderId}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full
                      ${order.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800' : 
                        order.status.toLowerCase() === 'processing' ? 'bg-blue-100 text-blue-800' : 
                        order.status.toLowerCase() === 'shipped' ? 'bg-purple-100 text-purple-800' : 
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ordered on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                       {item.name}
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        +{order.items.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end justify-between">
                  <div className="text-lg font-bold">{currency}{safeToFixed(calculateOrderTotal(order.items, order.shipping))}</div>
                  <button className="text-sm text-red-500 hover:text-red-600 underline">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;