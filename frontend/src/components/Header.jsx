import { FaBars } from "react-icons/fa";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showBars = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-row justify-between p-4 shadow-md bg-slate-200">
      <a href="/" className="text-slate-800 font-semibold text-3xl">
        HuluTena
      </a>
      <div className="space-x-4 font-semibold flex flex-row items-center">
        <div className="hidden lg:flex lg:flex-row space-x-4">
          <a className="hover:underline hover:text-slate-700" href="/">
            Home
          </a>
          <a className="hover:underline hover:text-slate-700" href="/appointment">
            Appointment
          </a>
          <a className="hover:underline hover:text-slate-700" href="/resourses">
            Resourses
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
        <a href="/login" className="bg-blue-700 p-1.5 rounded-md text-white text-sm">
          Login/Register
        </a>
        <button onClick={showBars}>
          <FaBars className="text-2xl lg:hidden" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-64 h-full p-4 shadow-lg flex flex-col space-y-4">
            <button
              onClick={showBars}
              className="text-right mb-4 text-2xl font-bold"
            >
              X
            </button>
            <a className="hover:underline hover:text-slate-700" href="/">
              Home
            </a>
            <a className="hover:underline hover:text-slate-700" href="/services">
              Services
            </a>
            <a className="hover:underline hover:text-slate-700" href="/resourses">
              Resourses
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
