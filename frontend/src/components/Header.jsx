import { FaBars } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // For navigation
import { useLanguage } from "../context/LanguageContext";
import LanguageToggleButton from "./LanguageToggleButton";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();
  const { t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  // Get user data from localStorage and parse it
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const profileImage = user?.currentUser.profileImage;

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Include the user's token
        },
      });

      if (response.ok) {
        localStorage.removeItem("user");
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Handle profile navigation
  const handleProfile = () => {
    navigate("/profile"); // Redirect to profile page
    setIsProfileOpen(false); // Close the profile menu
  };

  // Hide on scroll
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 80) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact },
    { href: "/appointment", label: t.appointment },
    { href: "/community", label: t.community },
    { href: "/resources", label: t.resources },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className={`sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-100 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="font-extrabold text-lg sm:text-2xl tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 bg-clip-text text-transparent">Hulu</span>
          <span className="text-gray-900">Tena</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${isActive(item.href)
                  ? "text-gray-900 bg-gray-100"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button onClick={toggleProfileMenu} className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
                <img
                  src={profileImage || "/profile.jpg"}
                  alt="Profile"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow"
                />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    {t.profile}
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-50"
                  >
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a href="/login" className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                {t.login}
              </a>
              <a href="/register" className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800">
                {t.register}
              </a>
            </div>
          )}
          <LanguageToggleButton />
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-full hover:bg-gray-100" aria-label="Open menu">
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur">
          <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg ${isActive(item.href)
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;