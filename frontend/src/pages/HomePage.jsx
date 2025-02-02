import React from "react";
import {
  FaCalendarCheck,
  FaLanguage,
  FaInfoCircle,
  FaBook,
  FaHeadphones,
  FaVideo,
} from "react-icons/fa";

function HomePage() {
  return (
    <div>
      {/* home first page */}
      <div className="home-page text-slate-50">
        <h1 className="p-4  font-extrabold text-4xl md:text-5xl lg:text-6xl">
          እንኳን ወደ ሁሉጤና በሰላም መጡ!
        </h1>
        <h1 className="p-4  font-extrabold text-3xl md:text-4xl lg:text-5xl">ሁሌም ለእርስዎ ጤና</h1>
        <h1 className="p-4 font-extrabold text-3xl md:text-4xl lg:text-5xl">እንተጋለን!</h1>
        <a href="/appointment" className="bg-blue-800 p-2 rounded-lg font-bold text-2xl md:text-3xl">
          ቀጠሮ ያስይዙ
        </a>
      </div>
      {/* our service */}
      <div className="flex flex-row flex-wrap justify-center gap-x-20 gap-y-2  p-8">
        <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2">
          <FaCalendarCheck size={40} className="text-blue-500  mx-auto" />
          <h1 className="text-xl font-semibold">
            Book Appointments Effortlessly
          </h1>
          <p>
            Schedule appointments with trusted doctors at your convenience,
            whether through video calls or over the phone. We prioritize your
            health and ensure you connect with the right physician seamlessly.
          </p>
        </div>
        <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2">
          <FaLanguage size={60} className="text-blue-500 mx-auto" />
          <h1 className="text-xl font-semibold">
            Multilingual Specialist Search
          </h1>
          <p>
            Search for healthcare specialists based on language and specialty to
            guarantee effective communication. Our platform helps break down
            language barriers, ensuring everyone feels understood.
          </p>
        </div>
        <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2">
          <FaInfoCircle size={40} className="text-blue-500 mx-auto" />
          <h1 className="text-xl font-semibold">
            Accessible Health Information
          </h1>
          <p>
            We provide health information in various formats, including text,
            audio, and video. This ensures that everyone can comprehend and
            manage their health effectively.
          </p>
        </div>
      </div>
      {/* resource */}
      <div className="flex flex-col items-center p-12 bg-gray-50 min-h-screen">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-8">
          Healthcare Resources
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mb-12">
          Explore our comprehensive library of healthcare resources, including
          audio guides, videos, and written materials, designed to empower you
          with knowledge and support your well-being.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Audio Resources */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
            <FaHeadphones className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Audio Resources
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Listen to expert advice, health tips, and guided exercises to
              enhance your well-being.
            </p>
            <a href="resourses"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"              
            >
              Explore Audio
            </a>
          </div>

          {/* Video Resources */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
            <FaVideo className="text-4xl text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Video Resources
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Watch informative videos and tutorials from healthcare
              professionals.
            </p>
            <a  href="resourses" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Explore Videos
            </a>
          </div>

          {/* Written Resources */}
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
            <FaBook className="text-4xl text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Written Resources
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Access detailed articles, guides, and eBooks on a variety of
              health topics.
            </p>
            <a  href="resourses" className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
              Explore Articles
            </a>
          </div>
        </div>
      </div>
      {/* testimony */}
      <div className="flex flex-col gap-y-12 bg-cyan-50 p-8 md:px-20 lg:px-32">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-4">
          What Our Users Say!
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
          Discover how HuluTena has positively impacted the lives of our users
          through their heartfelt testimonials.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-white shadow-lg">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="/patient3.jpg"
              alt="Patient testimonial 1"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              A Lifesaver in Times of Need
            </h2>
            <p className="text-gray-600 text-center">
              I was able to connect with a doctor during a critical time when I
              needed medical advice urgently. The process was smooth, and the
              doctor was incredibly understanding.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-white shadow-lg">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="/patient1.jpg"
              alt="Patient testimonial 2"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              Understanding Healthcare Better
            </h2>
            <p className="text-gray-600 text-center">
              HuluTena's accessible health information helped me grasp my health
              conditions better. The audio and video formats were particularly
              useful for me.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-white shadow-lg">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="/patient2.jpg"
              alt="Patient testimonial 3"
            />
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              Breaking Language Barriers
            </h2>
            <p className="text-gray-600 text-center">
              As a non-native speaker, finding a doctor who spoke my language
              was a challenge until I found HuluTena. The platform made it easy
              for me to get the help I needed.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8  p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-700">
          Join the HuluTena Community
        </h1>
        <p className="font-medium">
          Take the first step towards easier healthcare access by downloading
          the HuluTena app today.
        </p>
        <div className="flex flex-row flex-wrap gap-x-20 gap-y-2  p-4">
          <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2 border-4 border-gray-400">
            <h1 className="text-xl font-semibold">Download Our App</h1>
            <p>
              Available on both iOS and Android, downloading the HuluTena app is
              quick and easy. Start your journey towards better healthcare
              access today and enjoy the convenience of scheduling appointments
              at your fingertips.
            </p>
            <a
              href="#"
              className="text-blue-800 font-medium hover:underline hover:text-blue-600"
            >
              Download App
            </a>
          </div>
          <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2 border-4 border-gray-400">
            <h1 className="text-xl font-semibold">Explore Our Features</h1>
            <p>
              Once you download the app, take some time to explore its many
              features. From booking appointments to accessing health
              information in various formats, you'll find everything you need to
              manage your health effectively
            </p>
            <a
               href="resourses"
              className="text-blue-800 font-medium hover:underline hover:text-blue-600"
            >
              See Resources
            </a>
          </div>
          <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2 border-4 border-gray-400">
            <h1 className="text-xl font-semibold">
              Connect with Professionals
            </h1>
            <p>
              Our platform connects you with trusted healthcare professionals
              who are ready to assist you. Whether it's a quick consultation or
              ongoing care, you'll find the right support tailored to your
              needs.
            </p>
            <a
              href="/appointment"
              className="text-blue-800 font-medium hover:underline hover:text-blue-600"
            >
              Make an Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
