import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import { createOrder } from "../redux/slice/orderSlice";
import { createRazorpayOrder, getRazorpayKey, verifyPayment } from "../redux/slice/paymentSlice";
import {
  validateEmail,
  validateFirstName,
  validatePhoneNumber,
  validateStreetAddress,
  validateTownCity,
} from "../validation/validation";
import BillingForm from "../components/Billing/BillingForm";
import OrderSummary from "../components/Billing/OrderSummary";

const Billing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const {
    razorpayKey,
    razorpayOrder,
    loading: paymentLoading,
  } = useSelector((state) => state.payment);
  const { loading: orderLoading } = useSelector((state) => state.order);

  const currency = items.length && items.length > 0 ? items[0].currency && items[0].currency : "";

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

  // Formik setup 🎯
  const formik = useFormik({
    initialValues: {
      firstName: "",
      streetAddress: "",
      apartment: "",
      townCity: "",
      phoneNumber: "",
      emailAddress: "",
    },
    validate: (values) => {
      const errors = {};

      const firstNameValidation = validateFirstName(values.firstName);
      if (!firstNameValidation.isValid) {
        errors.firstName = firstNameValidation.message;
      }

      const streetAddressValidation = validateStreetAddress(values.streetAddress);
      if (!streetAddressValidation.isValid) {
        errors.streetAddress = streetAddressValidation.message;
      }

      const townCityValidation = validateTownCity(values.townCity);
      if (!townCityValidation.isValid) {
        errors.townCity = townCityValidation.message;
      }

      const phoneNumberValidation = validatePhoneNumber(values.phoneNumber);
      if (!phoneNumberValidation.isValid) {
        errors.phoneNumber = phoneNumberValidation.message;
      }

      const emailValidation = validateEmail(values.emailAddress);
      if (!emailValidation.isValid) {
        errors.emailAddress = emailValidation.message;
      }

      return errors;
    },
    onSubmit: async (values) => {
      if (!user?.id) {
        toast.error("Please log in to place an order");
        return;
      }

      if (items.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      try {
        const orderData = {
          userId: user.id,
          items: items,
          shippingAddress: {
            firstName: values.firstName,
            streetAddress: values.streetAddress,
            apartment: values.apartment,
            townCity: values.townCity,
            phoneNumber: values.phoneNumber,
            emailAddress: values.emailAddress,
          },
          totalAmount,
          currency,
          paymentMethod: selectedPaymentMethod,
        };

        const response = await dispatch(createOrder(orderData)).unwrap();
        const orderId = response.order._id;

        if (selectedPaymentMethod === "razorpay") {
          await dispatch(
            createRazorpayOrder({ amount: totalAmount, orderId })
          ).unwrap();
        } else {
          toast.success("Order placed successfully!");
          navigate("/order");
        }
      } catch (error) {
        toast.error(error.message || "Failed to place order");
      }
    },
  });

  useEffect(() => {
    dispatch(getRazorpayKey());
  }, [dispatch]);

  useEffect(() => {
    if (razorpayOrder && razorpayKey && selectedPaymentMethod === "razorpay" && orderLoading === false) {
      handleRazorpayPayment(razorpayOrder.receipt);
    }
  }, [razorpayOrder, razorpayKey, orderLoading]);

  const handleRazorpayPayment = (orderId) => {
    if (!razorpayKey || !razorpayOrder || !razorpayOrder.amount) {
      toast.error("Payment initialization failed - missing payment details");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Your E-commerce Store",
      description: "Purchase Payment",
      order_id: razorpayOrder.id,
      handler: function (response) {
        const paymentData = {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          orderId: orderId,
        };

        dispatch(verifyPayment(paymentData))
          .unwrap()
          .then(() => {
            toast.success("Payment successful!");
            navigate("/order");
          })
          .catch((error) => {
            toast.error(error.message || "Payment verification failed");
          });
      },
      prefill: {
        name: formik.values.firstName,
        email: formik.values.emailAddress,
        contact: formik.values.phoneNumber,
      },
      theme: {
        color: "#F05252",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-0 pt-20">
        <nav className="sm:block text-sm dark:text-white text-black mb-6 sm:mb-8">
          <ol className="flex flex-wrap gap-2">
            {["Account", "My Account", "Product", "View Cart", "Checkout"].map(
              (item, index, array) => (
                <li key={item} className="flex items-center">
                  <span
                    className={
                      index === array.length - 1 ? "font-semibold" : ""
                    }
                  >
                    {item}
                  </span>
                  {index < array.length - 1 && <span className="ml-2">/</span>}
                </li>
              )
            )}
          </ol>
        </nav>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:w-2/3">
            <BillingForm formik={formik} />
          </div>
          <div className="w-full lg:w-1/3">
            <OrderSummary
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              onPlaceOrder={formik.handleSubmit}
              loading={orderLoading || paymentLoading}
              totalAmount={totalAmount}
              currency={currency}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { createOrder } from "../redux/slice/orderSlice";
// import { createRazorpayOrder, getRazorpayKey, verifyPayment } from "../redux/slice/paymentSlice";
// import BillingForm from "../components/Billing/BillingForm";
// import OrderSummary from "../components/Billing/OrderSummary";
// const Billing = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { items, totalAmount } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth);
//   const {
//     razorpayKey,
//     razorpayOrder,
//     loading: paymentLoading,
//   } = useSelector((state) => state.payment);
//   const { loading: orderLoading } = useSelector((state) => state.order);
 
//   const currency = items.length && items.length > 0 ? items[0].currency && items[0].currency : "";

//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     streetAddress: "",
//     apartment: "",
//     townCity: "",
//     phoneNumber: "",
//     emailAddress: "",
//   });

//   useEffect(() => {
//     dispatch(getRazorpayKey());
//   }, [dispatch]);

//   useEffect(() => {
//     if (razorpayOrder && razorpayKey && selectedPaymentMethod === "razorpay" && orderLoading === false) {
//       handleRazorpayPayment(razorpayOrder.receipt);
//     }
//   }, [razorpayOrder, razorpayKey, orderLoading]);

//   const handleRazorpayPayment = (orderId) => {
//     if (!razorpayKey || !razorpayOrder || !razorpayOrder.amount) {
//       toast.error("Payment initialization failed - missing payment details");
//       return;
//     }
    
//     const options = {
//       key: razorpayKey,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       name: "Your E-commerce Store",
//       description: "Purchase Payment",
//       order_id: razorpayOrder.id,
//       handler: function (response) {
//         const paymentData = {
//           razorpayOrderId: response.razorpay_order_id,
//           razorpayPaymentId: response.razorpay_payment_id,
//           razorpaySignature: response.razorpay_signature,
//           orderId: orderId,
//         };

//         dispatch(verifyPayment(paymentData))
//           .unwrap()
//           .then(() => {
//             toast.success("Payment successful!");
//             navigate("/order");
//           })
//           .catch((error) => {
//             toast.error(error.message || "Payment verification failed");
//           });
//       },
//       prefill: {
//         name: formData.firstName,
//         email: formData.emailAddress,
//         contact: formData.phoneNumber,
//       },
//       theme: {
//         color: "#F05252",
//       },
//     };

//     const razorpayInstance = new window.Razorpay(options);
//     razorpayInstance.open();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user?.id) {
//       toast.error("Please log in to place an order");
//       return;
//     }

//     if (items.length === 0) {
//       toast.error("Your cart is empty");
//       return;
//     }

//     try {
//       const orderData = {
//         userId: user.id,
//         items: items,
//         shippingAddress: {
//           firstName: formData.firstName,
//           streetAddress: formData.streetAddress,
//           apartment: formData.apartment,
//           townCity: formData.townCity,
//           phoneNumber: formData.phoneNumber,
//           emailAddress: formData.emailAddress,
//         },
//         totalAmount,
//         currency,
//         paymentMethod: selectedPaymentMethod,
//       };

//       const response = await dispatch(createOrder(orderData)).unwrap();
//       const orderId = response.order._id;

//       if (selectedPaymentMethod === "razorpay") {
//         await dispatch(
//           createRazorpayOrder({ amount: totalAmount, orderId })
//         ).unwrap();
//       } else {
//         toast.success("Order placed successfully!");
//         navigate("/order");
//       }
//     } catch (error) {
//       toast.error(error.message || "Failed to place order");
//     }
//   };

//   return (
//     <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-0 pt-20">
//         <nav className="sm:block text-sm dark:text-white text-black mb-6 sm:mb-8">
//           <ol className="flex flex-wrap gap-2">
//             {["Account", "My Account", "Product", "View Cart", "Checkout"].map(
//               (item, index, array) => (
//                 <li key={item} className="flex items-center">
//                   <span
//                     className={
//                       index === array.length - 1 ? "font-semibold" : ""
//                     }
//                   >
//                     {item}
//                   </span>
//                   {index < array.length - 1 && <span className="ml-2">/</span>}
//                 </li>
//               )
//             )}
//           </ol>
//         </nav>
//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//           <div className="w-full lg:w-2/3">
//             <BillingForm
//               formData={formData}
//               setFormData={setFormData}
//               onSubmit={handleSubmit}
//             />
//           </div>
//           <div className="w-full lg:w-1/3">
//             <OrderSummary 
//               selectedPaymentMethod={selectedPaymentMethod}
//               setSelectedPaymentMethod={setSelectedPaymentMethod}
//               onPlaceOrder={handleSubmit}
//               loading={orderLoading || paymentLoading}
//               totalAmount={totalAmount}
//               currency={currency}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Billing;