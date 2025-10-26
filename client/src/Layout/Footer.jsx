import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import { TfiTwitter } from "react-icons/tfi";
import qrcode from "../../public/assets/qrcode.png";
import applestore from "../../public/assets/applestore.png";
import googleplaystore from "../../public/assets/googleplaystore.png";
import { footerItems } from "../lib/footerItems";
const Footer = () => {
  const navigate = useNavigate();
  const handleLinkClick = (path) => {
    navigate(path);
  };
  const renderSocialIcons = (icons) => {
    const iconMap = {
      facebook: FiFacebook,
      twitter: TfiTwitter,
      instagram: FiInstagram,
      linkedin: FiLinkedin,
    };

    return (
      <div className="flex space-x-4 mt-4 cursor-pointer">
        {icons.map((iconName) => {
          const Icon = iconMap[iconName];
          return (
            <Icon
              key={iconName}
              size={24}
              className="hover:-translate-y-1 transition-transform duration-300"
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <footer className="secondaryColor text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerItems.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-xl">{column.title}</h3>
              {column.items.map((item, itemIndex) => {
                switch (item.type) {
                  case "text":
                    return (
                      <p key={itemIndex} className={item.className}>
                        {item.content}
                      </p>
                    );

                  case "link":
                    return (
                      <div key={itemIndex}>
                        <button
                          onClick={() => handleLinkClick(item.path)}
                          className={`hover:text-gray-300 transition-colors relative ${
                            column.title === "Account" ||
                            column.title === "Quick Link"
                              ? "group"
                              : ""
                          }`}
                        >
                          {item.content}
                          {(column.title === "Account" ||
                            column.title === "Quick Link") && (
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                          )}
                        </button>
                      </div>
                    );

                  case "input":
                    return (
                      <div key={itemIndex} className="flex">
                        <input
                          type="email"
                          placeholder={item.placeholder}
                          className="secondaryColor border border-white rounded-l px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-black p-2 rounded-r hover:bg-gray-200 transition-colors">
                          <Send size={20} className="text-black" />
                        </button>
                      </div>
                    );

                  case "qrcode":
                    return (
                      <div key={itemIndex} className="flex space-x-4">
                        <img src={qrcode} alt="" />
                        <div className="space-y-2">
                          <img
                            src={googleplaystore}
                            alt="Download on Google Play"
                            className="h-8"
                          />
                          <img
                            src={applestore}
                            alt="Download on App Store"
                            className="h-8"
                          />
                        </div>
                      </div>
                    );

                  case "social":
                    return (
                      <div key={itemIndex}>
                        {renderSocialIcons(item.icons)}
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center text-gray-400">
          © Copyright Devesh 2024. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;