import { createContext, useContext, useState, useCallback } from "react";
const ModalContext = createContext();
export const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = useCallback((title) => {
    setModalTitle(title);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalTitle("");
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, modalTitle, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);