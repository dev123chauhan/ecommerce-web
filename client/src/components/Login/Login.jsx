import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { loginUser } from "../../redux/action/authAction";
import { validateEmail, validatePassword } from "../../validation/validation";
import { useModal } from "../../context/ModalContext";
import Button from "../../common/Button";
import { Loader } from "../../common/Loader";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { closeModal, openModal } = useModal();
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

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
      const result = await dispatch(loginUser(values));
      if (result.success) {
        toast.success("Successfully logged in!");
        closeModal();
      } else {
        toast.error(
          result.error || "Login failed. Please check your credentials."
        );
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchToRegister = () => {
    openModal("Register");
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

        <div className="flex items-center justify-between mb-4">
          <p className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 rounded accent-black dark:accent-white"
            />
            <span className="text-sm dark:text-gray-300">Remember me</span>
          </p>
        </div>
        <Button
          type="submit"
          text=""
          className="w-full primaryColor py-3 text-white mb-3"
          disabled={loading}
        >
          {loading ? <Loader /> : "Login"}
        </Button>
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
