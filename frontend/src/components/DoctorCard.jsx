import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaUserMd,
  FaLanguage,
  FaLocationArrow,
  FaStar,
  FaClipboardList,
} from "react-icons/fa";

const DoctorCardItem = ({ doctor, handleBookAppointment }) => {

  return (
    <div className="flex flex-col items-center p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <img
          className="h-40 w-40 rounded-full object-cover"
          src={doctor.profileImage}
          alt={doctor.fullName}
        />
        <div className="flex flex-col items-start gap-2 text-slate-800">
          <h3 className="flex items-center gap-2 text-2xl font-semibold text-blue-900">
            {doctor.fullName}{" "}
            {doctor.isVerified && <FaCheckCircle className="text-green-700" />}
          </h3>
          <p className="text-blue-900">
            <FaUserMd className="inline-block mr-1" /> Specialty:{" "} {doctor.specialization.join(", ")}
          </p>
          <p className="flex items-center">
            <FaLanguage className="mr-1" /> {doctor.language?.join(", ")}
          </p>
          <p className="flex items-center">
            <FaClipboardList className="mr-1" /> {doctor.numberOfServices} Services
          </p>
          <p className="">
            <FaLocationArrow className="inline-block mr-1" />{" "}
            {doctor.rating?.length || 0} Reviews
          </p>
          <div className="flex items-center gap-2 text-yellow-600 font-bold">
            <p>{doctor.avarageRating.toFixed(1)}</p>
            <FaStar />
          </div>
        </div>
      </div>
      <button
        onClick={() => handleBookAppointment(doctor)}
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Book Appointment
      </button>
    </div>
  );
};

DoctorCardItem.propTypes = {
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

const DoctorCard = ({ doctors, handleBookAppointment }) => {
  return (
    <div>
      {doctors.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center">
          {doctors.map((doctor) => (
            <DoctorCardItem
              key={doctor._id}
              doctor={doctor}
              handleBookAppointment={handleBookAppointment}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-8">
          No doctors found matching your criteria.
        </p>
      )}
    </div>
  );
};

DoctorCard.propTypes = {
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleBookAppointment: PropTypes.func.isRequired,
};

export default DoctorCard;