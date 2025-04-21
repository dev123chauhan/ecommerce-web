// import monitor from "../../assets/monitor.png"
// import gamepad from "../../assets/gamepad.png"
// import visa from "../../assets/visa.png"
// import mastercard from "../../assets/mastercard.png"
// import rupaycard from "../../assets/rupaycard.png"
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from "react"
// import { useSelector } from "react-redux"
import OrderSummary from "../OrderSummary/OrderSummary";
// import React from 'react';

const Billing = () => {
  // const { items, totalAmount } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    streetAddress: '',
    townCity: '',
    phoneNumber: '',
    emailAddress: '',
  });

  const [validity, setValidity] = useState({
    firstName: false,
    streetAddress: false,
    townCity: false,
    phoneNumber: false,
    emailAddress: false,
  });

  // Validation functions
  const validateFirstName = (name) => {
    if (!name) return { isValid: false, message: 'First Name is required' };
    if (name.length < 2) return { isValid: false, message: 'First Name must be at least 2 characters long' };
    return { isValid: true, message: '' };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { isValid: false, message: 'Email is required' };
    if (!emailRegex.test(email)) return { isValid: false, message: 'Please enter a valid email address' };
    return { isValid: true, message: '' };
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phone) return { isValid: false, message: 'Phone Number is required' };
    if (!phoneRegex.test(phone)) return { isValid: false, message: 'Please enter a valid phone number' };
    return { isValid: true, message: '' };
  };

  const validateStreetAddress = (address) => {
    if (!address) return { isValid: false, message: 'Street Address is required' };
    if (address.length < 5) return { isValid: false, message: 'Street Address must be at least 5 characters long' };
    return { isValid: true, message: '' };
  };

  const validateTownCity = (town) => {
    if (!town) return { isValid: false, message: 'Town/City is required' };
    if (town.length < 2) return { isValid: false, message: 'Town/City must be at least 2 characters long' };
    return { isValid: true, message: '' };
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    // Validation logic
    let validationResult;
    switch (id) {
      case 'firstName':
        validationResult = validateFirstName(value);
        break;
      case 'emailAddress':
        validationResult = validateEmail(value);
        break;
      case 'phoneNumber':
        validationResult = validatePhoneNumber(value);
        break;
      case 'streetAddress':
        validationResult = validateStreetAddress(value);
        break;
      case 'townCity':
        validationResult = validateTownCity(value);
        break;
      default:
        validationResult = { isValid: true, message: '' };
    }

    // Update errors and validity
    setErrors(prev => ({
      ...prev,
      [id]: validationResult.message
    }));

    setValidity(prev => ({
      ...prev,
      [id]: validationResult.isValid
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const validationResults = {
      firstName: validateFirstName(formData.firstName),
      streetAddress: validateStreetAddress(formData.streetAddress),
      townCity: validateTownCity(formData.townCity),
      phoneNumber: validatePhoneNumber(formData.phoneNumber),
      emailAddress: validateEmail(formData.emailAddress)
    };

    // Update errors and validity
    const newErrors = {};
    const newValidity = {};

    Object.keys(validationResults).forEach(key => {
      newErrors[key] = validationResults[key].message;
      newValidity[key] = validationResults[key].isValid;
    });

    setErrors(newErrors);
    setValidity(newValidity);

    // Check if form is valid
    const isFormValid = Object.values(newValidity).every(val => val === true);

    if (isFormValid) {
      // Submit form data
      console.log('Form submitted:', formData);
      // Here you would typically send the data to a backend service
      alert('Form submitted successfully!');
    } else {
      alert('Please correct the errors in the form');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
        {/* Breadcrumb - Hide on smallest screens */}
        <nav className="hidden sm:block text-sm text-gray-500 mb-6 sm:mb-8">
          <ol className="flex flex-wrap gap-2">
            {['Account', 'My Account', 'Product', 'View Cart', 'Checkout'].map((item, index, array) => (
              <li key={item} className="flex items-center">
                <span className={index === array.length - 1 ? 'font-semibold' : ''}>
                  {item}
                </span>
                {index < array.length - 1 && <span className="ml-2">/</span>}
              </li>
            ))}
          </ol>
        </nav>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Billing Details Form */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 mt-10">Billing Details</h2>
          
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full p-2.5 bg-gray-100 rounded-lg border ${
                formData.firstName 
                  ? (validity.firstName 
                      ? "border-green-500 bg-green-50" 
                      : "border-red-500 bg-red-50")
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
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name 
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2.5 bg-gray-100 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
          Street Address<span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            className={`w-full p-2.5 bg-gray-100 rounded-lg border ${
              formData.streetAddress 
                ? (validity.streetAddress 
                    ? "border-green-500 bg-green-50" 
                    : "border-red-500 bg-red-50")
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
        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
          Apartment, floor, etc. (optional)
        </label>
        <input
          type="text"
          id="apartment"
          value={formData.apartment}
          onChange={handleChange}
          className="w-full p-2.5 bg-gray-100 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="townCity" className="block text-sm font-medium text-gray-700 mb-1">
            Town/City<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="townCity"
              value={formData.townCity}
              onChange={handleChange}
              className={`w-full p-2.5 bg-gray-100 rounded-lg border ${
                formData.townCity 
                  ? (validity.townCity 
                      ? "border-green-500 bg-green-50" 
                      : "border-red-500 bg-red-50")
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
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full p-2.5 bg-gray-100 rounded-lg border ${
                formData.phoneNumber 
                  ? (validity.phoneNumber 
                      ? "border-green-500 bg-green-50" 
                      : "border-red-500 bg-red-50")
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
        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address<span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            id="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            className={`w-full p-2.5 bg-gray-100 rounded-lg border ${
              formData.emailAddress 
                ? (validity.emailAddress 
                    ? "border-green-500 bg-green-50" 
                    : "border-red-500 bg-red-50")
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

      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveInfo"
          className="w-4 h-4 rounded accent-black"
        />
        <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
          Save this information for faster check-out next time
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-black transition duration-300"
      >
        Save Information
      </button>
    </form>
          </div>

          {/* Order Summary */}
        <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Billing;