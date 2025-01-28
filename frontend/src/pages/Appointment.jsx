import React, { useState } from "react";
import Payment from "../components/Payment";

function Appointment() {
  const appointment = {
    id: 1,
    doctorId: 1,
    name: "Bogale Mebratu",
    languages: ["English", "Amharic"],
    availability: "Online",
    specialty: "Cardiologist",
    imgSrc: "/doctor2.jpg",
    price: 100,
    availableDates: ["2022-10-10 10:00 am", "2022-10-11 8:00 am", "2022-10-12 9:00 am"],
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [goToPayment, setGoToPayment] = useState(false);

  const handleAppointmentBooking = () => {
    if (!selectedDate) {
      setConfirmationMessage("Please select a date before proceeding to payment.");
      return;
    }
    setConfirmationMessage(`Appointment booked successfully for ${selectedDate}`);
    setGoToPayment(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {!goToPayment ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <div className="flex items-center mb-6">
            <img
              src={appointment.imgSrc}
              alt={appointment.name}
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div>
              <h1 className="text-xl font-semibold text-blue-800">{appointment.name}</h1>
              <p className="text-gray-600">{appointment.specialty}</p>
              <p className="text-gray-500">Languages: {appointment.languages.join(", ")}</p>
              <p className="text-gray-500">Availability: {appointment.availability}</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Select Appointment Date</h2>
            <ul className="space-y-2 mt-4">
              {appointment.availableDates.map((date, index) => (
                <li key={index}>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="appointmentDate"
                      value={date}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="mr-2"
                    />
                    {date}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-gray-700">Price: ${appointment.price}</p>
            <button
              onClick={handleAppointmentBooking}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          </div>
          {confirmationMessage && (
            <div
              className={`p-4 rounded-md ${
                confirmationMessage.includes("successfully")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {confirmationMessage}
            </div>
          )}
        </div>
      ) : (
        <Payment appointmentDetails={{ ...appointment, selectedDate }} />
      )}
    </div>
  );
}

export default Appointment;
