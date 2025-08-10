import { Send } from "lucide-react";
import qrcode from "../../assets/qrcode.png"
import applestore from "../../assets/applestore.png"
import googleplaystore from "../../assets/googleplaystore.png"
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { TfiTwitter } from 'react-icons/tfi';
export const   footerData = [
    {
      title: "Exclusive",
      items: [  
        { type: "text", content: "Subscribe" },
        { type: "text", content: "Get 10% off your first order" },
        {
          type: "input",
          placeholder: "Enter your email",
          button: <Send size={20} className="text-black" />
        }
      ]
    },
    {
      title: "Support",
      items: [
        { type: "text", content: "111 Airav vasvani, Mumbai," },
        { type: "text", content: "DH 1515, India." },
        { type: "text", content: "shopvibe@gmail.com" },
        { type: "text", content: "+88015-88888-9999" }
      ]
    },
    {
      title: "Quick Link",
      items: [
        { type: "link", content: "Privacy Policy", path: "/privacy" },
        { type: "link", content: "Terms Of Use", path: "/terms" },
        { type: "link", content: "FAQ", path: "/faq" },
        { type: "link", content: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Download App",
      items: [
        { type: "text", content: "Save ₹200 with App New User Only", className: "text-gray-400 text-sm" },
        {
          type: "custom",
          content: (
            <div className="flex space-x-4">
             <img src={qrcode} alt=''/>
              <div className="space-y-2">
                <img src={googleplaystore} alt="Download on the App Store" className="h-8" />
                <img src={applestore} alt="Get it on Google Play" className="h-8" />
              </div>
            </div>
          )
        },
        {
          type: "custom",
          content: (
            <div className="flex space-x-4 mt-4 cursor-pointer">
            <FiFacebook size={24} className="hover:-translate-y-1 transition-transform duration-300" />
            <TfiTwitter size={24} className="hover:-translate-y-1 transition-transform duration-300" />
            <FiInstagram size={24} className="hover:-translate-y-1 transition-transform duration-300" />
            <FiLinkedin size={24} className="hover:-translate-y-1 transition-transform duration-300" />
          </div>
          )
        }
      ]
    }
  ];
