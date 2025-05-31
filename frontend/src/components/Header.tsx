import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center">My ToDo App</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <Link
            to="/"
            className="text-lg font-medium hover:text-blue-400 hover:underline transition-colors"
          >
            Home
          </Link>
          <Link
            to="add"
            className="text-lg font-medium hover:text-blue-400 hover:underline transition-colors ml-4"
          >
            Add
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none cursor-pointer"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-10 pb-4">
          <Link
            to="/"
            className="block py-2 text-lg font-medium hover:text-blue-400 hover:underline transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="add"
            className="block py-2 text-lg font-medium hover:text-blue-400 hover:underline transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Add
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
