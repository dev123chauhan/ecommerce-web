import { createContext, useContext, useState } from "react";// your existing Drawer component
import Cart from "../components/Cart/Cart";
// Create context
const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const openDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <CartContext.Provider value={{ openDrawer, closeDrawer }}>
      {/* All your app content */}
      {children}

      {/* ✅ Drawer mounted globally — always available */}
      <Cart visible={visible} onHide={closeDrawer} />
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
// ✅ Correct spelling — must be propTypes (not prototype)

