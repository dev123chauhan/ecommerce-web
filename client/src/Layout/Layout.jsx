import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const AnnouncementBanner = React.lazy(() => import("./AnnouncmentBanner"));
const Layout = () => {
  const location = useLocation();
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleBannerVisibilityChange = (isVisible) => {
    setIsBannerVisible(isVisible);
  };
  return (
    <div className="">
      <div className="fixed top-0 left-0 right-0 z-50">
        <React.Suspense fallback={<div className="h-8 secondaryColor" />}>
          <AnnouncementBanner
            onVisibilityChange={handleBannerVisibilityChange}
          />
        </React.Suspense>
        <Header />
      </div>

      <div className={`${isBannerVisible ? "pt-[50px]" : "pt-[9px]"}`}>
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
