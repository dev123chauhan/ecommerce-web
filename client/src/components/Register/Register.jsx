import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
// import { registerUser } from "../redux/action/authAction";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../Validation/validation";
import { useModal } from "../../context/ModalContext";
import Button from "../../common/Button";
import { Loader } from "../../common/Loader";
import { registerUser } from "../../redux/action/authAction";
const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const { closeModal, openModal } = useModal();
  
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      const usernameValidation = validateUsername(values.username);
      if (!usernameValidation.isValid) {
        errors.username = usernameValidation.message;
      }

      const emailValidation = validateEmail(values.email);
      if (!emailValidation.isValid) {
        errors.email = emailValidation.message;
      }

      const passwordValidation = validatePassword(values.password);
      if (!passwordValidation.isValid) {
        errors.password = passwordValidation.message;
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        await dispatch(registerUser(values));
        toast.success("Successfully registered");
        closeModal();
      } catch (error) {
        toast.error("Registration failed");
        console.error("Error registering user:", error);
      }
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const switchToLogin = () => {
    openModal("Login");
  };

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
    <div className="p-6 dark:bg-gray-800">
      <p className="mb-6 text-gray-600 dark:text-gray-300 text-center">
        Enter your Credentials details below
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                formik.values.username
                  ? isFieldValid("username")
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {formik.values.username && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isFieldValid("username") ? (
                  <CheckCircle className="text-green-500 h-5 w-5" />
                ) : (
                  <AlertCircle className="text-[#db4444] h-5 w-5" />
                )}
              </div>
            )}
          </div>
          {isFieldInvalid("username") && (
            <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {formik.errors.username}
            </div>
          )}
        </div>
        <div className="mb-4"></div>

        <div className="mb-2">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                formik.values.email
                  ? isFieldValid("email")
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                  : "border-gray-300 dark:border-gray-600"
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
        <div className="mb-4"></div>

        <div className="relative mb-2">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 ${formik.values.password ? 'pr-24' : 'pr-12'} border rounded-md dark:bg-gray-700 dark:text-white ${
                formik.values.password
                  ? isFieldValid("password")
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-[#db4444] bg-red-50 dark:bg-red-900/20"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {formik.values.password && (
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                {isFieldValid("password") ? (
                  <CheckCircle className="text-green-500 h-5 w-5" />
                ) : (
                  <AlertCircle className="text-[#db4444] h-5 w-5" />
                )}
              </div>
            )}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-200"
            >
              {showPassword ? (
                <Eye  className="h-5 w-5" />
              ) : (
                <EyeOff  className="h-5 w-5" />
              )}
            </button>
          </div>
          {isFieldInvalid("password") && (
            <div className="text-[#db4444] text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className="mb-6"></div>
        
        <Button
          type="submit"
          text=""
          className="w-full primaryColor py-3 text-white"
          disabled={loading}
        >
          {loading ? <Loader /> : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-[#db4444] hover:underline font-medium"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default Register;
