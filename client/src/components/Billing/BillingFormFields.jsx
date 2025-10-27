import { CheckCircle, AlertCircle } from "lucide-react";
export default function BillingFormFields({ formik, onChange, onSubmit }) {
  const isFieldValid = (fieldName) => {
    return (
      formik.touched[fieldName] &&
      !formik.errors[fieldName] &&
      formik.values[fieldName]
    );
  };

  const isFieldInvalid = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName];
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5 mb-5">
      {/* First Name */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
        >
          First Name<span className="text-[#db4444]">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="firstName"
            value={formik.values.firstName}
            onChange={onChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
              formik.values.firstName
                ? isFieldValid("firstName")
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                : "border-gray-200"
            } focus:border-red-500 focus:ring-1 focus:ring-[#db4444] transition-colors`}
            required
          />
          {formik.values.firstName && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isFieldValid("firstName") ? (
                <CheckCircle className="text-green-500 h-5 w-5" />
              ) : (
                <AlertCircle className="text-[#db4444] h-5 w-5" />
              )}
            </div>
          )}
        </div>
        {isFieldInvalid("firstName") && (
          <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {formik.errors.firstName}
          </div>
        )}
      </div>

      {/* Street Address */}
      <div>
        <label
          htmlFor="streetAddress"
          className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
        >
          Street Address<span className="text-[#db4444]">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="streetAddress"
            value={formik.values.streetAddress}
            onChange={onChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
              formik.values.streetAddress
                ? isFieldValid("streetAddress")
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                : "border-gray-200"
            } focus:border-red-500 focus:ring-1 focus:ring-[#db4444] transition-colors`}
            required
          />
          {formik.values.streetAddress && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isFieldValid("streetAddress") ? (
                <CheckCircle className="text-green-500 h-5 w-5" />
              ) : (
                <AlertCircle className="text-[#db4444] h-5 w-5" />
              )}
            </div>
          )}
        </div>
        {isFieldInvalid("streetAddress") && (
          <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {formik.errors.streetAddress}
          </div>
        )}
      </div>

      {/* Apartment (Optional) */}
      <div>
        <label
          htmlFor="apartment"
          className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
        >
          Apartment, floor, etc. (optional)
        </label>
        <input
          type="text"
          id="apartment"
          value={formik.values.apartment}
          onChange={onChange}
          onBlur={formik.handleBlur}
          className="w-full p-2.5 bg-gray-100 rounded-lg border border-gray-200 focus:border-[#db4444] focus:ring-1 focus:ring-[#db4444] transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      {/* Town/City and Phone Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Town/City */}
        <div>
          <label
            htmlFor="townCity"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Town/City<span className="text-[#db4444]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="townCity"
              value={formik.values.townCity}
              onChange={onChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
                formik.values.townCity
                  ? isFieldValid("townCity")
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                  : "border-gray-200"
              } focus:border-red-500 focus:ring-1 focus:ring-[#db4444] transition-colors`}
              required
            />
            {formik.values.townCity && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isFieldValid("townCity") ? (
                  <CheckCircle className="text-green-500 h-5 w-5" />
                ) : (
                  <AlertCircle className="text-[#db4444] h-5 w-5" />
                )}
              </div>
            )}
          </div>
          {isFieldInvalid("townCity") && (
            <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {formik.errors.townCity}
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Phone Number<span className="text-[#db4444]">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={onChange}
              onBlur={formik.handleBlur}
              onKeyPress={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete"
                ) {
                  e.preventDefault();
                }
              }}
              maxLength={10}
              placeholder="Enter 10-digit phone number"
              className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
                formik.values.phoneNumber
                  ? isFieldValid("phoneNumber")
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                  : "border-gray-200"
              } focus:border-[#db4444] focus:ring-1 focus:ring-[#db4444] transition-colors`}
              required
            />
            {formik.values.phoneNumber && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isFieldValid("phoneNumber") ? (
                  <CheckCircle className="text-green-500 h-5 w-5" />
                ) : (
                  <AlertCircle className="text-[#db4444] h-5 w-5" />
                )}
              </div>
            )}
          </div>
          {isFieldInvalid("phoneNumber") && (
            <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {formik.errors.phoneNumber}
            </div>
          )}
        </div>
      </div>

      {/* Email Address */}
      <div>
        <label
          htmlFor="emailAddress"
          className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
        >
          Email Address<span className="text-[#db4444]">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            id="emailAddress"
            value={formik.values.emailAddress}
            onChange={onChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2.5 bg-gray-100 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
              formik.values.emailAddress
                ? isFieldValid("emailAddress")
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                : "border-gray-200"
            } focus:border-red-500 focus:ring-1 focus:ring-[#db4444] transition-colors`}
            required
          />
          {formik.values.emailAddress && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isFieldValid("emailAddress") ? (
                <CheckCircle className="text-green-500 h-5 w-5" />
              ) : (
                <AlertCircle className="text-[#db4444] h-5 w-5" />
              )}
            </div>
          )}
        </div>
        {isFieldInvalid("emailAddress") && (
          <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {formik.errors.emailAddress}
          </div>
        )}
      </div>
    </form>
  );
}
