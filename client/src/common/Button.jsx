import { forwardRef } from "react";
const Button = forwardRef(
  ({ text, className = "", onClick, type = "button", disabled = false, children }, ref) => {
    return (  
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`rounded-full px-6   ${className} ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {children || text}
      </button> 
    );
  }
);

Button.displayName = "Button";

export default Button;
