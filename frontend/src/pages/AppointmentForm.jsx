import React, { useState } from "react";
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaVideo, FaClinicMedical, FaArrowLeft } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Payment from "../components/Payment";

function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentType, setAppointmentType] = useState("inperson"); // Default to in-person
  const [selectedTime, setSelectedTime] = useState("");
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For validation errors

  // Generate time slots every 2 hours
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour += 2) {
    timeSlots.push(`${hour}:00 - ${hour + 2}:00`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data before proceeding
    if (!selectedDate || !name || !phone || !email || !selectedTime) {
      setErrorMessage("Please fill out all fields before proceeding.");
      return;
    }
    setErrorMessage(""); // Clear any previous error message
    setProceedToPayment(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-md w-full">
        {proceedToPayment ? (
          <Payment
            appointmentDetails={{
              selectedDate,
              name,
              phone,
              email,
              appointmentType,
              selectedTime,
            }}
            onPaymentComplete={() => setProceedToPayment(false)}
          />
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
            <button
              onClick={() => window.history.back()}
              className="flex flex-row items-center text-blue-600 hover:text-blue-800 mb-4 gap-2"
            >
              <FaArrowLeft />
              <p>Back to Appointment list</p>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
              <FaCalendarAlt className="mr-2" />
              Book an Appointment
            </h2>

            {/* Display Error Message */}
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* Date Picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                <FaCalendarAlt className="inline mr-2" />
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full p-2 border rounded"
                minDate={new Date()}
                placeholderText="Select a date"
                required
              />
            </div>

            {/* Patient Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                <FaUser className="inline mr-2" />
                Patient Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                <FaEnvelope className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Appointment Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Appointment Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="inperson"
                    checked={appointmentType === "inperson"}
                    onChange={() => setAppointmentType("inperson")}
                    className="mr-2"
                    required
                  />
                  <FaClinicMedical className="inline mr-2" />
                  In-Person
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="online"
                    checked={appointmentType === "online"}
                    onChange={() => setAppointmentType("online")}
                    className="mr-2"
                    required
                  />
                  <FaVideo className="inline mr-2" />
                  Online
                </label>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Select Time Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="" disabled>
                  Choose a time
                </option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AppointmentForm;