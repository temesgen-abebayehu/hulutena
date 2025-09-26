import React from "react";
import {
  FaHeartbeat,
  FaUsers,
  FaHandsHelping,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20 px-6 text-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            {t.aboutTitle}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">{t.aboutDesc}</p>
        </div>
      </div>

      {/* Our Mission and Vision */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300">
            <FaHeartbeat className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-3xl font-bold mb-2">{t.ourMission}</h2>
            <p className="text-lg">{t.missionDesc}</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300">
            <FaHandsHelping className="text-6xl text-green-500 mb-4" />
            <h2 className="text-3xl font-bold mb-2">{t.ourVision}</h2>
            <p className="text-lg">{t.visionDesc}</p>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">{t.ourTeam}</h2>
          <p className="text-lg max-w-3xl mx-auto mb-12">{t.teamDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md transform hover:-translate-y-2 transition-transform duration-300">
              <img
                src="/doctor1.jpg"
                alt="Dr. Sebsibeh Wikachew"
                className="h-48 w-48 rounded-full object-cover mx-auto mb-4 border-4 border-blue-500"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                Dr. Sebsibeh Wikachew
              </h3>
              <p className="text-blue-600 font-semibold">{t.cardiologist}</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md transform hover:-translate-y-2 transition-transform duration-300">
              <img
                src="/doctor2.jpg"
                alt="Dr. Yeshiwork Alemayehu"
                className="h-48 w-48 rounded-full object-cover mx-auto mb-4 border-4 border-green-500"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                Dr. Yeshiwork Alemayehu
              </h3>
              <p className="text-green-600 font-semibold">{t.dermatologist}</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md transform hover:-translate-y-2 transition-transform duration-300">
              <img
                src="/doctor3.jpg"
                alt="Dr. Yohannes Tadesse"
                className="h-48 w-48 rounded-full object-cover mx-auto mb-4 border-4 border-teal-500"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                Dr. Yohannes Tadesse
              </h3>
              <p className="text-teal-600 font-semibold">{t.pediatrician}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">{t.ourValuesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div className="flex flex-col items-center p-6">
              <h3 className="text-2xl font-bold mb-2">
                {t.valuePatientCenteredCareTitle}
              </h3>
              <p className="text-lg">{t.valuePatientCenteredCareDesc}</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <h3 className="text-2xl font-bold mb-2">
                {t.valueInnovationTitle}
              </h3>
              <p className="text-lg">{t.valueInnovationDesc}</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <h3 className="text-2xl font-bold mb-2">
                {t.valueIntegrityTitle}
              </h3>
              <p className="text-lg">{t.valueIntegrityDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;