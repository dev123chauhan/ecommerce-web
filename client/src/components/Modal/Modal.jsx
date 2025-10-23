import { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { useModal } from "../../context/modalContext";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

const Modal = () => {
  const { isOpen, modalTitle, closeModal } = useModal();
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

  const renderContent = () => {
    switch (modalTitle) {
      case "Login":
        return <Login />;
      case "Register":
        return <Register />;
      default:
        return null;
    }
  };
  const headerTemplate = (
    <div className="w-full text-center text-3xl font-semibold text-gray-900 dark:text-white">
      {modalTitle}
    </div>
  );
  return (
    <Dialog
      visible={isOpen}
      onHide={closeModal}
      header={headerTemplate}
      modal
      className="w-full max-w-md custom-dialog"
      contentClassName="dark:bg-gray-800 dark:text-white p-0"
      dismissableMask
      draggable={false}
      resizable={false}
      blockScroll={false}
      appendTo="self"
    >
      {renderContent()}
    </Dialog>
  );
};

export default Modal;
