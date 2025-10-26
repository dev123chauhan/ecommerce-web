import { useState, useEffect } from 'react';
const useOrders = (userId, baseUrl) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setError("Please log in to view your orders");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/orders/user/${userId}`);
        
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
  }, [userId, baseUrl]);

  return { orders, loading, error };
};

export default useOrders;