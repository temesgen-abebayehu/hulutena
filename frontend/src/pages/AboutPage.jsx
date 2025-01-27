import React from "react";

function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800">About Us</h1>
        <p className="text-lg text-gray-600 mt-4">
          Empowering your health journey through trusted resources, expert guidance, and a supportive community.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg">
          At <span className="font-bold text-blue-800">HuluTena Healthcare Services</span>, our mission is to provide accessible and reliable healthcare resources 
          to help individuals make informed decisions about their health. We aim to bridge the gap between healthcare knowledge 
          and everyday life through audio, video, and written materials curated by experts.
        </p>
      </div>

      {/* Vision Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Vision</h2>
        <p className="text-gray-700 text-lg">
          We envision a world where everyone has access to the tools and information needed to lead healthier, happier lives. 
          By fostering a supportive community and offering high-quality resources, we strive to inspire positive change and 
          promote holistic well-being.
        </p>
      </div>

      {/* Values Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Core Values</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
          <li><span className="font-bold text-blue-800">Accessibility:</span> Ensuring healthcare knowledge is available to everyone, anywhere.</li>
          <li><span className="font-bold text-blue-800">Empowerment:</span> Providing resources to help individuals take control of their health journey.</li>
          <li><span className="font-bold text-blue-800">Community:</span> Building a safe and supportive space for sharing and learning.</li>
          <li><span className="font-bold text-blue-800">Innovation:</span> Continuously improving and adapting to meet the evolving healthcare needs.</li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-12">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Meet Our Team</h2>
        <p className="text-gray-700 text-lg mb-4">
          Our dedicated team of healthcare professionals, educators, and developers work tirelessly to ensure the highest 
          quality of resources and user experience. With expertise in mental health, nutrition, physical well-being, and 
          more, we are committed to supporting you every step of the way.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Join Us Today</h2>
        <p className="text-gray-700 text-lg mb-6">
          Become a part of the HuluTena community and take the next step toward better health. Explore our resources, 
          participate in discussions, and discover a healthier you.
        </p>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default AboutPage;
