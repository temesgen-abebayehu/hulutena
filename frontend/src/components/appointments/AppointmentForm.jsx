import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaVideo,
  FaClinicMedical,
  FaArrowLeft,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function AppointmentForm({ doctor, handleBack }) {
    const [formData, setFormData] = useState({
        selectedDate: null,
        name: "",
        phone: "",
        email: "",
        appointmentType: "in-person",
        selectedTime: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); 

    // Generate time slots from 9 AM to 5 PM in 2-hour intervals
    const timeSlots = [];
    for (let hour = 1; hour < 16; hour += 2) {
        const initial_time = hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`;
        const final_time = hour + 2 < 12 ? `${hour + 2}:00 AM` : hour + 2 === 12 ? "12:00 PM" : `${hour + 2 - 12}:00 PM`;
        timeSlots.push(`${initial_time} - ${final_time}`);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({ ...prev, selectedDate: date }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        const { selectedDate, name, phone, email, selectedTime } = formData;

        // Validate all fields
        if (!selectedDate || !name || !phone || !email || !selectedTime) {
            setErrorMessage("Please fill out all fields before proceeding.");
            setIsSubmitting(false);
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            setIsSubmitting(false);
            return;
        }

        // Validate phone number format (basic validation)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setErrorMessage("Please enter a valid 10-digit phone number.");
            setIsSubmitting(false);
            return;
        }

        // Prepare appointment data
        const appointmentData = {
            doctor: doctor._id,
            date: selectedDate,
            time: selectedTime,
            patientName: name,
            phoneNumber: phone,
            email: email,
            appointmentType: formData.appointmentType,
        };

        try {
            // Call the API to create an appointment
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create appointment.");
            }

            const data = await response.json();

            setErrorMessage("Appointment created successfully!");

            // Navigate to the Payment component with the appointmentId
            navigate("/payment", { state: { appointmentId:data._id, doctor } });
        } catch (error) {
            console.error("Error creating appointment:", error);
            setErrorMessage(error.message || "An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="max-w-md w-full">
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex flex-row items-center text-blue-600 hover:text-blue-800 mb-4 gap-2"
                    >
                        <FaArrowLeft />
                        <p>Back to Appointment list</p>
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
                        <FaCalendarAlt className="mr-2" />
                        Book an Appointment
                    </h2>

                    {errorMessage && (
                        <div className={`mb-4 p-4 rounded-md flex items-center ${errorMessage.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            <FaCheckCircle className="mr-2" />
                            {errorMessage}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            <FaCalendarAlt className="inline mr-2" />
                            Select Date
                        </label>
                        <DatePicker
                            selected={formData.selectedDate}
                            onChange={handleDateChange}
                            className="w-full p-2 border rounded"
                            minDate={new Date()}
                            placeholderText="Select a date"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            <FaUser className="inline mr-2" />
                            Patient Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Abebe Alemu"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            <FaPhone className="inline mr-2" />
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="0901010101"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            <FaEnvelope className="inline mr-2" />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="abc@gmail.com"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Appointment Type
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="appointmentType"
                                    value="in-person"
                                    checked={formData.appointmentType === "in-person"}
                                    onChange={handleChange}
                                    className="mr-2"
                                    required
                                />
                                <FaClinicMedical className="inline mr-2" />
                                In-Person
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="appointmentType"
                                    value="online"
                                    checked={formData.appointmentType === "online"}
                                    onChange={handleChange}
                                    className="mr-2"
                                    required
                                />
                                <FaVideo className="inline mr-2" />
                                Online
                            </label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Select Time Slot
                        </label>
                        <select
                            name="selectedTime"
                            value={formData.selectedTime}
                            onChange={handleChange}
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <FaSpinner className="animate-spin mr-2" />
                                Submitting...
                            </div>
                        ) : (
                            "Proceed to Payment"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AppointmentForm;