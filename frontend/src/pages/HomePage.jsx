import React from "react";
import { FaCalendarCheck, FaLanguage, FaInfoCircle } from "react-icons/fa";

function HomePage() {
  return (
    <div>
      {/* home first page */}
      <div className="home-page">
        <h1 className="p-4  font-extrabold text-3xl text-blue-500">
          እንኳን ወደ ሁሉጤና በሰላም መጡ!
        </h1>
        <h1 className="p-4  font-extrabold text-3xl">ሁሌም ለእርስዎ ጤና</h1>
        <h1 className="p-4 font-extrabold text-3xl">እንተጋለን!</h1>
        <button className="bg-blue-800 p-2 rounded-lg font-bold text-xl">
          ቀጠሮ ያስይዙ
        </button>
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
      {/* testimony */}
      <div className="flex flex-col gap-y-10 bg-cyan-100 p-8 md:px-20 lg">
        <h1 className="text-xl font-bold">What Our Users Say!</h1>
        <p className="font-medium">
          Discover how HuluTena has positively impacted the lives of our users
          through their testimonials.
        </p>
        <div className="w-80 md:w-1/2 space-y-2 rounded-lg p-4 bg-slate-200">
          <img src="/patient3.jpg" alt="pateint 3" />
          <h1 className="text-xl font-semibold">
            A Lifesaver in Times of Need
          </h1>
          <p>
            I was able to connect with a doctor during a critical time when I
            needed medical advice urgently. The process was smooth, and the
            doctor was incredibly understanding.
          </p>
        </div>
        <div className="w-72 md:w-1/2 space-y-2 rounded-lg p-4 ml-auto bg-slate-200">          
          <img src="/patient1.jpg" alt="pateint 1" />
          <h1 className="text-xl font-semibold">
            Understanding Healthcare Better
          </h1>
          <p>
            HuluTena's accessible health information helped me grasp my health
            conditions better. The audio and video formats were particularly
            useful for me.
          </p>
        </div>
        <div className="w-72 md:w-1/2 space-y-2 rounded-lg p-4 bg-slate-200">
          <img src="/patient2.jpg" alt="pateint 2" />
          <h1 className="text-xl font-semibold">Breaking Language Barriers</h1>
          <p>
            As a non-native speaker, finding a doctor who spoke my language was
            a challenge until I found HuluTena. The platform made it easy for me
            to get the help I needed.
          </p>
        </div>
      </div>
      <div className="space-y-8  p-8">
        <h1 className="text-2xl font-bold text-slate-700">Join the HuluTena Community</h1>
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
            <a href="#" className="text-blue-800 font-medium hover:underline hover:text-blue-600">Download App</a>
          </div>
          <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2 border-4 border-gray-400">
            <h1 className="text-xl font-semibold">Explore Our Features</h1>
            <p>
              Once you download the app, take some time to explore its many
              features. From booking appointments to accessing health
              information in various formats, you'll find everything you need to
              manage your health effectively
            </p>
            <a href="#" className="text-blue-800 font-medium hover:underline hover:text-blue-600">See updates</a>
          </div>
          <div className="p-4 w-full md:w-80 bg-slate-200 space-y-2 border-4 border-gray-400">
            <h1 className="text-xl font-semibold">Connect with Professionals</h1>
            <p>
              Our platform connects you with trusted healthcare professionals
              who are ready to assist you. Whether it's a quick consultation or
              ongoing care, you'll find the right support tailored to your
              needs.
            </p>
            <a href="#" className="text-blue-800 font-medium hover:underline hover:text-blue-600">Join Community</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
