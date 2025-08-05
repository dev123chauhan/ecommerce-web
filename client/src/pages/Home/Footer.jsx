import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { footerData } from "../../components/Footer/FooterData";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 1500); 
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="inline-block w-5 h-5 border-4 border-white border-b-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <footer className="bg-black text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {footerData.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-xl">{column.title}</h3>
              {column.items.map((item, itemIndex) => {
                switch (item.type) {
                  case "text":
                    return <p key={itemIndex} className={item.className}>{item.content}</p>;
                  case "link":
                    return (
                      <div key={itemIndex}>
                        <button
                          onClick={() => handleLinkClick(item.path)}
                          className={`hover:text-gray-300 transition-colors relative ${
                            column.title === "Account" || column.title === "Quick Link" 
                              ? "group" 
                              : ""
                          }`}
                        >
                          {item.content}
                          {(column.title === "Account" || column.title === "Quick Link") && (
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
                          className="bg-black border border-white rounded-l px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-black p-2 rounded-r hover:bg-gray-200 transition-colors">
                          {item.button}
                        </button>
                      </div>
                    );
                  case "custom":
                    return <div   key={itemIndex}>{item.content}</div>;
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



















