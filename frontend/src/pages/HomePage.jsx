import React from "react";
import {
  FaCalendarCheck,
  FaLanguage,
  FaInfoCircle,
  FaBook,
  FaHeadphones,
  FaVideo,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function HomePage() {
  const { t } = useLanguage();

  return (
    <div>
      {/* home first page */}
      <div className="home-page text-slate-50">
        <div className="bg-black bg-opacity-50 p-10 rounded-lg">
          <h1 className="p-4 font-extrabold text-4xl md:text-5xl lg:text-6xl">
            {t.welcome}
          </h1>
          <h1 className="p-4 font-extrabold text-3xl md:text-4xl lg:text-5xl">
            {t.subtitle}
          </h1>
          <h1 className="p-4 font-extrabold text-3xl md:text-4xl lg:text-5xl">
            {t.commitment}
          </h1>
          <a
            href="/appointment"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg text-2xl md:text-3xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            {t.bookAppointment}
          </a>
        </div>
      </div>
      {/* our service */}
      <div className="flex flex-row flex-wrap justify-center gap-x-20 gap-y-2  p-8">
        <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2">
          <FaCalendarCheck size={40} className="text-blue-500  mx-auto" />
          <h1 className="text-xl font-semibold">
            {t.effortlessAppointments}
          </h1>
          <p>
            {t.effortlessAppointmentsDesc}
          </p>
        </div>
        <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2">
          <FaLanguage size={60} className="text-blue-500 mx-auto" />
          <h1 className="text-xl font-semibold">
            {t.multilingualSearch}
          </h1>
          <p>
            {t.multilingualSearchDesc}
          </p>
        </div>
        <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2">
          <FaInfoCircle size={40} className="text-blue-500 mx-auto" />
          <h1 className="text-xl font-semibold">
            {t.accessibleInfo}
          </h1>
          <p>
            {t.accessibleInfoDesc}
          </p>
        </div>
      </div>
      {/* resource */}
      <div className="flex flex-col items-center p-12 bg-gray-50 min-h-screen">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-8">
          {t.healthcareResources}
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mb-12">
          {t.resourcesDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Audio Resources */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
            <FaHeadphones className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {t.audioResources}
            </h2>
            <p className="text-gray-600 text-center mb-4">
              {t.audioResourcesDesc}
            </p>
            <a
              href="resources"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {t.exploreAudio}
            </a>
          </div>

          {/* Video Resources */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
            <FaVideo className="text-4xl text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {t.videoResources}
            </h2>
            <p className="text-gray-600 text-center mb-4">
              {t.videoResourcesDesc}
            </p>
            <a
              href="resources"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              {t.exploreVideos}
            </a>
          </div>

          {/* Written Resources */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
            <FaBook className="text-4xl text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {t.writtenResources}
            </h2>
            <p className="text-gray-600 text-center mb-4">
              {t.writtenResourcesDesc}
            </p>
            <a
              href="resources"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              {t.exploreArticles}
            </a>
          </div>
        </div>
      </div>
      {/* testimony */}
      <div className="flex flex-col gap-y-12 bg-cyan-50 p-8 md:px-20 lg:px-32">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">
          {t.testimonials}
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
          {t.testimonialsDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-white shadow-lg">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="/patient3.jpg"
              alt="Patient testimonial 1"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {t.lifesaver}
            </h2>
            <p className="text-gray-600 text-center">
              {t.lifesaverDesc}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-white shadow-lg">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="/patient1.jpg"
              alt="Patient testimonial 2"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {t.understandingHealth}
            </h2>
            <p className="text-gray-600 text-center">
              {t.understandingHealthDesc}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-white shadow-lg">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="/patient2.jpg"
              alt="Patient testimonial 3"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {t.breakingBarriers}
            </h2>
            <p className="text-gray-600 text-center">
              {t.breakingBarriersDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8  p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-700">
          {t.joinCommunity}
        </h1>
        <p className="font-medium">
          {t.joinCommunityDesc}
        </p>
        <div className="flex flex-row flex-wrap gap-x-20 gap-y-2  p-4">
          <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2 border-4 border-gray-400">
            <h1 className="text-xl font-semibold">{t.downloadApp}</h1>
            <p>
              {t.downloadAppDesc}
            </p>
            <a
              href="#"
              className="text-blue-800 font-medium hover:underline hover:text-blue-600"
            >
              {t.downloadApp}
            </a>
          </div>
          <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2 border-4 border-gray-400">
            <h1 className="text-xl font-semibold">{t.exploreFeatures}</h1>
            <p>
              {t.exploreFeaturesDesc}
            </p>
            <a
              href="resources"
              className="text-blue-800 font-medium hover:underline hover:text-blue-600"
            >
              {t.resources}
            </a>
          </div>
          <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2 border-4 border-gray-400">
            <h1 className="text-xl font-semibold">
              {t.connectProfessionals}
            </h1>
            <p>
              {t.connectProfessionalsDesc}
            </p>
            <a
              href="/appointment"
              className="text-blue-800 font-medium hover:underline hover:text-blue-600"
            >
              {t.makeAppointment}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
