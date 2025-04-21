// import React from 'react';
import gamepad from "../../assets/gamepad.png";
import keyboard from "../../assets/keyboard.png";
const Order = () => {
  const orderData = {
    orderId: "#ORD123456",
    orderDate: "2024-11-04",
    status: "Processing",
    items: [
      {
        id: 1,
        name: "Premium Headphones",
        price: 199.99,
        quantity: 2,
        image: gamepad,
      },
      {
        id: 2,
        name: "Wireless Mouse",
        price: 49.99,
        quantity: 1,
        image: keyboard,
      },
    ],
    customerInfo: {
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St, Apt 4B",
      city: "New York",
      zipCode: "10001",
    },
    paymentMethod: "Credit Card (**** **** **** 1234)",
    shipping: 9.99,
  };

  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + orderData.shipping + tax;

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <div className="min-h-screen  py-4 sm:py-8 max-w-7xl mx-auto">
      <div className="">
        {/* Order Header */}
        <div className="border-b pb-4 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold">Order Details</h1>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold whitespace-nowrap">
              {orderData.status}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-gray-600">Order Number</p>
              <p className="font-semibold">{orderData.orderId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Order Date</p>
              <p className="font-semibold">
                {new Date(orderData.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Payment Method</p>
              <p className="font-semibold">{orderData.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {orderData.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center border-b last:border-b-0 pb-4 last:pb-0 gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <div className="flex flex-wrap gap-4">
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto text-left sm:text-right mt-2 sm:mt-0">
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="border-t pt-4 mb-6">
          <div className="space-y-2 ml-auto">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>${orderData.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-gray-600">Name</p>
              <p className="font-semibold">{orderData.customerInfo.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{orderData.customerInfo.email}</p>
            </div>
            <div className="sm:col-span-2 space-y-1">
              <p className="text-gray-600">Shipping Address</p>
              <p className="font-semibold">
                {orderData.customerInfo.address}
                <br />
                {orderData.customerInfo.city}, {orderData.customerInfo.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="w-full sm:flex-1 bg-red-500 text-white py-3 sm:py-2 px-4 rounded hover:bg-red-600 transition duration-200">
            Track Order
          </button>
          <button className="w-full sm:flex-1 border border-gray-300 py-3 sm:py-2 px-4 rounded hover:bg-gray-50 transition duration-200">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Order;
