// server/scripts/seedDatabase.js
require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Shop = require('../models/Shop');
const connectDB = require('../config/database');

// Category data
// const categoryData = {
//   "Gaming Controllers": [
//     "Wireless Controllers",
//     "Wired Controllers",
//     "Racing Wheels",
//     "Flight Sticks",
//     "Fight Sticks",
//     "Nintendo Controllers",
//     "Xbox Controllers",
//     "PlayStation Controllers",
//   ],
//   "Keyboards": [
//     "Mechanical Keyboards",
//     "Membrane Keyboards",
//     "Wireless Keyboards",
//     "Gaming Keyboards",
//     "Ergonomic Keyboards",
//     "Mini Keyboards",
//     "Keyboard Accessories",
//   ],
//   "Mice & Pointing": [
//     "Gaming Mice",
//     "Wireless Mice",
//     "Ergonomic Mice",
//     "Trackballs",
//     "Vertical Mice",
//     "Mouse Bundles",
//     "Precision Mice",
//   ],
//   // ... other categories
// };
const categoryData = {
  "Gaming Controllers": [
    "Wireless Controllers",
    "Wired Controllers",
    "Racing Wheels",
    "Flight Sticks",
    "Fight Sticks",
    "Nintendo Controllers",
    "Xbox Controllers",
    "PlayStation Controllers",
  ],
  Keyboards: [
    "Mechanical Keyboards",
    "Membrane Keyboards",
    "Wireless Keyboards",
    "Gaming Keyboards",
    "Ergonomic Keyboards",
    "Mini Keyboards",
    "Keyboard Accessories",
  ],
  "Mice & Pointing": [
    "Gaming Mice",
    "Wireless Mice",
    "Ergonomic Mice",
    "Trackballs",
    "Vertical Mice",
    "Mouse Bundles",
    "Precision Mice",
  ],
  "Monitors & Displays": [
    "Gaming Monitors",
    "Ultra-wide Monitors",
    "4K Monitors",
    "Curved Monitors",
    "Portable Monitors",
    "Professional Monitors",
    "Monitor Arms",
    "Monitor Accessories",
  ],
  "Audio Equipment": [
    "Gaming Headsets",
    "Wireless Headphones",
    "Earbuds",
    "Speakers",
    "Microphones",
    "Sound Cards",
    "Audio Interfaces",
    "DACs & Amplifiers",
  ],
  "Gaming Furniture": [
    "Gaming Chairs",
    "Gaming Desks",
    "Monitor Stands",
    "Cable Management",
    "Desk Mats",
    "Footrests",
    "Storage Solutions",
    "RGB Lighting",
  ],
  "PC Components": [
    "Graphics Cards",
    "Processors",
    "Motherboards",
    "RAM",
    "Storage Drives",
    "Power Supplies",
    "PC Cases",
    "Cooling Systems",
  ],
  Networking: [
    "Gaming Routers",
    "Network Cards",
    "WiFi Adapters",
    "Network Cables",
    "Switches",
    "Powerline Adapters",
    "Network Tools",
  ],
  "Streaming Equipment": [
    "Capture Cards",
    "Stream Decks",
    "Webcams",
    "Green Screens",
    "Studio Lighting",
    "Stream Controllers",
    "Recording Equipment",
  ],
  "Gaming Accessories": [
    "Mouse Pads",
    "Wrist Rests",
    "Controller Skins",
    "Gaming Glasses",
    "Console Stands",
    "Carrying Cases",
    "Screen Protectors",
  ],
  "Virtual Reality": [
    "VR Headsets",
    "VR Controllers",
    "Base Stations",
    "VR Accessories",
    "VR Cables",
    "VR Face Covers",
    "VR Storage",
  ],
  "Console Gaming": [
    "PlayStation",
    "Xbox",
    "Nintendo",
    "Retro Gaming",
    "Console Accessories",
    "Digital Cards",
    "Gaming Subscriptions",
  ],
  "Mobile Gaming": [
    "Phone Controllers",
    "Tablet Controllers",
    "Mobile Cooling",
    "Power Banks",
    "Gaming Phones",
    "Mobile Accessories",
    "Bluetooth Adapters",
  ],
  "Software & Services": [
    "Gaming Software",
    "Antivirus",
    "Game Keys",
    "Gift Cards",
    "Design Software",
    "Productivity Apps",
    "Cloud Storage",
  ],
};
// Sample product data
const productData = [
  {
    name: "Pro Gaming Controller",
    price: 59.99,
    discountPercentage: 15,
    rating: 4.5,
    category: "Gaming Controllers",
    subCategory: "Wireless Controllers",
    image: "https://cdn.bdstall.com/product-image/giant_258719.jpg",
    description: "Professional-grade wireless gaming controller with customizable buttons and low latency connection for competitive gaming.",
    stock: 45,
    brand: "GameMaster",
    features: [
      "50-hour battery life",
      "Customizable buttons",
      "Low latency connection",
      "Ergonomic design",
      "Compatible with PC and console"
    ]
  },
  {
    name: "Mechanical RGB Keyboard",
    price: 129.99,
    discountPercentage: 10,
    rating: 4.8,
    category: "Keyboards",
    subCategory: "Mechanical Keyboards",
    image: "https://garmade.com/cdn/shop/products/TBD0602123801A.jpg?v=1669711132",
    description: "Full-sized mechanical keyboard with RGB backlighting, Cherry MX switches, and programmable macros for gaming and productivity.",
    stock: 30,
    brand: "TypeMaster",
    features: [
      "Cherry MX Blue switches",
      "Per-key RGB lighting",
      "Aluminum frame",
      "Programmable macros",
      "USB passthrough"
    ]
  },
  {
    name: "Precision Gaming Mouse",
    price: 49.99,
    discountPercentage: 20,
    rating: 4.7,
    category: "Mice & Pointing",
    subCategory: "Gaming Mice",
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/mouse/n/f/0/zeb-phero-with-dpi-switch-high-precision-plug-play-4-buttons-original-imahfgekqehdazzv.jpeg?q=20&crop=false",
    description: "High-precision gaming mouse with adjustable DPI settings, ergonomic design and customizable weight system.",
    stock: 60,
    brand: "ClickMaster",
    features: [
      "16000 DPI optical sensor",
      "8 programmable buttons",
      "Adjustable weight system",
      "RGB lighting",
      "Onboard memory profiles"
    ]
  },
  {
    name: "Wired Xbox Controller",
    price: 39.99,
    discountPercentage: 5,
    rating: 4.3,
    category: "Gaming Controllers",
    subCategory: "Xbox Controllers",
    image: "https://m.media-amazon.com/images/I/71FAo+u4+SL._AC_UF1000,1000_QL80_.jpg",
    description: "Official wired Xbox controller with improved D-pad and textured grip for enhanced comfort during long gaming sessions.",
    stock: 25,
    brand: "Microsoft",
    features: [
      "3.5mm stereo headset jack",
      "Textured grip",
      "Improved D-pad",
      "Button mapping",
      "Compatible with Xbox and PC"
    ]
  },
  {
    name: "Wireless Ergonomic Keyboard",
    price: 89.99,
    discountPercentage: 12,
    rating: 4.6,
    category: "Keyboards",
    subCategory: "Ergonomic Keyboards",
    image: "https://m.media-amazon.com/images/I/71Yp7pxBFOL.jpg",
    description: "Split-design ergonomic keyboard with wireless connectivity, cushioned palm rest and quiet membrane keys for comfortable typing.",
    stock: 15,
    brand: "ComfortType",
    features: [
      "Split ergonomic design",
      "Wireless connectivity",
      "Cushioned palm rest",
      "Quiet membrane keys",
      "Long battery life"
    ]
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    // Clear existing data
    await Category.deleteMany({});
    await Shop.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Insert category data
    const categoryMap = {};
    
    for (const [categoryName, subCategories] of Object.entries(categoryData)) {
      const category = new Category({
        name: categoryName,
        subCategories: subCategories,
      });
      
      const savedCategory = await category.save();
      categoryMap[categoryName] = savedCategory._id;
      
      console.log(`Category ${categoryName} added with ${subCategories.length} subcategories`);
    }
    
    // Insert product data
    for (const product of productData) {
      const newProduct = new Shop({
        ...product,
        categoryId: categoryMap[product.category],
      });
      
      await newProduct.save();
      console.log(`Added product: ${product.name}`);
    }
    
    console.log('Database seeded successfully!');
    
    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Execute the seeding function
seedDatabase();