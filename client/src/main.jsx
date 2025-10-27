import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Modal from "./common/Modal.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>
          <CartProvider>
            <App />
            <Modal />
          </CartProvider>
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
