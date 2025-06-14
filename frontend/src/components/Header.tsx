import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { css_desktop, css_mobile } from "../styles/ui";
import { nav_obj } from "../utils/nav";
import { useLogout } from "../hooks/useLogout";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem("access");
  const handleLogout = useLogout();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  function renderLogoutButton(className: string) {
    return (
      <button onClick={handleLogout} className={className}>
        Logout
      </button>
    );
  }

  function pathMatchRoute(route: string) {
    if (route !== "/") {
      const partialRoute = "/" + route;
      return partialRoute === location.pathname;
    }
    return route === location.pathname;
  }

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center">My ToDo App</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          {nav_obj.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`${css_desktop} ${
                pathMatchRoute(item.path)
                  ? "text-blue-400  border-b-3 font-extrabold"
                  : "font-medium"
              }`}
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated && renderLogoutButton(css_desktop)}
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
        <div ref={menuRef} className="md:hidden px-10 pb-4">
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
          {isAuthenticated && renderLogoutButton(css_mobile)}
        </div>
      )}
    </header>
  );
}

export default Header;
