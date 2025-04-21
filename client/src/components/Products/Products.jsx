import gamepad from "../../assets/gamepad.png";
import keyboard from "../../assets/keyboard.png";
import monitor from "../../assets/monitor.png";
import chair from "../../assets/chair.png";
import graphiccard from "../../assets/graphic card.webp";
import microphone from "../../assets/microphone.webp";
import vrheadset from "../../assets/vrheadset.webp";
import gamingrouter from "../../assets/gamingrouter.png";

export  const products = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      image: gamepad,
      discount: "-40%",
      price: 120,
      originalPrice: 160,
      rating: 5,
      reviews: 88,
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      image: keyboard,
      discount: "-35%",
      price: 960,
      originalPrice: 1160,
      rating: 4,
      reviews: 75,
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      image: monitor,
      discount: "-30%",
      price: 370,
      originalPrice: 400,
      rating: 5,
      reviews: 99,
    },
    {
      id: 4,
      name: "S-Series Comfort Chair",
      image: chair,
      discount: "-25%",
      price: 375,
      originalPrice: 400,
      rating: 4,
      reviews: 99,
    },
     {
       id: 5,
       name: "RTX 4070 Graphics Card",
       discount: "-20%",
       price: 400,
       originalPrice: 450,
       rating: 4,
       reviews: 99,
       image: graphiccard,
     },
     {
       id: 6,
       name: "Streaming Microphone Kit",
       discount: "-15%",
       price: 450,
       originalPrice: 500,
       rating: 4,
       reviews: 99,
       image: microphone,
     },
     {
       id: 7,
       name: "VR Headset Pro",
       discount: "-10%",
       price: 500,
       originalPrice: 530,
       rating: 4,
       reviews: 99,
       image: vrheadset,
     },
     {
       id: 8,
       name: "Gaming Router AX6000",
       discount: "-5%",
       price: 550,
       originalPrice: 600,
       rating: 4,
       reviews: 99,
       image: gamingrouter,
     },
  ];