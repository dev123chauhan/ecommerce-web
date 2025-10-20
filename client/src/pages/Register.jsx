import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import AuthImage from "../components/AuthImage/AuthImage";
import { registerUser } from "../redux/action/AuthAction";
import { Loader } from "../utils/Loader";
import { validateEmail, validatePassword, validateUsername } from "../Validation/Validation";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

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

    setErrors((prev) => ({ ...prev, [name]: validationResult.message }));
    setValidity((prev) => ({ ...prev, [name]: validationResult.isValid }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (!usernameValidation.isValid || !emailValidation.isValid || !passwordValidation.isValid) {
      return;
    }

    try {
      await dispatch(registerUser(formData));
      toast.success("Successfully registered");
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      toast.error("Registration failed");
      console.error("Error registering user:", error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col md:flex-row bg-blue-50">
      <AuthImage />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 h-screen">
        <div className="w-full max-w-md">
          <Link className="flex items-center gap-2 py-3 text-[#db4444]" to="/">
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
                      : "border-[#db4444] bg-red-50"
                    : "border-gray-300"
                }`}
                onChange={handleChange}
              />
              {formData.username && (
                <div className="absolute right-3 top-1/3 transform -translate-y-1/2">
                  {validity.username ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-[#db4444] h-5 w-5" />
                  )}
                </div>
              )}
              {errors.username && (
                <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
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
                      : "border-[#db4444] bg-red-50"
                    : "border-gray-300"
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
                className={`w-full px-3 py-2 border rounded-md ${
                  formData.password
                    ? validity.password
                      ? "border-green-500 bg-green-50"
                      : "border-[#db4444] bg-red-50"
                    : "border-gray-300"
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

            <button
              type="submit"
              className="w-full primaryColor text-white px-6 py-3 rounded-full transition duration-300"
              disabled={loading}
            >
              {loading ? <Loader /> : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#db4444] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;


