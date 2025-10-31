// import { useEffect, useRef, useContext } from "react";
// import { Dialog } from "primereact/dialog";
// import Login from "../components/Login/Login";
// import Register from "../components/Register/Register";
// import { ThemeContext } from "../context/ThemeContext";
// import { useModal } from "../context/ModalContext";
// const Modal = () => {
//   const { isOpen, modalTitle, closeModal } = useModal();
//   const { theme } = useContext(ThemeContext);
//   const scrollPosition = useRef(0);

//   useEffect(() => {
//     if (isOpen) {
//       scrollPosition.current = window.pageYOffset;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollPosition.current}px`;
//       document.body.style.width = "100%";
//       document.body.style.overflowY = "scroll";
//     } else {
//       const scrollY = scrollPosition.current;
//       document.body.style.position = "";
//       document.body.style.top = "";
//       document.body.style.width = "";
//       document.body.style.overflowY = "";
//       window.scrollTo(0, scrollY);
//     }
//   }, [isOpen]);

//   const renderContent = () => {
//     switch (modalTitle) {
//       case "Login":
//         return <Login />;
//       case "Register":
//         return <Register />;
//       default:
//         return null;
//     }
//   };

//   const headerTemplate = (
//     <div
//       className={`w-full text-center mb-2 text-3xl font-semibold ${
//         theme === "dark" ? "text-white" : "text-gray-900"
//       }`}
//     >
//       {modalTitle}
//     </div>
//   );

//   return (
//     <Dialog
//       visible={isOpen}
//       onHide={closeModal}
//       header={headerTemplate}
//       modal
//       className={`w-full max-w-md custom-dialog ${
//         theme === "dark" ? "dark-theme-dialog" : "light-theme-dialog"
//       }`}
//       contentClassName={`p-0 ${
//         theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
//       }`}
//       dismissableMask
//       draggable={false}
//       resizable={false}
//       blockScroll={false}
//       appendTo="self" 
//     >
//       {renderContent()}
//     </Dialog>
//   );
// };

// export default Modal;

import { useEffect, useRef, useContext } from "react";
import { Dialog } from "primereact/dialog";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { ThemeContext } from "../context/ThemeContext";
import { useModal } from "../context/ModalContext";

const Modal = () => {
  const { isOpen, modalTitle, closeModal } = useModal();
  const { theme } = useContext(ThemeContext);
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
    <div
      className={`w-full text-center  text-2xl sm:text-3xl font-semibold ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      {modalTitle}
    </div>
  );

  return (
    <Dialog
      visible={isOpen}
      onHide={closeModal}
      header={headerTemplate}
      modal
      className={`w-[95vw] sm:w-[90vw] md:w-[500px] lg:w-[550px] max-h-[90vh] custom-dialog ${
        theme === "dark" ? "dark-theme-dialog" : "light-theme-dialog"
      }`}
      contentClassName={`p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[70vh] ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
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