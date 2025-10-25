import BillingFormHeader from "./BillingFormHeader";
import BillingFormFields from "./BillingFormFields";
const BillingForm = ({ formik }) => {
  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    return value;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    let processedValue = value;

    if (id === "phoneNumber") {
      processedValue = handlePhoneInput(e);
    }

    formik.setFieldValue(id, processedValue);
    formik.setFieldTouched(id, true, false);
  };

  return (
    <>
      <BillingFormHeader />
      <BillingFormFields
        formik={formik}
        onChange={handleChange}
        onSubmit={formik.handleSubmit}
      />
    </>
  );
};

export default BillingForm;




































// import { CheckCircle, AlertCircle } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";
// import { validateEmail, validateFirstName, validatePhoneNumber, validateStreetAddress, validateTownCity } from "../../Validation/validation";
// const BillingForm = ({ formData, setFormData, onSubmit }) => {
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

//   const handlePhoneInput = (e) => {
//     let value = e.target.value.replace(/\D/g, '');
    
//     if (value.length > 10) {
//       value = value.slice(0, 10);
//     }
    
//     return value;
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     let processedValue = value;

//     if (id === 'phoneNumber') {
//       processedValue = handlePhoneInput(e);
//     }

//     setFormData((prev) => ({ ...prev, [id]: processedValue }));

//     let validationResult;
//     switch (id) {
//       case "firstName":
//         validationResult = validateFirstName(processedValue);
//         break;
//       case "emailAddress":
//         validationResult = validateEmail(processedValue);
//         break;
//       case "phoneNumber":
//         validationResult = validatePhoneNumber(processedValue);
//         break;
//       case "streetAddress":
//         validationResult = validateStreetAddress(processedValue);
//         break;
//       case "townCity":
//         validationResult = validateTownCity(processedValue);
//         break;
//       default:
//         validationResult = { isValid: true, message: "" };
//     }

//     setErrors((prev) => ({
//       ...prev,
//       [id]: validationResult.message,
//     }));

//     setValidity((prev) => ({
//       ...prev,
//       [id]: validationResult.isValid,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();


//     const validationResults = {
//       firstName: validateFirstName(formData.firstName),
//       streetAddress: validateStreetAddress(formData.streetAddress),
//       townCity: validateTownCity(formData.townCity),
//       phoneNumber: validatePhoneNumber(formData.phoneNumber),
//       emailAddress: validateEmail(formData.emailAddress),
//     };

//     const newErrors = {};
//     const newValidity = {};

//     Object.keys(validationResults).forEach((key) => {
//       newErrors[key] = validationResults[key].message;
//       newValidity[key] = validationResults[key].isValid;
//     });

//     setErrors(newErrors);
//     setValidity(newValidity);

//     const isFormValid = Object.values(newValidity).every((val) => val === true);

//     if (!isFormValid) {
//       toast.error("Please correct the errors in the form");
//       return;
//     }
//     onSubmit(e);
//   };

//   return (
//     <>
//       <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
//         Billing Details
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mb-5">
//         <div>
//           <label
//             htmlFor="firstName"
//             className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
//           >
//             First Name<span className="text-[#db4444]">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               id="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                 formData.firstName
//                   ? validity.firstName
//                     ? "border-green-500 bg-green-50 dark:bg-green-900/20"
//                     : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
//                   : "border-gray-200"
//               } focus:border-red-500 focus:ring-1 focus:ring-[#db4444] transition-colors`}
//               required
//             />
//             {formData.firstName && (
//               <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 {validity.firstName ? (
//                   <CheckCircle className="text-green-500 h-5 w-5" />
//                 ) : (
//                   <AlertCircle className="text-[#db4444] h-5 w-5" />
//                 )}
//               </div>
//             )}
//           </div>
//           {errors.firstName && (
//             <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
//               <AlertCircle className="h-4 w-4" />
//               {errors.firstName}
//             </div>
//           )}
//         </div>


