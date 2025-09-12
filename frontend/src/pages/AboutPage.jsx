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
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          {t.aboutTitle}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.aboutDesc}
        </p>
      </div>

      {/* Our Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mb-12">
        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
          <FaHeartbeat className="text-5xl text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {t.ourMission}
          </h2>
          <p className="text-gray-600 text-center">{t.missionDesc}</p>
        </div>
        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
          <FaHandsHelping className="text-5xl text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {t.ourVision}
          </h2>
          <p className="text-gray-600 text-center">{t.visionDesc}</p>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.ourTeam}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {t.teamDesc}
        </p>
      </div>
      <div className="w-full max-w-6xl mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/doctor1.jpg"
                alt="Dr. Sebsibeh Wikachew"
                className="h-40 w-40 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Dr. Sebsibeh Wikachew
              </h3>
              <p className="text-gray-600">{t.cardiologist}</p>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/doctor2.jpg"
                alt="Dr. Yeshiwork Alemayehu"
                className="h-40 w-40 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Dr. Yeshiwork Alemayehu
              </h3>
              <p className="text-gray-600">{t.dermatologist}</p>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/doctor3.jpg"
                alt="Dr. Yohannes Tadesse"
                className="h-40 w-40 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Dr. Yohannes Tadesse
              </h3>
              <p className="text-gray-600">{t.pediatrician}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="w-full max-w-6xl mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaHandsHelping className="mr-2 text-blue-600" />
            {t.ourValuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t.valuePatientCenteredCareTitle}
              </h3>
              <p className="text-gray-600">
                {t.valuePatientCenteredCareDesc}
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t.valueInnovationTitle}
              </h3>
              <p className="text-gray-600">
                {t.valueInnovationDesc}
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t.valueIntegrityTitle}
              </h3>
              <p className="text-gray-600">
                {t.valueIntegrityDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-6xl mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaPhoneAlt className="mr-2 text-blue-600" />
            {t.contactTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="flex flex-col items-center text-center">
              <FaPhoneAlt className="text-blue-600 text-2xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">{t.contactPhoneLabel}</h3>
              <p className="text-gray-600">+251 912 345 678</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center">
              <FaEnvelope className="text-blue-600 text-2xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">{t.contactEmailLabel}</h3>
              <p className="text-gray-600">info@hulutenahealthcare.com</p>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center text-center">
              <FaMapMarkerAlt className="text-blue-600 text-2xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">{t.contactAddressLabel}</h3>
              <p className="text-gray-600">Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;