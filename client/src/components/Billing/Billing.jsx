import { CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../OrderSummary/OrderSummary";
import { toast } from "sonner";
import { createOrder } from "../../slice/OrderSlice";
import {
  createRazorpayOrder,
  getRazorpayKey,
  verifyPayment,
} from "../../slice/PaymentSlice";

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

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("razorpay");
  const [formData, setFormData] = useState({
    firstName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    streetAddress: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [validity, setValidity] = useState({
    firstName: false,
    streetAddress: false,
    townCity: false,
    phoneNumber: false,
    emailAddress: false,
  });

  useEffect(() => {
    // Get Razorpay key when component mounts
    dispatch(getRazorpayKey());
  }, [dispatch]);

  // Set up effect to handle Razorpay payment after razorpayOrder is updated
  useEffect(() => {
    // If we have both a razorpayOrder and we're in the process of making a payment
    if (razorpayOrder && razorpayKey && selectedPaymentMethod === "razorpay" && orderLoading === false) {
      handleRazorpayPayment(razorpayOrder.receipt);
    }
  }, [razorpayOrder, razorpayKey, orderLoading,]);

  // Validation functions
  const validateFirstName = (name) => {
    if (!name) return { isValid: false, message: "First Name is required" };
    if (name.length < 2)
      return {
        isValid: false,
        message: "First Name must be at least 2 characters long",
      };
    return { isValid: true, message: "" };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { isValid: false, message: "Email is required" };
    if (!emailRegex.test(email))
      return { isValid: false, message: "Please enter a valid email address" };
    return { isValid: true, message: "" };
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phone) return { isValid: false, message: "Phone Number is required" };
    if (!phoneRegex.test(phone))
      return { isValid: false, message: "Please enter a valid phone number" };
    return { isValid: true, message: "" };
  };

  const validateStreetAddress = (address) => {
    if (!address)
      return { isValid: false, message: "Street Address is required" };
    if (address.length < 5)
      return {
        isValid: false,
        message: "Street Address must be at least 5 characters long",
      };
    return { isValid: true, message: "" };
  };

  const validateTownCity = (town) => {
    if (!town) return { isValid: false, message: "Town/City is required" };
    if (town.length < 2)
      return {
        isValid: false,
        message: "Town/City must be at least 2 characters long",
      };
    return { isValid: true, message: "" };
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Validation logic
    let validationResult;
    switch (id) {
      case "firstName":
        validationResult = validateFirstName(value);
        break;
      case "emailAddress":
        validationResult = validateEmail(value);
        break;
      case "phoneNumber":
        validationResult = validatePhoneNumber(value);
        break;
      case "streetAddress":
        validationResult = validateStreetAddress(value);
        break;
      case "townCity":
        validationResult = validateTownCity(value);
        break;
      default:
        validationResult = { isValid: true, message: "" };
    }

    // Update errors and validity
    setErrors((prev) => ({
      ...prev,
      [id]: validationResult.message,
    }));

    setValidity((prev) => ({
      ...prev,
      [id]: validationResult.isValid,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  // Handle Razorpay payment
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
        name: formData.firstName,
        email: formData.emailAddress,
        contact: formData.phoneNumber,
      },
      theme: {
        color: "#F05252",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const validationResults = {
      firstName: validateFirstName(formData.firstName),
      streetAddress: validateStreetAddress(formData.streetAddress),
      townCity: validateTownCity(formData.townCity),
      phoneNumber: validatePhoneNumber(formData.phoneNumber),
      emailAddress: validateEmail(formData.emailAddress),
    };

    // Update errors and validity
    const newErrors = {};
    const newValidity = {};

    Object.keys(validationResults).forEach((key) => {
      newErrors[key] = validationResults[key].message;
      newValidity[key] = validationResults[key].isValid;
    });

    setErrors(newErrors);
    setValidity(newValidity);

    // Check if form is valid
    const isFormValid = Object.values(newValidity).every((val) => val === true);

    if (!isFormValid) {
      toast.error("Please correct the errors in the form");
      return;
    }

    if (!user?.id) {
      toast.error("Please log in to place an order");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      // Create the order data
      const orderData = {
        userId: user.id,
        items: items,
        shippingAddress: {
          firstName: formData.firstName,
          streetAddress: formData.streetAddress,
          apartment: formData.apartment,
          townCity: formData.townCity,
          phoneNumber: formData.phoneNumber,
          emailAddress: formData.emailAddress,
        },
        totalAmount,
        currency,
        paymentMethod: selectedPaymentMethod,
      };

      // Create order
      const response = await dispatch(createOrder(orderData)).unwrap();
      const orderId = response.order._id;

      if (selectedPaymentMethod === "razorpay") {
        // Create Razorpay order - but now the effect will handle opening the payment
        await dispatch(
          createRazorpayOrder({ amount: totalAmount, orderId })
        ).unwrap();
        // handleRazorpayPayment is now called by the useEffect when razorpayOrder is updated
      } else {
        // For cash on delivery, bank, or UPI (without Razorpay)
        toast.success("Order placed successfully!");
        navigate("/order");
      }
    } catch (error) {
      toast.error(error.message || "Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
        {/* Breadcrumb - Hide on smallest screens */}
        <nav className="hidden sm:block text-sm text-gray-500 mb-6 sm:mb-8">
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

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Billing Details Form */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 mt-10">
              Billing Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-1">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <div className="relative ">
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
                        formData.firstName
                          ? validity.firstName
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-gray-200"
                      } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
                      required
                    />
                    {formData.firstName && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validity.firstName ? (
                          <CheckCircle className="text-green-500 h-5 w-5" />
                        ) : (
                          <AlertCircle className="text-red-500 h-5 w-5" />
                        )}
                      </div>
                    )}
                  </div>
                  {errors.firstName && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.firstName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="streetAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Street Address<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      formData.streetAddress
                        ? validity.streetAddress
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-gray-200"
                    } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
                    required
                  />
                  {formData.streetAddress && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {validity.streetAddress ? (
                        <CheckCircle className="text-green-500 h-5 w-5" />
                      ) : (
                        <AlertCircle className="text-red-500 h-5 w-5" />
                      )}
                    </div>
                  )}
                </div>
                {errors.streetAddress && (
                  <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.streetAddress}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="apartment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-gray-100 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="townCity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Town/City<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="townCity"
                      value={formData.townCity}
                      onChange={handleChange}
                      className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
                        formData.townCity
                          ? validity.townCity
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-gray-200"
                      } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
                      required
                    />
                    {formData.townCity && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validity.townCity ? (
                          <CheckCircle className="text-green-500 h-5 w-5" />
                        ) : (
                          <AlertCircle className="text-red-500 h-5 w-5" />
                        )}
                      </div>
                    )}
                  </div>
                  {errors.townCity && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.townCity}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
                        formData.phoneNumber
                          ? validity.phoneNumber
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-gray-200"
                      } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
                      required
                    />
                    {formData.phoneNumber && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validity.phoneNumber ? (
                          <CheckCircle className="text-green-500 h-5 w-5" />
                        ) : (
                          <AlertCircle className="text-red-500 h-5 w-5" />
                        )}
                      </div>
                    )}
                  </div>
                  {errors.phoneNumber && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="emailAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      formData.emailAddress
                        ? validity.emailAddress
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-gray-200"
                    } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
                    required
                  />
                  {formData.emailAddress && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {validity.emailAddress ? (
                        <CheckCircle className="text-green-500 h-5 w-5" />
                      ) : (
                        <AlertCircle className="text-red-500 h-5 w-5" />
                      )}
                    </div>
                  )}
                </div>
                {errors.emailAddress && (
                  <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.emailAddress}
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-lg">Payment Method</h3>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400">
                  <input
                    type="radio"
                    id="razorpay"
                    name="paymentMethod"
                    value="razorpay"
                    checked={selectedPaymentMethod === "razorpay"}
                    onChange={handlePaymentMethodChange}
                    className="w-4 h-4 rounded accent-black  cursor-pointer "
                  />
                  <label htmlFor="razorpay" className="font-medium">
                    Pay with Razorpay
                  </label>
                  <img
                    src="https://razorpay.com/assets/razorpay-glyph.svg"
                    alt="Razorpay"
                    className="h-8 ml-auto"
                  />
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400">
                  <input
                    type="radio"
                    id="cash_on_delivery"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={selectedPaymentMethod === "cash_on_delivery"}
                    onChange={handlePaymentMethodChange}
                    className="w-4 h-4 rounded accent-black cursor-pointer"
                  />
                  <label htmlFor="cash_on_delivery" className="font-medium">
                    Cash on delivery
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveInfo"
                  className="w-4 h-4 rounded accent-black"
                />
                <label
                  htmlFor="saveInfo"
                  className="ml-2 text-sm text-gray-700"
                >
                  Save this information for next time
                </label>
              </div>

              <button
                type="submit"
                disabled={orderLoading || paymentLoading}
                className={`w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold text-sm ${
                  orderLoading || paymentLoading
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {orderLoading || paymentLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Place Order - ${currency}${totalAmount}`
                )}
              </button>
            </form>
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Billing;
// import { CheckCircle, AlertCircle } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import OrderSummary from "../OrderSummary/OrderSummary";
// import { toast } from "sonner";
// import { createOrder } from "../../slice/OrderSlice";
// import {
//   createRazorpayOrder,
//   getRazorpayKey,
//   verifyPayment,
// } from "../../slice/PaymentSlice";

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
//   const {loading: orderLoading } = useSelector(
//     (state) => state.order
//   );
 
