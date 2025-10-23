import PropTypes from "prop-types";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Loader } from "../../utils/Loader";

export default function ContactForm({
  formData,
  errors,
  validity,
  loading,
  onSubmit,
  onChange,
}) {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <form onSubmit={onSubmit} className="space-y-6">
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
                value={formData.name}
                onChange={onChange}
                placeholder="John Doe"
                className={`w-full rounded-lg border px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444] transition duration-200 ${
                  formData.name
                    ? validity.name
                      ? "border-green-500 bg-green-50"
                      : "border-[#db4444] bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {formData.name && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validity.name ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-[#db4444] h-5 w-5" />
                  )}
                </div>
              )}
            </div>
            {errors.name && (
              <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.name}
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
                value={formData.email}
                onChange={onChange}
                placeholder="john@example.com"
                className={`w-full rounded-lg border px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444] transition duration-200 ${
                  formData.email
                    ? validity.email
                      ? "border-green-500 bg-green-50"
                      : "border-[#db4444] bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {formData.email && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validity.email ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-[#db4444] h-5 w-5" />
                  )}
                </div>
              )}
            </div>
            {errors.email && (
              <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.email}
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
              value={formData.message}
              onChange={onChange}
              placeholder="Write your message here..."
              className={`w-full rounded-lg border px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444] transition duration-200 ${
                formData.message
                  ? validity.message
                    ? "border-green-500 bg-green-50"
                    : "border-[#db4444] bg-red-50"
                  : "border-gray-300"
              }`}
            ></textarea>
            {formData.message && (
              <div className="absolute right-3 top-4 transform">
                {validity.message ? (
                  <CheckCircle className="text-green-500 h-5 w-5" />
                ) : (
                  <AlertCircle className="text-[#db4444] h-5 w-5" />
                )}
              </div>
            )}
          </div>
          {errors.message && (
            <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center primaryColor px-6 py-3 rounded-full text-white font-medium transition duration-200"
          disabled={loading}
        >
          {loading ? <Loader /> : "Send Message"}
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  validity: PropTypes.shape({
    name: PropTypes.bool.isRequired,
    email: PropTypes.bool.isRequired,
    message: PropTypes.bool.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};