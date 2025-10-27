import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { ArrowUp } from 'lucide-react';
import { useDispatch } from "react-redux";
import { checkAuthentication } from "./redux/action/authAction";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Faq from "./pages/Faq";
import Billing from "./pages/Billing";
import Order from "./pages/Order";
import Review from "./pages/Review";
import ProductDetail from "./pages/ProductDetail";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    let pageTitle = "Ecommerce Webapp";

    switch (path) {
      case "/":
        pageTitle = "Home | ShopVibe";
        break;
      case "/shop":
        pageTitle = "Shop | ShopVibe";
        break;
      case "/about":
        pageTitle = "About | ShopVibe";
        break;
      case "/contact":
        pageTitle = "Contact | ShopVibe";
        break;
      case "/login":
        pageTitle = "Login | ShopVibe";
        break;
      case "/signup":
        pageTitle = "Register | ShopVibe";
        break;
      default:
        pageTitle = "ShopVibe";
    }

    document.title = pageTitle;
  }, [location]);
  return (
    <>
      <Toaster color="green" position="bottom-right" />
      <ScrollToTop
        className="scrollToTop"
        smooth
        component={<ArrowUp size={20} className="upArrow" />}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index  element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/billing" element={<PrivateRoute element={Billing} />} />
          <Route
            path="/wishlist"
            element={<PrivateRoute element={Wishlist} />}
          />
          <Route path="/order" element={<PrivateRoute element={Order} />} />
          <Route path="/review" element={<PrivateRoute element={Review} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