//   const currency = items.length && items.length > 0 ? items[0].currency && items[0].currency : "";

//   const [selectedPaymentMethod, setSelectedPaymentMethod] =
//     useState("razorpay");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     streetAddress: "",
//     apartment: "",
//     townCity: "",
//     phoneNumber: "",
//     emailAddress: "",
//   });

//   const [errors, setErrors] = useState({
//     firstName: "",
//     streetAddress: "",
//     townCity: "",
//     phoneNumber: "",
//     emailAddress: "",
//   });

//   const [validity, setValidity] = useState({
//     firstName: false,
//     streetAddress: false,
//     townCity: false,
//     phoneNumber: false,
//     emailAddress: false,
//   });

//   useEffect(() => {
//     // Get Razorpay key when component mounts
//     dispatch(getRazorpayKey());
//   }, [dispatch]);

//   // Validation functions
//   const validateFirstName = (name) => {
//     if (!name) return { isValid: false, message: "First Name is required" };
//     if (name.length < 2)
//       return {
//         isValid: false,
//         message: "First Name must be at least 2 characters long",
//       };
//     return { isValid: true, message: "" };
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) return { isValid: false, message: "Email is required" };
//     if (!emailRegex.test(email))
//       return { isValid: false, message: "Please enter a valid email address" };
//     return { isValid: true, message: "" };
//   };

