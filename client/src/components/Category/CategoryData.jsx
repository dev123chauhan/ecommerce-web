import {
  BedDouble,
  Cable,
  Camera,
  Computer,
  Cookie,
  Gamepad,
  Headset,
  LaptopMinimal,
  Phone,
  Shirt,
  Smartphone,
  Utensils,
} from "lucide-react";

export  const categoryData = [
    {
      name: "Woman's Fashion",
      subCategories: [
        "Clothing",
        "Shoes",
        "Jewelry",
        "Handbags",
        "Accessories",
        "Lingerie & Sleepwear",
        "Traditional Wear"
      ]
    },
    {
      name: "Men's Fashion",
      subCategories: [
        "Clothing",
        "Shoes",
        "Watches",
        "Accessories",
        "Bags",
        "Traditional Wear"
      ]
    },
    {
      name: "Electronics",
      subCategories: [
        "Smartphones",
        "Laptops",
        "Tablets",
        "Cameras",
        "TVs",
        "Audio Devices",
        "Gaming Consoles",
        "Smart Home",
        "Computer Accessories"
      ]
    },
    {
      name: "Home & Lifestyle",
      subCategories: [
        "Furniture",
        "Kitchen & Dining",
        "Bedding",
        "Home Decor",
        "Storage & Organization",
        "Lighting",
        "Garden & Outdoor",
        "Home Appliances"
      ]
    },
    {
      name: "Medicine",
      subCategories: [  
        "Prescription Medicines",
        "Over-the-Counter Drugs",
        "First Aid",
        "Vitamins & Supplements",
        "Healthcare Devices",
        "Personal Care",
        "Ayurvedic Medicines"
      ]
    },
    {
      name: "Sports & Outdoor",
      subCategories: [
        "Exercise Equipment",
        "Sportswear",
        "Outdoor Recreation",
        "Team Sports",
        "Cycling",
        "Camping Gear",
        "Swimming",
        "Fitness Accessories"
      ]
    },
    {
      name: "Baby's & Toys",
      subCategories: [
        "Baby Clothing",
        "Diapers & Wipes",
        "Feeding",
        "Baby Care",
        "Strollers & Gear",
        "Educational Toys",
        "Action Figures",
        "Board Games",
        "Arts & Crafts"
      ]
    },
    {
      name: "Groceries & Pets",
      subCategories: [
        "Fresh Food",
        "Packaged Food",
        "Beverages",
        "Household Supplies",
        "Pet Food",
        "Pet Supplies",
        "Pet Accessories",
        "Pet Healthcare"
      ]
    },
    {
      name: "Health & Beauty",
      subCategories: [
        "Skincare",
        "Makeup",
        "Hair Care",
        "Fragrances",
        "Personal Care",
        "Beauty Tools",
        "Men's Grooming",
        "Health Monitors"
      ]
    }
  ];


  export const categories = [
    { name: "Phones", icon: <Phone /> },
    { name: "Computers", icon: <Computer /> },
    { name: "SmartWatch", icon: <Smartphone /> },
    { name: "Camera", icon: <Camera /> },
    { name: "HeadPhones", icon: <Headset /> },
    { name: "Gaming", icon: <Gamepad /> },
    { name: "Laptop", icon: <LaptopMinimal /> },
    { name: "Cloth", icon: <Shirt /> },
    { name: "Food", icon: <Cookie /> },
    { name: "Utensils", icon: <Utensils /> },
    { name: "Electric", icon:     <Cable />  },
    { name: "Furniture", icon: <BedDouble /> },
  ]