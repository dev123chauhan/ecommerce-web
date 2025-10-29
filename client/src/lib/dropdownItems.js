import myOrderIcon from "../../public/assets/MyOrder.png";
import accountIcon from "../../public/assets/userWhite.png";
import reviewsIcon from "../../public/assets/Reviews.png";
import logoutIcon from "../../public/assets/Logout.png";
export const dropdownItems = (handleLogout) => [
  { img: accountIcon, text: "Account", path: "/account" },
  { img: myOrderIcon, text: "My Order", path: "/order" },
  { img: reviewsIcon, text: "My Reviews", path: "/review" },
  { img: logoutIcon, text: "Logout", onClick: handleLogout },
];
