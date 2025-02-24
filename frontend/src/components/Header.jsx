import { FaBars, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

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
    <header className="flex flex-row justify-between p-4 shadow-md bg-slate-200 relative">
      <a href="/" className="text-slate-800 font-semibold text-3xl">
        HuluTena
      </a>
      <div className="space-x-4 font-semibold flex flex-row items-center relative">
        <div className="hidden lg:flex lg:flex-row space-x-4">
          <a className="hover:underline hover:text-slate-700" href="/">
            Home
          </a>
          <a className="hover:underline hover:text-slate-700" href="/appointment">
            Appointment
          </a>
          <a className="hover:underline hover:text-slate-700" href="/resources">
            Resources
          </a>
          <a className="hover:underline hover:text-slate-700" href="/community">
            Community
          </a>
          <a className="hover:underline hover:text-slate-700" href="/about">
            About Us
          </a>
          <a className="hover:underline hover:text-slate-700" href="/contact">
            Contact Us
          </a>
        </div>

        {user ? (
          <div className="relative">
            <button onClick={toggleProfileMenu} className="w-10 h-10 rounded-full overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="text-2xl" />
              )}
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2">
                <button
                  onClick={handleProfile}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block text-red-700 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="bg-blue-700 p-1.5 rounded-md text-white text-sm">
            Login/Register
          </a>
        )}

        <button onClick={toggleMenu}>
          <FaBars className="text-2xl lg:hidden" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-64 h-full p-4 shadow-lg flex flex-col space-y-4">
            <button onClick={toggleMenu} className="text-right mb-4 text-2xl font-bold">
              X
            </button>
            <a className="hover:underline hover:text-slate-700" href="/">
              Home
            </a>
            <a className="hover:underline hover:text-slate-700" href="/appointment">
              Appointment
            </a>
            <a className="hover:underline hover:text-slate-700" href="/resources">
              Resources
            </a>
            <a className="hover:underline hover:text-slate-700" href="/community">
              Community
            </a>
            <a className="hover:underline hover:text-slate-700" href="/about">
              About Us
            </a>
            <a className="hover:underline hover:text-slate-700" href="/contact">
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;