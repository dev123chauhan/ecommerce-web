export const footerItems = [
  {
    title: "Exclusive",
    items: [
      { type: "text", content: "Subscribe" },
      { type: "text", content: "Get 10% off your first order" },
      {
        type: "input",
        placeholder: "Enter your email",
        buttonIcon: "Send", 
      },
    ],
  },
  {
    title: "Support",
    items: [
      { type: "text", content: "111 Airav vasvani, Mumbai," },
      { type: "text", content: "DH 1515, India." },
      { type: "text", content: "shopvibe@gmail.com" },
      { type: "text", content: "+88015-88888-9999" },
    ],
  },
  {
    title: "Quick Link",
    items: [
      { type: "link", content: "Privacy Policy", path: "/privacy" },
      { type: "link", content: "Terms Of Use", path: "/terms" },
      { type: "link", content: "FAQ", path: "/faq" },
      { type: "link", content: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Download App",
    items: [
      {
        type: "text",
        content: "Save ₹200 with App New User Only",
        className: "text-gray-400 text-sm",
      },
      {
        type: "qrcode",
        images: {
          qr: "/assets/qrcode.png",
          googlePlay: "/assets/googleplaystore.png",
          appStore: "/assets/applestore.png"
        }
      },
      {
        type: "social",
        icons: ["facebook", "twitter", "instagram", "linkedin"]
      },
    ],
  },
];