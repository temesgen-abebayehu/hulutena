import React from "react";
import {
  FaHeartbeat,
  FaUsers,
  FaHandsHelping,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function AboutPage() {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          About HuluTena Healthcare
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We are dedicated to providing accessible, high-quality healthcare
          services to everyone, anytime, anywhere. Our mission is to make
          healthcare seamless and patient-centric.
        </p>
      </div>

      {/* Mission Section */}
      <div className="w-full max-w-6xl mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaHeartbeat className="mr-2 text-blue-600" />
            Our Mission
          </h2>
          <p className="text-gray-600">
            At HuluTena Healthcare, our mission is to revolutionize healthcare
            delivery by leveraging technology to connect patients with top-tier
            medical professionals. We aim to provide affordable, convenient, and
            personalized care to improve the health and well-being of our
            community.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full max-w-6xl mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaUsers className="mr-2 text-blue-600" />
            Meet Our Team
          </h2>
          <p className="text-gray-600 mb-6">
            Our team consists of passionate healthcare professionals, developers,
            and support staff who are committed to making a difference in the
            lives of our patients.
          </p>
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
              <p className="text-gray-600">Cardiologist</p>
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
              <p className="text-gray-600">Dermatologist</p>
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
              <p className="text-gray-600">Pediatrician</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="w-full max-w-6xl mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaHandsHelping className="mr-2 text-blue-600" />
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Patient-Centered Care
              </h3>
              <p className="text-gray-600">
                We prioritize the needs and well-being of our patients in every
                decision we make.
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We embrace technology to deliver cutting-edge healthcare
                solutions.
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Integrity
              </h3>
              <p className="text-gray-600">
                We uphold the highest standards of honesty and transparency in
                all our interactions.
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
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="flex flex-col items-center text-center">
              <FaPhoneAlt className="text-blue-600 text-2xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+251 912 345 678</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center text-center">
              <FaEnvelope className="text-blue-600 text-2xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">info@hulutenahealthcare.com</p>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center text-center">
              <FaMapMarkerAlt className="text-blue-600 text-2xl mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">Address</h3>
              <p className="text-gray-600">
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;