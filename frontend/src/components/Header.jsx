import { FaBars, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { useLanguage } from "../context/LanguageContext";
import LanguageToggleButton from "./LanguageToggleButton";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
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

  return (
    <header className="bg-slate-100 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Hulu</span>
          <span className="text-slate-700">Tena</span>
        </h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-4">
          <li>
            <a href="/" className="hover:underline">
              {t.home}
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              {t.about}
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              {t.contact}
            </a>
          </li>
          <li>
            <a href="/appointment" className="hover:underline">
              {t.appointment}
            </a>
          </li>
          <li>
            <a href="/community" className="hover:underline">
              {t.community}
            </a>
          </li>
          <li>
            <a href="/resources" className="hover:underline">
              {t.resources}
            </a>
          </li>
        </ul>

        {/* Profile and Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button onClick={toggleProfileMenu} className="flex items-center">
                <img
                  src={profileImage || "/profile.jpg"}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t.profile}
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {t.login}
              </a>
              <a
                href="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                {t.register}
              </a>
            </>
          )}
          <LanguageToggleButton />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <FaBars className="text-2xl" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-16 right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {t.home}
              </a>
              <a
                href="/about"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {t.about}
              </a>
              <a
                href="/contact"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {t.contact}
              </a>
              <a
                href="/appointment"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {t.appointment}
              </a>
              <a
                href="/community"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {t.community}
              </a>
              <a
                href="/resources"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {t.resources}
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;