//   const validatePhoneNumber = (phone) => {
//     const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
//     if (!phone) return { isValid: false, message: "Phone Number is required" };
//     if (!phoneRegex.test(phone))
//       return { isValid: false, message: "Please enter a valid phone number" };
//     return { isValid: true, message: "" };
//   };

//   const validateStreetAddress = (address) => {
//     if (!address)
//       return { isValid: false, message: "Street Address is required" };
//     if (address.length < 5)
//       return {
//         isValid: false,
//         message: "Street Address must be at least 5 characters long",
//       };
//     return { isValid: true, message: "" };
//   };

//   const validateTownCity = (town) => {
//     if (!town) return { isValid: false, message: "Town/City is required" };
//     if (town.length < 2)
//       return {
//         isValid: false,
//         message: "Town/City must be at least 2 characters long",
//       };
//     return { isValid: true, message: "" };
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));

//     // Validation logic
//     let validationResult;
//     switch (id) {
//       case "firstName":
//         validationResult = validateFirstName(value);
//         break;
//       case "emailAddress":
//         validationResult = validateEmail(value);
//         break;
//       case "phoneNumber":
//         validationResult = validatePhoneNumber(value);
//         break;
//       case "streetAddress":
//         validationResult = validateStreetAddress(value);
//         break;
//       case "townCity":
//         validationResult = validateTownCity(value);
//         break;
//       default:
//         validationResult = { isValid: true, message: "" };
//     }

//     // Update errors and validity
//     setErrors((prev) => ({
//       ...prev,
//       [id]: validationResult.message,
//     }));

//     setValidity((prev) => ({
//       ...prev,
//       [id]: validationResult.isValid,
//     }));
//   };

//   const handlePaymentMethodChange = (e) => {
//     setSelectedPaymentMethod(e.target.value);
//   };

//   // Handle Razorpay payment
//   const handleRazorpayPayment = (orderId) => {
//     // if (!razorpayKey || !razorpayOrder) {
//     //   toast.error("Payment initialization failed");
//     //   return;
//     // }
//     // if (!razorpayKey || !razorpayOrder || !razorpayOrder.amount) {
//     //   // toast.error("Payment initialization failed - missing payment details");
//     //   return;
//     // }
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

//     // Validate all fields
//     const validationResults = {
//       firstName: validateFirstName(formData.firstName),
//       streetAddress: validateStreetAddress(formData.streetAddress),
//       townCity: validateTownCity(formData.townCity),
//       phoneNumber: validatePhoneNumber(formData.phoneNumber),
//       emailAddress: validateEmail(formData.emailAddress),
//     };

