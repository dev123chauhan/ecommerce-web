import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
export default function ChangePassword() {
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [validity, setValidity] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const validatePassword = (password = false) => {
    if (!password) return { isValid: false, message: "Password is required" };
    if (password.length < 8) return { isValid: false, message: "Password must be at least 8 characters long" };
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      return { 
        isValid: false, 
        message: "Password must include uppercase, lowercase, number, and special character" 
      };
    }

    return { isValid: true, message: "" };
  };

  const validateConfirmPassword = (newPassword, confirmPassword) => {
    if (!confirmPassword) return { isValid: false, message: "Please confirm your new password" };
    if (newPassword !== confirmPassword) return { isValid: false, message: "Passwords do not match" };
    return { isValid: true, message: "" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let validationResult;
    switch (name) {
      case 'currentPassword':
        validationResult = validatePassword(value);
        break;
      case 'newPassword':
        validationResult = validatePassword(value, true);
        break;
      case 'confirmPassword':
        validationResult = validateConfirmPassword(formData.newPassword, value);
        break;
      default:
        validationResult = { isValid: false, message: "" };
    }

    setErrors(prev => ({
      ...prev,
      [name]: validationResult.message
    }));

    setValidity(prev => ({
      ...prev,
      [name]: validationResult.isValid
    }));
  };

  const togglePasswordVisibility = (passwordField) => {
    setShowPasswords(prev => ({
      ...prev,
      [passwordField]: !prev[passwordField]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentPasswordValidation = validatePassword(formData.currentPassword);
    const newPasswordValidation = validatePassword(formData.newPassword, true);
    const confirmPasswordValidation = validateConfirmPassword(formData.newPassword, formData.confirmPassword);

    setErrors({
      currentPassword: currentPasswordValidation.message,
      newPassword: newPasswordValidation.message,
      confirmPassword: confirmPasswordValidation.message
    });

    setValidity({
      currentPassword: currentPasswordValidation.isValid,
      newPassword: newPasswordValidation.isValid,
      confirmPassword: confirmPasswordValidation.isValid
    });

    if (!currentPasswordValidation.isValid || 
        !newPasswordValidation.isValid || 
        !confirmPasswordValidation.isValid) {
      return;
    }
    console.log('Password change submitted');
  };

  const renderPasswordInput = (name, placeholder) => (
    <div className="relative mb-4">
      <input
        type={showPasswords[name] ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 ${
          formData[name]
            ? (validity[name] 
                ? "border-green-500 bg-green-50" 
                : "border-red-500 bg-red-50")
            : "border-gray-300"
        }`}
        onChange={handleChange}
        required
      />
      <button
        type="button"
        onClick={() => togglePasswordVisibility(name)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
      >
        {showPasswords[name] ? (
          <Eye className="text-gray-500 h-5 w-5" />
        ) : (
          <EyeOff className="text-gray-500 h-5 w-5" />
        )}
      </button>
      {formData[name] && (
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
          {validity[name] ? (
            <CheckCircle className="text-green-500 h-5 w-5" />
          ) : (
            <AlertCircle className="text-red-500 h-5 w-5" />
          )}
        </div>
      )}
      {errors[name] && (
        <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {errors[name]}
        </div>
      )}
    </div>
  );


  return (
    <form onSubmit={handleSubmit}>
    <h1 className="text-2xl font-bold text-red-500 mb-6">Change Password</h1>
    
    <div className="space-y-4 mb-5">
      {renderPasswordInput('currentPassword', 'Current Password')}
      {renderPasswordInput('newPassword', 'New Password')}
      {renderPasswordInput('confirmPassword', 'Confirm New Password')}
    </div>
    
    <button
      type="submit"
      className="w-full inline-flex items-center justify-center rounded-lg bg-red-500 px-6 py-2.5 text-white font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
    >
      Save Changes
    </button>
  </form>
  );
}



