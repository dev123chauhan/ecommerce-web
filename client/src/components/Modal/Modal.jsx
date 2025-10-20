import { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { useModal } from "../../context/ModalContext";
import { LogIn } from "lucide-react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
const Modal = () => {
  const { isOpen, modalTitle, closeModal } = useModal();
  const navigate = useNavigate();
  const scrollPosition = useRef(0);
  useEffect(() => {
    if (isOpen) {
      scrollPosition.current = window.pageYOffset;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      const scrollY = scrollPosition.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      
      window.scrollTo(0, scrollY);
    }
  }, [isOpen]);

  return (
    <Dialog
      visible={isOpen}
      onHide={closeModal}
      header={modalTitle}
      modal
      className="w-full max-w-lg"
      contentClassName="dark:bg-gray-800 dark:text-white"
      headerClassName="dark:bg-gray-800 dark:text-white dark:border-gray-700"
      dismissableMask
      draggable={false}
      resizable={false}
      blockScroll={false}
      appendTo="self"
    >
      <div className="text-center p-6">
        <div className="flex justify-center mb-4">
          <LogIn size={48} className="text-[#db4444]" />
        </div>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Please log in to add items to your cart and continue shopping.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            text="Cancel"
            onClick={closeModal}
            className="py-2 border border-gray-300 dark:border-gray-600"
          />
          <Button
            onClick={() => {
              closeModal();
              navigate("/login");
            }}
            text="Go to Login"
            className="primaryColor text-white py-2"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;




