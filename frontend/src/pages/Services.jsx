import React, { useState } from "react";
import { FaCheckCircle, FaPhoneAlt, FaStar } from "react-icons/fa";

function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Specialist Doctor 1",
      rating: 4.0,
      languages: ["English", "Spanish"],
      availability: "Online & In-person",
      specialty: "Cardiologist",
      imgSrc: "/doctor2.jpg",
    },
    {
      id: 2,
      name: "Specialist Doctor 2",
      rating: 4.5,
      languages: ["English", "Amharic"],
      availability: "Online Only",
      specialty: "Dermatologist",
      imgSrc: "/doctor2.jpg",
    },
    {
      id: 3,
      name: "Specialist Doctor 3",
      rating: 4.9,
      languages: ["English", "French"],
      availability: "In-person Only",
      specialty: "Pediatrician",
      imgSrc: "/doctor2.jpg",
    },
    // Additional doctor entries can be added here
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.languages.some((lang) =>
          lang.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      (!filterCriteria ||
        doctor.availability
          .toLowerCase()
          .includes(filterCriteria.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col items-center p-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
        Healthcare Services at Your Fingertips
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
        Discover a range of professional healthcare services designed to meet
        your needs, from consultations to specialized care. Our system ensures
        seamless booking and access to top-tier professionals.
      </p>

      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-gray-700 text-center">
          Call us to make an offline appointment
        </h2>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-blue-800 text-center mb-4">
          <FaPhoneAlt /> 1221
        </h1>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-700 text-center">
          Search doctor to make an online appointment
        </h2>
      </div>
      <div className="w-full max-w-4xl mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Search by name, specialty, or language..."
            className="flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
          >
            <option value="">All Availability</option>
            <option value="Online">Online</option>
            <option value="In-person">In-person</option>
          </select>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-medium">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex flex-col items-center p-6 border rounded-lg bg-white shadow-md"
          >
            <img
              className="h-40 w-40 rounded-full object-cover mb-4"
              src={doctor.imgSrc}
              alt={doctor.name}
            />
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              {doctor.name} <FaCheckCircle color="green" size={16} />
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              Specialty: {doctor.specialty}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Languages: {doctor.languages.join(", ")}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Availability: {doctor.availability}
            </p>
            <div className="flex flex-row items-center gap-2">
              <p className="text-sm text-yellow-600 mb-1">{doctor.rating}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="relative w-5 h-5">
                    {/* Gray Star */}
                    <FaStar className="absolute top-0 left-0 text-slate-200" />

                    {/* Yellow Star */}
                    <FaStar
                      className="absolute top-0 left-0 text-yellow-500"
                      style={{
                        clipPath:
                          doctor.rating >= index - 0.5 && doctor.rating < index
                            ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)" // Half-filled
                            : doctor.rating >= index
                            ? "none" // Fully visible
                            : "polygon(0 0, 0 0, 0 100%, 0 100%)", // Hidden
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <a
              className="text-blue-600 hover:underline text-sm mb-3"
              href={`/doctor-profile/${doctor.id}`}
            >
              View Full Profile
            </a>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <p className="text-gray-600 text-center mt-8">
          No doctors found matching your criteria. Please adjust your search or
          filters.
        </p>
      )}
    </div>
  );
}

export default Services;
