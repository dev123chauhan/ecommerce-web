import { Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "../utils/Loader";
import { validateEmail, validateMessage, validateName } from "../Validation/Validation";
const Contact = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "",});
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [validity, setValidity] = useState({ name: false, email: false, message: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let validationResult;
    switch (name) {
      case "name":
        validationResult = validateName(value);
        break;
      case "email":
        validationResult = validateEmail(value);
        break;
      case "message":
        validationResult = validateMessage(value);
        break;
      default:
        validationResult = { isValid: false, message: "" };
    }

    setErrors((prev) => ({ ...prev, [name]: validationResult.message }));
    setValidity((prev) => ({ ...prev, [name]: validationResult.isValid }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const messageValidation = validateMessage(formData.message);

    setErrors({
      name: nameValidation.message,
      email: emailValidation.message,
      message: messageValidation.message,
    });

    setValidity({
      name: nameValidation.isValid,
      email: emailValidation.isValid,
      message: messageValidation.isValid,
    });

    if (!nameValidation.isValid || !emailValidation.isValid || !messageValidation.isValid)
      return;

    setLoading(true);
    try {
      await axios.post(`${baseUrl}/contact`, formData);
      setFormData({ name: "", email: "", message: "" });
      setErrors({ name: "", email: "", message: "" });
      setValidity({ name: false, email: false, message: false });
      toast.success("Thanks for contacting us!");
    } catch (err) {
      console.error(err);
      toast.error("Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 container p-4 mt-10">
        <nav className="py-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="" className="font-bold">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Phone className="mr-2 text-[#db4444]" size={24} /> Call To Us
              </h2>
              <p className="mb-2">We are available 24/7, 7 days a week.</p>
              <p>Phone: <span className="font-bold">+8801611112222</span></p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Mail className="mr-2 text-[#db4444]" size={24} /> Write To Us
              </h2>
              <p className="mb-2">Fill out our form and we will contact you within 24 hours.</p>
              <p>Email: <span className="text-sm font-bold">customer@shopvibe.com</span></p>
              <p>Email: <span className="text-sm font-bold">support@shopvibe.com</span></p>
            </div>
          </div>


          <div className="w-full max-w-3xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">Your Name <span className="text-[#db4444]">*</span></label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                        {validity.name ? <CheckCircle className="text-green-500 h-5 w-5" /> : <AlertCircle className="text-[#db4444] h-5 w-5" />}
                      </div>
                    )}
                  </div>
                  {errors.name && <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.name}</div>}
                </div>


                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">Your Email <span className="text-[#db4444]">*</span></label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                        {validity.email ? <CheckCircle className="text-green-500 h-5 w-5" /> : <AlertCircle className="text-[#db4444] h-5 w-5" />}
                      </div>
                    )}
                  </div>
                  {errors.email && <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.email}</div>}
                </div>
              </div>


              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">Your Message <span className="text-[#db4444]">*</span></label>
                <div className="relative">
                  <textarea
                    id="message"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
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
                      {validity.message ? <CheckCircle className="text-green-500 h-5 w-5" /> : <AlertCircle className="text-[#db4444] h-5 w-5" />}
                    </div>
                  )}
                </div>
                {errors.message && <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{errors.message}</div>}
              </div>

              <button type="submit" className="w-full inline-flex items-center justify-center primaryColor px-6 py-3 rounded-full text-white font-medium transition duration-200" disabled={loading}>
                {loading ? <Loader /> : "Send Message"}
              </button>
            </form>
          </div>
        </div>


        <div className="mt-12 w-full">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9034454762266!2d72.5544441!3d23.0276297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84e8f8295a89%3A0x7a876d7a23fa4493!2sShopVibe!5e0!3m2!1sen!2sin!4v1638440341932!5m2!1sen!2sin"
              className="w-full h-[450px] rounded-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

