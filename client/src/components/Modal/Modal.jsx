import { useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = "", 
  showCloseButton = true,
  title = "" 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className={`dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 relative z-50 bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-auto transform transition-all duration-300 scale-100 opacity-100 modal-content ${className}`}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-500 dark:text-gray-400" />
          </button>
        )}


        {title && (
          <div className="border-b dark:border-gray-700 p-4 pb-3">
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
        )}


        <div className={`${title ? 'pt-2' : ''}`}>
          {children}
        </div>
      </div>


      <style>{`
        .modal-content {
          animation: modalZoomIn 0.3s ease-out;
        }
        
        @keyframes modalZoomIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
  title: PropTypes.string
};

export default Modal;