//     // Update errors and validity
//     const newErrors = {};
//     const newValidity = {};

//     Object.keys(validationResults).forEach((key) => {
//       newErrors[key] = validationResults[key].message;
//       newValidity[key] = validationResults[key].isValid;
//     });

//     setErrors(newErrors);
//     setValidity(newValidity);

//     // Check if form is valid
//     const isFormValid = Object.values(newValidity).every((val) => val === true);

//     if (!isFormValid) {
//       toast.error("Please correct the errors in the form");
//       return;
//     }

//     if (!user?.id) {
//       toast.error("Please log in to place an order");
//       return;
//     }

//     if (items.length === 0) {
//       toast.error("Your cart is empty");
//       return;
//     }

//     try {
//       // Create the order data
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

//       // Create order
//       const response = await dispatch(createOrder(orderData)).unwrap();
//       const orderId = response.order._id;

//       if (selectedPaymentMethod === "razorpay") {
//         // Create Razorpay order
//     //     await dispatch(
//     //       createRazorpayOrder({ amount: totalAmount, orderId })
//     //     ).unwrap();
//     //     // Initiate Razorpay payment
//     //     handleRazorpayPayment(orderId);
//     //   } else {
//     //     // For cash on delivery, bank, or UPI (without Razorpay)
//     //     toast.success("Order placed successfully!");
//     //     navigate("/order");
//     //   }
//     // } catch (error) {
//     //   toast.error(error.message || "Failed to place order");
//     // }
//     const razorpayResponse = await dispatch(
//       createRazorpayOrder({ amount: totalAmount, orderId })
//     ).unwrap();
    
//     // Make sure we have the necessary data before proceeding
//     if (!razorpayKey || !razorpayResponse) {
//       toast.error("Payment initialization failed");
//       return;
//     }
    
//     // Now initiate Razorpay payment
//     handleRazorpayPayment(orderId);
//   } else {
//     // For cash on delivery, bank, or UPI (without Razorpay)
//     toast.success("Order placed successfully!");
//     navigate("/order");
//   }
// } catch (error) {
//   toast.error(error.message || "Failed to place order");
// }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">
//       <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
//         {/* Breadcrumb - Hide on smallest screens */}
//         <nav className="hidden sm:block text-sm text-gray-500 mb-6 sm:mb-8">
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

