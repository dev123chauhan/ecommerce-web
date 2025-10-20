import { Link } from "react-router-dom";
export default function Breadcrumb() {
  return (
    <nav className="pt-6 mb-6">
      <ul className="flex space-x-4 text-sm sm:text-base">
        <li><Link to="/">Home</Link></li>
        <li className="font-bold">Shop</li>
      </ul>
    </nav>
  );
}
