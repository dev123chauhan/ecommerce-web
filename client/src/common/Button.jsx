import { forwardRef } from "react";
const Button = forwardRef(
  ({ text, className = "", onClick, type = "button", disabled = false, children }, ref) => {
    return (  
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          rounded-full 
          px-3 py-1
          min-[320px]:px-3.5 min-[320px]:py-1
          min-[360px]:px-4 min-[360px]:py-1.5
          min-[400px]:px-4.5 min-[400px]:py-1.5
          min-[480px]:px-5 min-[480px]:py-1.5
          sm:px-6 sm:py-2
          md:px-7 md:py-2
          lg:px-8 lg:py-2.5
          text-[9px]
          min-[320px]:text-[10px]
          min-[360px]:text-[11px]
          min-[400px]:text-xs
          min-[480px]:text-[13px]
          sm:text-sm
          md:text-base
          lg:text-lg
          font-medium
          transition-all duration-200
          whitespace-nowrap
          ${className} 
          ${disabled ? "opacity-70 cursor-not-allowed" : "active:scale-95"}
        `}
      >
        {children || text}
      </button> 
    );
  }
);

Button.displayName = "Button";

export default Button;