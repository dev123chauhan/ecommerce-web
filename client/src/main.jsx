import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { ModalContextProvider } from "./context/ModalContext.jsx";
import Modal from "./components/Modal/Modal.jsx";
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ModalContextProvider>
          <App />
          <Modal />
        </ModalContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
