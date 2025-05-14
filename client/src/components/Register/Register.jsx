import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { registerUser } from "../../action/AuthAction";
// import signupimage from "../../assets/loginimage.png";
import { toast } from "sonner";
import { Loader } from "../../utils/Loader";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import AuthImage from "../AuthImage/AuthImage";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [validity, setValidity] = useState({
    username: false,
    email: false,
    password: false,
  });

  // Validation functions
  const validateUsername = (username) => {
    if (!username) return { isValid: false, message: "Name is required" };
    if (username.length < 2)
      return {
        isValid: false,
        message: "Name must be at least 2 characters long",
      };
    if (username.length > 50)
      return { isValid: false, message: "Name cannot exceed 50 characters" };
    return { isValid: true, message: "" };
  };

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

    // Password strength checks
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

    // Real-time validation
    let validationResult;
    switch (name) {
      case "username":
        validationResult = validateUsername(value);
        break;
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

    // Final validation before submission
    const usernameValidation = validateUsername(formData.username);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    setErrors({
      username: usernameValidation.message,
      email: emailValidation.message,
      password: passwordValidation.message,
    });

    setValidity({
      username: usernameValidation.isValid,
      email: emailValidation.isValid,
      password: passwordValidation.isValid,
    });

    // Check if all validations pass
    if (
      !usernameValidation.isValid ||
      !emailValidation.isValid ||
      !passwordValidation.isValid
    ) {
      return;
    }

    try {
      await dispatch(registerUser(formData));
      toast.success("Successfully registered");
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      toast.error("Registration failed");
      console.error("Error registering user:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-blue-50">
      {/* <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <img
          src={signupimage}
          alt="Shopping concept"
          className="max-w-full h-auto"
        />
      </div> */}
      <AuthImage />

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link className="flex items-center gap-2 py-3 text-red-500" to="/">
            <ArrowLeft />
            Back to home
          </Link>
          <h2 className="text-2xl font-bold mb-6">Create an account</h2>
          <p className="mb-6 text-gray-600">Enter your details below</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <input
                type="text"
                name="username"
                placeholder="Name"
                className={`w-full px-3 py-2 border rounded-md ${
                  formData.username
                    ? validity.username
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                onChange={handleChange}
                required
              />
              {formData.username && (
                <div className="absolute right-3 top-1/3 transform -translate-y-1/2">
                  {validity.username ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-red-500 h-5 w-5" />
                  )}
                </div>
              )}
              {errors.username && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.username}
                </div>
              )}
            </div>
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
                required
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
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {/* {showPassword ? (
                  <Eye className="text-gray-500 h-5 w-5" />
                ) : (
                  <EyeOff className="text-gray-500 h-5 w-5" />
                )} */}
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
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              disabled={loading}
            >
              {loading ? <Loader /> : "Create Account"}
            </button>
          </form>

          <button className="w-full gap-2 mt-4 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition duration-300">
            <FcGoogle size={25} /> Sign up with Google
          </button>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

