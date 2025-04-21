import  { useState, useRef } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import AuthImage from '../AuthImage/AuthImage';

const Otp = () => {
  const [otp, setOTP] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  // Handle OTP input changes
  const handleChange = (index, value) => {
    // Only allow numeric input
    if (isNaN(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP (mock verification)
  const verifyOTP = () => {
    const otpString = otp.join('');
    
    // Simple validation
    if (otpString.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
      return;
    }

    // Mock verification logic
    if (otpString === '123456') {
      setSuccess(true);
      setError('');
    } else {
      setError('Invalid OTP. Please try again.');
      setSuccess(false);
    }
  };

  // Resend OTP handler
  const resendOTP = () => {
    // Reset state
    setOTP(new Array(6).fill(''));
    setError('');
    setSuccess(false);

    // In a real app, you'd call an API to resend OTP
    alert('OTP Resent');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-blue-50">
    <AuthImage />
    <div className="w-full md:w-1/2 flex items-center justify-center p-8">
      <div className="w-full max-w-md  rounded-lg p-6 space-y-6">
        <div className="">
          <h2 className="text-2xl font-bold text-gray-800">OTP Verification</h2>
          <p className="text-gray-600 mt-2">
            Enter the otp sent to your mobile number
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => inputRefs.current[index] = el}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-12 text-center text-xl border-2 rounded-lg 
                         focus:outline-none focus:border-red-500 
                         transition-all duration-300"
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center text-red-500 space-x-2 justify-center">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-center text-green-500 space-x-2 justify-center">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm">OTP Verified Successfully!</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={verifyOTP}
            className="w-full bg-red-500 text-white py-3 rounded-lg 
                       hover:bg-red-600 transition-colors duration-300 
                       focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Verify OTP
          </button>
          <button
            onClick={resendOTP}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg 
                       hover:bg-gray-300 transition-colors duration-300 
                       focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Resend OTP
          </button>
        </div>

        {/* Timer or Additional Info */}
        <div className="text-center text-sm text-gray-500">
          OTP will expire in 5 minutes
        </div>
      </div>
    </div>
    </div>
  );
};

export default Otp;