import React from "react";
import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaUserMd,
  FaLanguage,
  FaLocationArrow,
  FaStar,
  FaClipboardList,
} from "react-icons/fa";

const DoctorCard = ({ doctor, handleBookAppointment }) => {
  const userData = JSON.parse(localStorage.getItem("user"))?.currentUser;
  const userId = userData ? userData._id : null;

  return (
    <div className="flex flex-col items-center w-full sm:w-80 p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Doctor Image and Verification */}
      <div className="relative">
        <img
          className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-white shadow-md"
          src={doctor.profileImage}
          alt={doctor.fullName}
        />
        {doctor.isVerified && (
          <FaCheckCircle className="absolute bottom-2 right-2 text-green-500 bg-white rounded-full" size={20} />
        )}
      </div>

      {/* Doctor Details */}
      <div className="mt-4 text-center sm:text-left w-full">
        <h3 className="flex items-center justify-center sm:justify-start gap-2 text-xl font-semibold text-blue-900 hover:text-blue-700 hover:underline">
          <a href={`/doctor-profile/${doctor._id}`}>{doctor.fullName}</a>
        </h3>
        <p className="text-blue-900 mt-2">
          <FaUserMd className="inline-block mr-1" /> Specialty:{" "}
          {doctor.specialization.join(", ")}
        </p>
        <p className="flex items-center justify-center sm:justify-start mt-2">
          <FaLanguage className="mr-1" /> {doctor.language?.join(", ")}
        </p>
        <p className="flex items-center justify-center sm:justify-start mt-2">
          <FaClipboardList className="mr-1" /> {doctor.numberOfServices} Services
        </p>
        <p className="flex items-center justify-center sm:justify-start mt-2">
          <FaLocationArrow className="inline-block mr-1" />{" "}
          {doctor.rating?.length || 0} Reviews
        </p>
        <div className="flex items-center justify-center sm:justify-start gap-2 text-yellow-600 font-bold mt-2">
          <p>{doctor.avarageRating.toFixed(1)}</p>
          <FaStar />
        </div>
      </div>

      {/* Book Appointment Button */}
      {userId && userId !== doctor._id && (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => handleBookAppointment(doctor)}
        >
          Book Appointment
        </button>
      )}
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    specialization: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    language: PropTypes.arrayOf(PropTypes.string).isRequired,
    onlineStatus: PropTypes.bool.isRequired,
    numberOfServices: PropTypes.number.isRequired,
    rating: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    ).isRequired,
    avarageRating: PropTypes.number.isRequired,
    isVerified: PropTypes.bool,
  }).isRequired,
  handleBookAppointment: PropTypes.func.isRequired,
};

export default DoctorCard;