import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import ThemeContextProvider from "./context/ThemeContextProvider.jsx";
import { ModalContextProvider } from "./context/ModalContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import Modal from "./common/Modal.jsx";
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Provider store={store}>
        <ThemeContextProvider>
          <ModalContextProvider>
            <CartProvider>
              <App />
              <Modal />
            </CartProvider>
          </ModalContextProvider>
        </ThemeContextProvider>
      </Provider>
    </BrowserRouter>
);
