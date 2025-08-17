import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-black">CareerGuide 🧑‍🏫</h1>
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {["Home", "Guidance", "Doubt"].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }}>
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-blue-500 transition-colors duration-300"
              >
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
