import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CheckCircle, AlertCircle } from "lucide-react";
import { loginUser } from "../redux/action/authAction";
import { Loader } from "../utils/Loader";
import { validateEmail, validatePassword } from "../Validation/validation";
import { useModal } from "../context/modalContext";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { closeModal, openModal } = useModal();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [validity, setValidity] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let validationResult;
    switch (name) {
      case "email":
        validationResult = validateEmail(value);
        break;
      case "password":
        validationResult = validatePassword(value);
        break;
      default:
        validationResult = { isValid: false, message: "" };
    }

    setErrors((prev) => ({
      ...prev,
      [name]: validationResult.message,
    }));

    setValidity((prev) => ({
      ...prev,
      [name]: validationResult.isValid,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    setErrors({
      email: emailValidation.message,
      password: passwordValidation.message,
    });

    setValidity({
      email: emailValidation.isValid,
      password: passwordValidation.isValid,
    });

    if (!emailValidation.isValid || !passwordValidation.isValid) {
      return;
    }

    const result = await dispatch(loginUser(formData));
    if (result.success) {
      toast.success("Successfully logged in!");
      closeModal();
    } else {
      toast.error(result.error || "Login failed. Please check your credentials.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchToRegister = () => {
    openModal("Register");
  };

  return (
    <div className="p-6 dark:bg-gray-800">
      <p className="mb-6 text-gray-600 dark:text-gray-300 text-center">Enter your Credentials details below</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
              formData.email
                ? validity.email
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                : "border-gray-300 dark:border-gray-600"
            }`}
            onChange={handleChange}
          />
          {formData.email && (
            <div className="absolute right-3 top-1/3 transform -translate-y-1/2">
              {validity.email ? (
                <CheckCircle className="text-green-500 h-5 w-5" />
              ) : (
                <AlertCircle className="text-[#db4444] h-5 w-5" />
              )}
            </div>
          )}
          {errors.email && (
            <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </div>
          )}
        </div>

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
              formData.password
                ? validity.password
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                : "border-gray-300 dark:border-gray-600"
            }`}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
          ></button>
          {formData.password && (
            <div className="absolute right-3 top-1/3 transform -translate-y-1/2">
              {validity.password ? (
                <CheckCircle className="text-green-500 h-5 w-5" />
              ) : (
                <AlertCircle className="text-[#db4444] h-5 w-5" />
              )}
            </div>
          )}
          {errors.password && (
            <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.password}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded accent-black dark:accent-white" /> 
            <span className="text-sm dark:text-gray-300">Remember me</span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full mb-6 primaryColor text-white px-6 py-3 rounded-full transition duration-300 hover:opacity-90"
          disabled={loading}
        >
          {loading ? <Loader /> : "Log in"}
        </button>
      </form>

      <p className="text-center text-gray-600 dark:text-gray-300">
        Do not have an account?{" "}
        <button 
          onClick={switchToRegister}
          className="text-[#db4444] hover:underline font-medium"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;