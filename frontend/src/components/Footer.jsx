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
    <footer className="bg-white border-t border-gray-100 text-gray-700">
      <div className="h-1 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 bg-clip-text text-transparent">Hulu</span>
              <span className="text-gray-900">Tena</span>
            </h2>
            <p className="mt-3 text-sm text-gray-600 max-w-xs">{t.footerDesc}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">{t.quickLinks}</h3>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/", label: t.home },
                { href: "/about", label: t.about },
                { href: "/contact", label: t.contact },
                { href: "/appointment", label: t.appointment },
                { href: "/community", label: t.community },
                { href: "/resources", label: t.resources },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-gray-900 hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">{t.contactUs}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-600" />{t.address}</li>
              <li className="flex items-center gap-2"><FaMailBulk className="text-blue-600" />{t.email}</li>
              <li className="flex items-center gap-2"><FaPhoneAlt className="text-blue-600" />{t.phone}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">{t.followUs}</h3>
            <div className="mt-4 flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-gray-200 hover:border-blue-600 hover:text-blue-600">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-full border border-gray-200 hover:border-pink-600 hover:text-pink-600">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full border border-gray-200 hover:border-blue-700 hover:text-blue-700">
                <FaLinkedin size={20} />
              </a>
              <a href="#" aria-label="Telegram" className="p-2 rounded-full border border-gray-200 hover:border-sky-600 hover:text-sky-600">
                <FaTelegram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-blue-700 font-semibold">HuluTena</span>. All rights reserved.
          </p>
          <div className="mt-3 sm:mt-0 flex items-center gap-4">
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
