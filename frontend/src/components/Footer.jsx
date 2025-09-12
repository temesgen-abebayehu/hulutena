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
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-cyan-100 text-black">
      <div className="p-4">
        <div className="flex flex-row flex-wrap justify-center gap-x-40  p-8">
          <div>
            <h1 className="text-slate-600 text-xl font-bold">HuluTena</h1>
            <p className="text-slate-800 text-sm font-semibold w-80">
              {t.footerDesc}
            </p>
          </div>
          <div>
            <h1 className="text-slate-600 text-xl font-bold">
              {t.quickLinks}
            </h1>
            <ul className="text-slate-800 text-sm font-semibold">
              <li>
                <a href="/">{t.home}</a>
              </li>
              <li>
                <a href="/about">{t.about}</a>
              </li>
              <li>
                <a href="/contact">{t.contact}</a>
              </li>
              <li>
                <a href="/appointment">{t.appointment}</a>
              </li>
              <li>
                <a href="/community">{t.community}</a>
              </li>
              <li>
                <a href="/resources">{t.resources}</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-slate-600 text-xl font-bold">
              {t.contactUs}
            </h1>
            <ul className="text-slate-800 text-sm font-semibold">
              <li className="flex items-center gap-x-2">
                <FaMapMarkerAlt />
                <span>{t.address}</span>
              </li>
              <li className="flex items-center gap-x-2">
                <FaMailBulk />
                <span>{t.email}</span>
              </li>
              <li className="flex items-center gap-x-2">
                <FaPhoneAlt />
                <span>{t.phone}</span>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-slate-600 text-xl font-bold">
              {t.followUs}
            </h1>
            <div className="flex gap-x-4">
              <a href="#">
                <FaFacebook size={24} />
              </a>
              <a href="#">
                <FaInstagram size={24} />
              </a>
              <a href="#">
                <FaLinkedin size={24} />
              </a>
              <a href="#">
                <FaTelegram size={24} />
              </a>
            </div>
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
        &copy; 2021{" "}
        <span className="text-blue-600">HuluTena</span>, All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
