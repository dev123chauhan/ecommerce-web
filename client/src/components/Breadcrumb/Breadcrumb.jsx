import { Link } from "react-router-dom";
export default function Breadcrumb() {
  return (
    <nav className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-0 container">
      <ul className="flex space-x-4 text-sm sm:text-base">
        <li><Link to="/">Home</Link></li>
        <li className="font-bold">Shop</li>
      </ul>
    </nav>
  );
}
