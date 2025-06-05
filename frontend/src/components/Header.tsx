import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const css_desktop =
    "text-lg font-medium ml-4 hover:text-blue-400 hover:underline transition-colors";

  const css_mobile =
    "block py-2 text-lg font-medium hover:text-blue-400 hover:underline transition-colors";

  const nav_obj = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "add",
      name: "Add",
    },
    {
      path: "login",
      name: "Login",
    },
    {
      path: "signup",
      name: "Sign up",
    },
    {
      path: "account",
      name: "Account",
    },
  ];

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center">My ToDo App</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          {nav_obj.map((item) => (
            <Link key={item.name} to={item.path} className={css_desktop}>
              {item.name}
            </Link>
          ))}
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
          {nav_obj.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={css_mobile}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
