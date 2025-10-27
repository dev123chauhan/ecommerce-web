import { createContext, useContext, useState } from "react";
import Cart from "../components/Cart/Cart";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const openDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <CartContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}
      <Cart visible={visible} onHide={closeDrawer} />  
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);

