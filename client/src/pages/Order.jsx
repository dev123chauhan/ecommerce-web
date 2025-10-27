import { useState } from 'react';
import { useSelector } from 'react-redux';
import useOrders from '../hooks/useOrders';
import Loading from '../components/Order/Loading';
import Errors from '../components/Order/Errors';
import OrderDetails from '../components/Order/OrderDetails';
import { calculateOrderTotal, safeToFixed } from '../utils/orderUtils';
import EmptyOrders from '../components/Order/EmptyOrders';
import OrderLists from '../components/Order/OrderLists';
const Order = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const currency = items.length && items.length > 0 ? items[0].currency && items[0].currency : "₹";
  const baseUrl = import.meta.env.VITE_API_URL;
  
  const { orders, loading, error } = useOrders(user?.id, baseUrl);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Errors error={error} />;
  }

  if (selectedOrder) {
    return (
      <OrderDetails 
        order={selectedOrder}
        currency={currency}
        onBack={handleBackToList}
        safeToFixed={safeToFixed}
      />
    );
  }

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300 py-10">
      <div className="min-h-screen py-8 max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 mt-10">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderLists
              key={order._id || `order-${Math.random()}`}
              order={order}
              currency={currency}
              onSelect={handleOrderSelect}
              calculateTotal={calculateOrderTotal}
              safeToFixed={safeToFixed}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;