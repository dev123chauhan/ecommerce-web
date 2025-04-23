// // import React from 'react'
// import visa from "../../assets/visa.png"
// import mastercard from "../../assets/mastercard.png"
// import rupaycard from "../../assets/rupaycard.png"
// import { useSelector } from "react-redux";

// export default function OrderSummary() {
// const phonepe = "https://www.phonepe.com/webstatic/9189/static/PhonePe_vertical-16158be8710408f3561e1d07d01d5d89.png"
// const googlepay = "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202105/Google-Pay-hero_1.jpg"
// const paytm = "https://cdn.iconscout.com/icon/free/png-256/free-paytm-logo-icon-download-in-svg-png-gif-file-formats--online-payment-brand-logos-pack-icons-226448.png?f=webp&w=256"
// const { items, totalAmount } = useSelector((state) => state.cart);
// const currency = items.length > 0 ? items[0].currency : "";
// return (
//     <div className="w-full lg:w-1/3">
//         <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
//           <h3 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h3>

//           <div className="space-y-3 mb-4">
//             {items.length === 0 ? (
//               <div className="text-gray-500">No items</div>
//             ) : (
//               items.map((item) => (
//                 <div key={item.id} className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 object-contain bg-gray-50 rounded p-1"
//                     />
//                     <div className="flex flex-col">
//                       <span className="font-medium">{item.name}</span>
//                       <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
//                     </div>
//                   </div>
//                   <span className="font-medium">{item.currency}{item.totalPrice}</span>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Order totals */}
//           <div className="border-t pt-4 space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Subtotal:</span>
//               <span>{currency}{totalAmount}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Shipping:</span>
//               <span className="text-green-600">Free</span>
//             </div>
//             <div className="flex justify-between font-semibold text-lg">
//               <span>Total:</span>
//               <span>{currency}{totalAmount}</span>
//             </div>
//           </div>

//           {/* Payment methods */}
//           <div className="mt-6 space-y-4">
//             <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
//               <input
//                 type="radio"
//                 id="bank"
//                 name="paymentMethod"
//                 className="w-4 h-4 rounded accent-black"
//               />
//               <label htmlFor="bank" className="font-medium">Bank</label>
//               <div className="flex gap-2 ml-auto">
//                 {[visa, mastercard, rupaycard].map((card, index) => (
//                   <img
//                     key={index}
//                     src={card}
//                     alt={`Payment card ${index + 1}`}
//                     className="h-8 sm:h-10 object-contain"
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
//               <input
//                 type="radio"
//                 id="UPI"
//                 name="paymentMethod"
//                 className="w-4 h-4 rounded accent-black"
//               />
//               <label htmlFor="UPI" className="font-medium">UPI</label>
//               <div className="flex gap-2 ml-auto hover:cursor-pointer">
//                 {[phonepe, googlepay, paytm].map((card, index) => (
//                   <img
//                     key={index}
//                     src={card}
//                     alt={`Payment card ${index + 1}`}
//                     className="h-8 sm:h-10 object-contain"
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//               <input
//                 type="radio"
//                 id="cashOnDelivery"
//                 name="paymentMethod"
//                 className="w-4 h-4 rounded accent-black"
//                 defaultChecked
//               />
//               <label htmlFor="cashOnDelivery" className="font-medium">
//                 Cash on delivery
//               </label>
//             </div>
//           </div>

//           {/* Coupon and Place Order */}
//           <div className="mt-6 space-y-4">
//             <div className="flex flex-col sm:flex-row gap-2">
//               <input
//                 type="text"
//                 placeholder="Coupon Code"
//                 className="flex-grow p-2.5 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
//               />
//               <button className="bg-red-500 text-white px-1 py-1 rounded-lg hover:bg-red-600 transition-colors">
//                 Apply Coupon
//               </button>
//             </div>
//             <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
// )
// }
import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";
import rupaycard from "../../assets/rupaycard.png";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  const phonepe =
    "https://www.phonepe.com/webstatic/9189/static/PhonePe_vertical-16158be8710408f3561e1d07d01d5d89.png";
  const googlepay =
    "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202105/Google-Pay-hero_1.jpg";
  const paytm =
    "https://cdn.iconscout.com/icon/free/png-256/free-paytm-logo-icon-download-in-svg-png-gif-file-formats--online-payment-brand-logos-pack-icons-226448.png?f=webp&w=256";
  const { items, totalAmount } = useSelector((state) => state.cart);
  const currency = items.length > 0 ? items[0].currency : "";

  // Create named arrays with identifiers for proper keys
  const bankCards = [
    { id: 1, name: "visa", src: visa, alt: "Visa" },
    { id: 2, name: "mastercard", src: mastercard, alt: "Mastercard" },
    { id: 3, name: "rupaycard", src: rupaycard, alt: "Rupay Card" },
  ];

  const upiOptions = [
    { id: 1, name: "phonepe", src: phonepe, alt: "PhonePe" },
    { id: 2, name: "googlepay", src: googlepay, alt: "Google Pay" },
    { id: 3, name: "paytm", src: paytm, alt: "Paytm" },
  ];

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
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
                    className="w-12 h-12 object-contain bg-gray-50 rounded p-1"
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

        {/* Order totals */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span>
              {currency}
              {totalAmount}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping:</span>
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

        {/* Payment methods */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input
              type="radio"
              id="bank"
              name="paymentMethod"
              className="w-4 h-4 rounded accent-black  cursor-pointer"
            />
            <label htmlFor="bank" className="font-medium">
              Bank
            </label>
            <div className="flex gap-2 ml-auto">
              {bankCards.map((card, index) => (
                <div key={index}>
                  <img
                    key={card.name}
                    src={card.src}
                    alt={card.alt}
                    className="h-8 sm:h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input
              type="radio"
              id="UPI"
              name="paymentMethod"
              className="w-4 h-4 rounded accent-black cursor-pointer"
            />
            <label htmlFor="UPI" className="font-medium">
              UPI
            </label>
            <div className="flex gap-2 ml-auto hover:cursor-pointer">
              {upiOptions.map((option, index) => (
                <div key={index}>
                  <img
                    key={option.name}
                    src={option.src}
                    alt={option.alt}
                    className="h-8 sm:h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              className="w-4 h-4 rounded accent-black cursor-pointer"
              defaultChecked
            />
            <label htmlFor="cashOnDelivery" className="font-medium">
              Cash on delivery
            </label>
          </div>
        </div>

        {/* Coupon and Place Order */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-grow p-2.5 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <button className="bg-red-500 text-white px-1 py-1 rounded-lg hover:bg-red-600 transition-colors">
              Apply Coupon
            </button>
          </div>
          <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
