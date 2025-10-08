import  { forwardRef } from "react";
import PropTypes from "prop-types";
const Button = forwardRef(({ text, className = "", onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`rounded-full px-6 ${className}`}
    >
      {text}
    </button>
  );
});

Button.displayName = "Button";

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
