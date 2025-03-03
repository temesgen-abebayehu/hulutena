import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaComments,
  FaStar,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaLanguage,
  FaBriefcase,
  FaClock,
  FaStethoscope,
  FaServicestack,
} from "react-icons/fa";
import ChatWithDoctor from "../components/ChatWithDoctor";

function Profile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);

  // Fetch logged-in user data
  const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).currentUser._id : null;

  // Fetch doctor data
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${id}`);
        if (!response.ok) throw new Error("Failed to fetch doctor data.");
        const data = await response.json();
        setDoctor(data);
        setRating(data.rating.reduce((acc, curr) => acc + curr, 0) / data.rating.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>No doctor found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-2 relative">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:space-x-6">
          <div className="overflow-hidden rounded-full h-60 w-60">
            <img
              className="object-cover h-full w-full"
              src={doctor.profileImage}
              alt="doctor profile"
            />
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h2 className="flex flex-row items-center gap-2 text-2xl font-semibold text-blue-900">
              {doctor.fullName} <FaCheckCircle color="green" size={16} />
            </h2>
            <p className="text-lg text-gray-700">{doctor.specialization.join(', ')}</p>
            <div className="flex flex-row items-center gap-2 mt-2 font-semibold">
              <p className="text-yellow-500">{rating}</p>
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="relative w-5 h-5">
                  <FaStar className="absolute top-0 left-0 text-slate-200" />
                  <FaStar
                    className="absolute top-0 left-0 text-yellow-500"
                    style={{
                      clipPath:
                        rating >= index - 0.5 && rating < index
                          ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                          : rating >= index
                          ? "none"
                          : "polygon(0 0, 0 0, 0 100%, 0 100%)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 text-gray-700 text-lg space-y-2">
          <p>
            <span className="font-semibold">
              <FaMapMarkerAlt className="inline mr-4" />
            </span>
            {doctor.address}
          </p>
          <p>
            <span className="font-semibold">
              <FaLanguage className="inline mr-4" />
            </span>
            {doctor.language.join(", ")}
          </p>
          <p>
            <span className="font-semibold">
              <FaBriefcase className="inline mr-4" />
            </span>
            {doctor.experience} years
          </p>
          <p>
            <span className="font-semibold">
              <FaServicestack className="inline mr-4" />
            </span>
            {doctor.numberOfServices} Services
          </p>
          <p>
            <span className="font-semibold">
              <FaClock className="inline mr-4" />
            </span>
            {doctor.availability}
          </p>
          <p>
            <span className="font-semibold">
              <FaStethoscope className="inline mr-4" />
            </span>
            {doctor.specialization.join(", ")}
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>
          {userId && userId !== doctor._id && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center gap-2"
            >
              <FaComments />
              <span>Chat</span>
            </button>
          )}
        </div>
      </div>

      {isChatOpen && (
        <ChatWithDoctor
          doctorId={id}
          userId={userId}
          doctorName={doctor.fullName}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
}

export default Profile;