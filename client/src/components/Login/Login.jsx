import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../action/AuthAction";
import { toast } from "sonner";
import { Loader } from "../../utils/Loader";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import AuthImage from "../AuthImage/AuthImage";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

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


  const validateEmail = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { isValid: false, message: "Email is required" };
    if (!emailRegex.test(email))
      return { isValid: false, message: "Please enter a valid email address" };
    return { isValid: true, message: "" };
  };

  const validatePassword = (password) => {
    if (!password) return { isValid: false, message: "Password is required" };
    if (password.length < 8)
      return {
        isValid: false,
        message: "Password must be at least 8 characters long",
      };
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      return {
        isValid: false,
        message:
          "Password must include uppercase, lowercase, number, and special character",
      };
    }

    return { isValid: true, message: "" };
  };

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
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(
        result.error || "Login failed. Please check your credentials."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row  bg-blue-50">
      <AuthImage />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link className="flex items-center gap-2 py-3 text-red-500" to="/">
            <ArrowLeft />
            Back to home
          </Link>
          <h2 className="text-2xl font-bold mb-6">Log in to ShopVibe</h2>
          <p className="mb-6 text-gray-600">Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`w-full px-3 py-2 border rounded-md ${
                  formData.email
                    ? validity.email
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                onChange={handleChange}
              />
              {formData.email && (
                <div className="absolute right-3 top-1/3 transform -translate-y-1/2">
                  {validity.email ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-red-500 h-5 w-5" />
                  )}
                </div>
              )}
              {errors.email && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
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
                className={`w-full px-3 py-2 border rounded-md ${
                  formData.password
                    ? validity.password
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
              </button>
              {formData.password && (
                <div className="absolute right-3 top-1/3 transform -translate-y-1/2">
                  {validity.password ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-red-500 h-5 w-5" />
                  )}
                </div>
              )}
              {errors.password && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-6">
              <p className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-black"
                />{" "}
                Remember me{" "}
              </p>
            </div>
            <button
              type="submit"
              className="w-full mb-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              disabled={loading}
            >
              {loading ? <Loader /> : "Log in"}
            </button>
          </form>
          <p className="text-center text-gray-600">
            Do not have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