//         {/* Main content */}
//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//           {/* Billing Details Form */}
//           <div className="w-full lg:w-2/3">
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 mt-10">
//               Billing Details
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
//               <div className="grid grid-cols-1 sm:grid-cols-1">
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     First Name<span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative ">
//                     <input
//                       type="text"
//                       id="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                         formData.firstName
//                           ? validity.firstName
//                             ? "border-green-500 bg-green-50"
//                             : "border-red-500 bg-red-50"
//                           : "border-gray-200"
//                       } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
//                       required
//                     />
//                     {formData.firstName && (
//                       <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                         {validity.firstName ? (
//                           <CheckCircle className="text-green-500 h-5 w-5" />
//                         ) : (
//                           <AlertCircle className="text-red-500 h-5 w-5" />
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {errors.firstName && (
//                     <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                       <AlertCircle className="h-4 w-4" />
//                       {errors.firstName}
//                     </div>
//                   )}
//                 </div>
//                 {/* <div>
//                   <label
//                     htmlFor="companyName"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Company Name
//                   </label>
//                   <input
//                     type="text"
//                     id="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     className="w-full p-2.5 bg-gray-100 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
//                   />
//                 </div> */}
//               </div>

//               <div>
//                 <label
//                   htmlFor="streetAddress"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Street Address<span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     id="streetAddress"
//                     value={formData.streetAddress}
//                     onChange={handleChange}
//                     className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                       formData.streetAddress
//                         ? validity.streetAddress
//                           ? "border-green-500 bg-green-50"
//                           : "border-red-500 bg-red-50"
//                         : "border-gray-200"
//                     } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
//                     required
//                   />
//                   {formData.streetAddress && (
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {validity.streetAddress ? (
//                         <CheckCircle className="text-green-500 h-5 w-5" />
//                       ) : (
//                         <AlertCircle className="text-red-500 h-5 w-5" />
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 {errors.streetAddress && (
//                   <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                     <AlertCircle className="h-4 w-4" />
//                     {errors.streetAddress}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="apartment"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Apartment, floor, etc. (optional)
//                 </label>
//                 <input
//                   type="text"
//                   id="apartment"
//                   value={formData.apartment}
//                   onChange={handleChange}
//                   className="w-full p-2.5 bg-gray-100 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label
//                     htmlFor="townCity"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Town/City<span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       id="townCity"
//                       value={formData.townCity}
//                       onChange={handleChange}
//                       className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                         formData.townCity
//                           ? validity.townCity
//                             ? "border-green-500 bg-green-50"
//                             : "border-red-500 bg-red-50"
//                           : "border-gray-200"
//                       } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
//                       required
//                     />
//                     {formData.townCity && (
//                       <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                         {validity.townCity ? (
//                           <CheckCircle className="text-green-500 h-5 w-5" />
//                         ) : (
//                           <AlertCircle className="text-red-500 h-5 w-5" />
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {errors.townCity && (
//                     <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                       <AlertCircle className="h-4 w-4" />
//                       {errors.townCity}
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="phoneNumber"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Phone Number<span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="tel"
//                       id="phoneNumber"
//                       value={formData.phoneNumber}
//                       onChange={handleChange}
//                       className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                         formData.phoneNumber
//                           ? validity.phoneNumber
//                             ? "border-green-500 bg-green-50"
//                             : "border-red-500 bg-red-50"
//                           : "border-gray-200"
//                       } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
//                       required
//                     />
//                     {formData.phoneNumber && (
//                       <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                         {validity.phoneNumber ? (
//                           <CheckCircle className="text-green-500 h-5 w-5" />
//                         ) : (
//                           <AlertCircle className="text-red-500 h-5 w-5" />
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {errors.phoneNumber && (
//                     <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                       <AlertCircle className="h-4 w-4" />
//                       {errors.phoneNumber}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="emailAddress"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Email Address<span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     id="emailAddress"
//                     value={formData.emailAddress}
//                     onChange={handleChange}
//                     className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                       formData.emailAddress
//                         ? validity.emailAddress
//                           ? "border-green-500 bg-green-50"
//                           : "border-red-500 bg-red-50"
//                         : "border-gray-200"
//                     } focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors`}
//                     required
//                   />
//                   {formData.emailAddress && (
//                     <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                       {validity.emailAddress ? (
//                         <CheckCircle className="text-green-500 h-5 w-5" />
//                       ) : (
//                         <AlertCircle className="text-red-500 h-5 w-5" />
//                       )}
//                     </div>
//                   )}
//                 </div>
//                 {errors.emailAddress && (
//                   <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                     <AlertCircle className="h-4 w-4" />
//                     {errors.emailAddress}
//                   </div>
//                 )}
//               </div>

//               {/* Payment Methods */}
//               <div className="mt-6 space-y-4">
//                 <h3 className="font-semibold text-lg">Payment Method</h3>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400">
//                   <input
//                     type="radio"
//                     id="razorpay"
//                     name="paymentMethod"
//                     value="razorpay"
//                     checked={selectedPaymentMethod === "razorpay"}
//                     onChange={handlePaymentMethodChange}
//                     className="w-4 h-4 rounded accent-black  cursor-pointer "
//                   />
//                   <label htmlFor="razorpay" className="font-medium">
//                     Pay with Razorpay
//                   </label>
//                   <img
//                     src="https://razorpay.com/assets/razorpay-glyph.svg"
//                     alt="Razorpay"
//                     className="h-8 ml-auto"
//                   />
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400">
//                   <input
//                     type="radio"
//                     id="cash_on_delivery"
//                     name="paymentMethod"
//                     value="cash_on_delivery"
//                     checked={selectedPaymentMethod === "cash_on_delivery"}
//                     onChange={handlePaymentMethodChange}
//                     className="w-4 h-4 rounded accent-black cursor-pointer"
//                   />
//                   <label htmlFor="cash_on_delivery" className="font-medium">
//                     Cash on delivery
//                   </label>
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="saveInfo"
//                   className="w-4 h-4 rounded accent-black"
//                 />
//                 <label
//                   htmlFor="saveInfo"
//                   className="ml-2 text-sm text-gray-700"
//                 >
//                   Save this information for next time
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 disabled={orderLoading || paymentLoading}
//                 className={`w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold text-sm ${
//                   orderLoading || paymentLoading
//                     ? "opacity-70 cursor-not-allowed"
//                     : ""
//                 }`}
//               >
//                 {orderLoading || paymentLoading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Processing...
//                   </span>
//                 ) : (
//                   `Place Order - ${currency}${totalAmount}`
//                 )}
//               </button>
//             </form>
//           </div>
//           <OrderSummary />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Billing;



