import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMailBulk,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTelegram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-cyan-100 text-black">
      <div className="p-4">
        <div className="flex flex-row flex-wrap justify-center gap-x-40  p-8">
          <div>
            <h1 className="text-slate-600 text-xl font-bold">HuluTena</h1>
            <p className="text-slate-800 text-sm font-semibold">
              We're Hiring!
            </p>
            <div className="flex flex-row space-x-2 py-8">
              <a href="facebook">
                <FaFacebook color="black" size={30} />
              </a>
              <a href="facebook">
                <FaInstagram color="black" size={30} />
              </a>
              <a href="facebook">
                <FaLinkedin color="black" size={30} />
              </a>
              <a href="facebook">
                <FaTelegram color="black" size={30} />
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-2 font-semibold text-blue-950">
            <a className="hover:underline hover:text-blue-900" href="/">
              Home
            </a>
            <a className="hover:underline hover:text-blue-900" href="/services">
              Services
            </a>
            <a className="hover:underline hover:text-blue-900" href="/resourses">
              Resourses
            </a>
            <a className="hover:underline hover:text-blue-900" href="/community">
              Community
            </a>
            <a className="hover:underline hover:text-blue-900" href="/about">
              About Us
            </a>
            <a className="hover:underline hover:text-blue-900" href="/contact">
              Contact Us
            </a>
          </div>
        </div>
        <hr className="border-t-2 border-gray-400 my-4" />
        <div className="flex justify-center flex-row flex-wrap gap-x-40 px-2">
          <div className="space-y-2 font-semibold text-slate-800 pb-8">
            <h1 className="text-slate-600 text-xl font-bold">Contact Us</h1>
            <p>+251-90752 5280</p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> 1221
            </p>
            <p className="flex items-center gap-2">
              <FaMailBulk /> info@hulutena.com
            </p>
          </div>
          <div className="space-y-2">
            <h1 className="text-slate-600 text-xl font-bold">Address</h1>
            <p className="flex items-center gap-2  font-semibold text-slate-800">
              <FaMapMarkerAlt /> Bole, Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </div>
      <p className="text-center p-4 text-black font-semibold">
        &copy; 2021 <span className="text-blue-600">HuluTena</span>, All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
