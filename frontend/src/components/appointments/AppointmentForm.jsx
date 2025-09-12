import React, { useState } from "react";
import {
    FaCalendarAlt,
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
import { useLanguage } from "../../context/LanguageContext";

function AppointmentForm({ doctor, handleBack }) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        selectedDate: null,
        phone: "",
        email: "",
        appointmentType: "online",
        selectedTime: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const loggedInUser = JSON.parse(localStorage.getItem("user"))?.currentUser || {};

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

        const { selectedDate, phone, email, selectedTime, appointmentType } = formData;

        // Validate all fields
        if (!selectedDate || !selectedTime) {
            setErrorMessage(t.requiredFieldsWarning);
            setIsSubmitting(false);
            return;
        }

        // Prepare appointment data
        const appointmentData = {
            doctor: doctor._id,
            date: selectedDate,
            time: selectedTime,
            phoneNumber: phone || loggedInUser.contactNumber,
            email: email || loggedInUser.email,
            appointmentType: appointmentType,
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
                throw new Error(errorData.message || t.failedToCreateAppointment);
            }

            const data = await response.json();

            setErrorMessage(t.appointmentCreatedSuccess);

            // Navigate to the Payment component with the appointmentId
            navigate("/payment", { state: { appointmentId: data._id, doctor } });
        } catch (error) {
            setErrorMessage(error.message || t.genericErrorTryAgain);
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
                        <p>{t.backToAppointmentList}</p>
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
                        <FaCalendarAlt className="mr-2" />
                        {t.appointmentTitle}
                    </h2>

                    {errorMessage && (
                        <div className={`mb-4 p-4 rounded-md flex items-center ${errorMessage.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            <FaCheckCircle className="mr-2" />
                            {errorMessage}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-blue-900 font-medium mb-2">
                            <FaCalendarAlt className="inline mr-2" />
                            {t.selectDate}
                        </label>
                        <DatePicker
                            selected={formData.selectedDate}
                            onChange={handleDateChange}
                            className="w-full p-2 border rounded"
                            minDate={new Date()}
                            placeholderText={t.selectDate}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-blue-900 font-medium mb-2">
                            <FaPhone className="inline mr-2" />
                            {t.phoneNumberOptional}
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="0901010101"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-blue-900 font-medium mb-2">
                            <FaEnvelope className="inline mr-2" />
                            {t.emailOptional}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="abc@gmail.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-blue-900 font-medium mb-2">
                            {t.appointmentTypeLabel}
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
                                {t.appointmentTypeInPerson}
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
                                {t.appointmentTypeOnline}
                            </label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-blue-900 font-medium mb-2">
                            {t.selectTimeSlot}
                        </label>
                        <select
                            name="selectedTime"
                            value={formData.selectedTime}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="" disabled>
                                {t.chooseTime}
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
                                {t.submitting}
                            </div>
                        ) : (
                            t.proceedToPayment
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AppointmentForm;