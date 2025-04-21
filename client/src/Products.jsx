
import coat from "./assets/coat.png";
import bookshelf from "./assets/bookshelf.png";
import buffledog from "./assets/dufflebag.png";
import cloth1 from "./assets/clothing 1.png";
import cloth2 from "./assets/clothing 2.png";
import cloth3 from "./assets/clothing 3.png";
import cloth4 from "./assets/clothing 4.png";
import cloth5 from "./assets/clothing 5.png";
import cloth6 from "./assets/clothing 6.png";
import cloth7 from "./assets/clothing 7.png";
import cloth8 from "./assets/clothing 8.png";
import cloth9 from "./assets/clothing 9.png";
import shoe1 from "./assets/shoe1.png"



export const products = [
  {
    id: 1,
    name: "The north coat",
    image: coat,
    currentPrice: 260,
    originalPrice: 360,
    rating: 5,
    reviews: 65,
    category: "Men's Fashion",
    subCategory: "Clothing", // Matches exactly with categoryData
  },
  {
    id: 2,
    name: "Gucci duffle bag",
    image: buffledog,
    currentPrice: 960,
    originalPrice: 1160,
    rating: 4,
    reviews: 65,
    category: "Men's Fashion",
    subCategory: "Bags", // Matches exactly with categoryData
  },
  {
    id: 3,
    name: "Small BookSelf",
    image: bookshelf,
    currentPrice: 360,
    originalPrice: null,
    rating: 5,
    reviews: 65,
    category: "Home & Lifestyle",
    subCategory: "Furniture", // Matches exactly with categoryData
  },
  {
    id: 4,
    name: "All Black Formal Set",
    image: cloth1,
    currentPrice: 260,
    originalPrice: 360,
    rating: 5,
    reviews: 65,
    category: "Woman's Fashion",
    subCategory: "Clothing",
  },
  {
    id: 5,
    name: "Blue Embroidered Kurta Set",
    image: cloth2,
    currentPrice: 960,
    originalPrice: 1160,
    rating: 4.5,
    reviews: 65,
    category: "Woman's Fashion", // Note the exact match
    subCategory: "Clothing",
  },
  {
    id: 6,
    name: "Aqua Blue  Cotton  Gown With Dupatta",
    image: cloth3,
    currentPrice: 360,
    originalPrice: null,
    rating: 5,
    reviews: 65,
    category: "Woman's Fashion",
    subCategory: "Clothing",
  },
  {
    id: 7,
    name: "Light Blue Puff Sleeve Top",
    image: cloth4,
    currentPrice: 260,
    originalPrice: 360,
    rating: 5,
    reviews: 65,
    category: "Woman's Fashion",
    subCategory: "Clothing",
  },
  {
    id: 8,
    name: "Beige Button Collar Sweater",
    image: cloth5,
    currentPrice: 960,
    originalPrice: 1160,
    rating: 4.5,
    reviews: 65,
    category: "Woman's Fashion",
    subCategory: "Clothing",
  },
  {
    id: 9,
    name: "White Crop Top with Navy Skirt Set",
    image: cloth6,
    currentPrice: 360,
    originalPrice: null,
    rating: 5,
    reviews: 65,
    category: "Woman's Fashion",
    subCategory: "Clothing",
  },
  {
    id: 10,
    name: "Pastel Swirl Mini Dress",
    image: cloth7,
    currentPrice: 360,
    originalPrice: null,
    rating: 5,
    reviews: 65,
    category: "Woman's Fashion",
    subCategory: "Clothing",
  },
  {
    id: 11,
    name: "Floral Summer Midi Dress",
    image: cloth8,
    currentPrice: 360,
    originalPrice: null,
    rating: 5,
    reviews: 65,
    category: "Woman's Fashion",
    subCategory: "Clothing",
  },
  {
    id: 12,
    name: "Blue Paisley Slip Dress",
    image: cloth9,
    currentPrice: 360,
    originalPrice: null,
    rating: 5,
    reviews: 65,
    category: "Woman's Fashion",
    subCategory: "Clothing",
  },
  {
    id: 13,
    name: "Black shoe",
    image: shoe1,
    currentPrice: 360,
    originalPrice: null,
    rating: 5,
    reviews: 65,
    category: "Men's Fashion",
    subCategory: "Shoes",
  },

];