//         <div>
//           <label
//             htmlFor="streetAddress"
//             className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
//           >
//             Street Address<span className="text-[#db4444]">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               id="streetAddress"
//               value={formData.streetAddress}
//               onChange={handleChange}
//               className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                 formData.streetAddress
//                   ? validity.streetAddress
//                     ? "border-green-500 bg-green-50 dark:bg-green-900/20"
//                     : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
//                   : "border-gray-200"
//               } focus:border-red-500 focus:ring-1 focus:ring-[#db4444] transition-colors`}
//               required
//             />
//             {formData.streetAddress && (
//               <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 {validity.streetAddress ? (
//                   <CheckCircle className="text-green-500 h-5 w-5" />
//                 ) : (
//                   <AlertCircle className="text-[#db4444] h-5 w-5" />
//                 )}
//               </div>
//             )}
//           </div>
//           {errors.streetAddress && (
//             <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
//               <AlertCircle className="h-4 w-4" />
//               {errors.streetAddress}
//             </div>
//           )}
//         </div>
//         <div>
//           <label
//             htmlFor="apartment"
//             className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
//           >
//             Apartment, floor, etc. (optional)
//           </label>
//           <input
//             type="text"
//             id="apartment"
//             value={formData.apartment}
//             onChange={handleChange}
//             className="w-full p-2.5 bg-gray-100 rounded-lg border border-gray-200 focus:border-[#db4444] focus:ring-1 focus:ring-[#db4444] transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
//           />
//         </div>


//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label
//               htmlFor="townCity"
//               className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
//             >
//               Town/City<span className="text-[#db4444]">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="townCity"
//                 value={formData.townCity}
//                 onChange={handleChange}
//                 className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                   formData.townCity
//                     ? validity.townCity
//                       ? "border-green-500 bg-green-50 dark:bg-green-900/20"
//                       : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
//                     : "border-gray-200"
//                 } focus:border-red-500 focus:ring-1 focus:ring-[#db4444] transition-colors`}
//                 required
//               />
//               {formData.townCity && (
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                   {validity.townCity ? (
//                     <CheckCircle className="text-green-500 h-5 w-5" />
//                   ) : (
//                     <AlertCircle className="text-[#db4444] h-5 w-5" />
//                   )}
//                 </div>
//               )}
//             </div>
//             {errors.townCity && (
//               <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
//                 <AlertCircle className="h-4 w-4" />
//                 {errors.townCity}
//               </div>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="phoneNumber"
//               className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
//             >
//               Phone Number<span className="text-[#db4444]">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type="tel"
//                 id="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 onKeyPress={(e) => {
//                   if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
//                     e.preventDefault();
//                   }
//                 }}
//                 maxLength={10}
//                 placeholder="Enter 10-digit phone number"
//                 className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                   formData.phoneNumber
//                     ? validity.phoneNumber
//                       ? "border-green-500 bg-green-50 dark:bg-green-900/20"
//                       : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
//                     : "border-gray-200"
//                 } focus:border-[#db4444] focus:ring-1 focus:ring-[#db4444] transition-colors`}
//                 required
//               />
//               {formData.phoneNumber && (
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                   {validity.phoneNumber ? (
//                     <CheckCircle className="text-green-500 h-5 w-5" />
//                   ) : (
//                     <AlertCircle className="text-[#db4444] h-5 w-5" />
//                   )}
//                 </div>
//               )}
//             </div>
//             {errors.phoneNumber && (
//               <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
//                 <AlertCircle className="h-4 w-4" />
//                 {errors.phoneNumber}
//               </div>
//             )}
//           </div>
//         </div>

//         <div>
//           <label
//             htmlFor="emailAddress"
//             className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
//           >
//             Email Address<span className="text-[#db4444]">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type="email"
//               id="emailAddress"
//               value={formData.emailAddress}
//               onChange={handleChange}
//               className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
//                 formData.emailAddress
//                   ? validity.emailAddress
//                     ? "border-green-500 bg-green-50 dark:bg-green-900/20"
//                     : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
//                   : "border-gray-200"
//               } focus:border-red-500 focus:ring-1 focus:ring-[#db4444] transition-colors`}
//               required
//             />
//             {formData.emailAddress && (
//               <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                 {validity.emailAddress ? (
//                   <CheckCircle className="text-green-500 h-5 w-5" />
//                 ) : (
//                   <AlertCircle className="text-[#db4444] h-5 w-5" />
//                 )}
//               </div>
//             )}
//           </div>
//           {errors.emailAddress && (
//             <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
//               <AlertCircle className="h-4 w-4" />
//               {errors.emailAddress}
//             </div>
//           )}
//         </div>
//       </form>
//     </>
//   );
// };

// export default BillingForm;