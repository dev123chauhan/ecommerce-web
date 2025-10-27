import { CheckCircle, AlertCircle } from "lucide-react";
import { Loader } from "../../common/Loader";
import Button from "../../common/Button";
export default function ContactForm({ formik, loading }) {
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
    <div className="w-full max-w-3xl mx-auto p-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Your Name <span className="text-[#db4444]">*</span>
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="John Doe"
                className={`w-full rounded-lg border px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444] transition duration-200 ${
                  formik.values.name
                    ? isFieldValid("name")
                      ? "border-green-500 bg-green-50"
                      : "border-[#db4444] bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {formik.values.name && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isFieldValid("name") ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-[#db4444] h-5 w-5" />
                  )}
                </div>
              )}
            </div>
            {isFieldInvalid("name") && (
              <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Your Email <span className="text-[#db4444]">*</span>
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="john@example.com"
                className={`w-full rounded-lg border px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444] transition duration-200 ${
                  formik.values.email
                    ? isFieldValid("email")
                      ? "border-green-500 bg-green-50"
                      : "border-[#db4444] bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {formik.values.email && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isFieldValid("email") ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-[#db4444] h-5 w-5" />
                  )}
                </div>
              )}
            </div>
            {isFieldInvalid("email") && (
              <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {formik.errors.email}
              </div>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Your Message <span className="text-[#db4444]">*</span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              rows={4}
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write your message here..."
              className={`w-full rounded-lg border px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444] transition duration-200 ${
                formik.values.message
                  ? isFieldValid("message")
                    ? "border-green-500 bg-green-50"
                    : "border-[#db4444] bg-red-50"
                  : "border-gray-300"
              }`}
            ></textarea>
            {formik.values.message && (
              <div className="absolute right-3 top-4 transform">
                {isFieldValid("message") ? (
                  <CheckCircle className="text-green-500 h-5 w-5" />
                ) : (
                  <AlertCircle className="text-[#db4444] h-5 w-5" />
                )}
              </div>
            )}
          </div>
          {isFieldInvalid("message") && (
            <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {formik.errors.message}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full inline-flex items-center justify-center primaryColor text-white"
          disabled={loading}
        >
          {loading ? <Loader /> : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
