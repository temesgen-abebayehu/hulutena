import React, { useState, useEffect, useMemo } from "react";
import DoctorCard from "../components/appointments/DoctorCard";
import AppointmentForm from "../components/appointments/AppointmentForm";
import { useLanguage } from "../context/LanguageContext";

function AppointmentPage() {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [error, setError] = useState(null);
    const { t } = useLanguage();

    // Fetch doctors on component mount
    useEffect(() => {
        const fetchDoctors = async () => {
            setError(null);
            try {
                const response = await fetch("/api/doctors");
                if (!response.ok) throw new Error("Failed to fetch doctors.");
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setError("Failed to fetch doctors. Please try again later.");
            }
        };

        fetchDoctors();
    }, []);

    // Select a doctor for booking
    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
    };

    // Go back to doctor selection
    const handleBack = () => {
        setSelectedDoctor(null);
    };

    // Filtered doctors based on search term and online status
    const filteredDoctors = useMemo(() => {
        return doctors.filter((doctor) => {
            if (!doctor) return false;

            const specialization = Array.isArray(doctor.specialization)
                ? doctor.specialization.join(", ").toLowerCase()
                : doctor.specialization?.toLowerCase() || "";

            return (
                (doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    specialization.includes(searchTerm.toLowerCase()) ||
                    doctor.language?.some((lang) => lang.toLowerCase().includes(searchTerm.toLowerCase()))) &&
                doctor.onlineStatus === true
            );
        });
    }, [doctors, searchTerm]);

    return (
        <div className="bg-gray-50 min-h-screen">
            {selectedDoctor ? (
                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    <AppointmentForm doctor={selectedDoctor} onBack={handleBack} />
                </div>
            ) : (
                <>
                    {/* Hero Section */}
                    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center shadow-xl">
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="relative z-10">
                            <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                                {t.appointmentTitle}
                            </h1>
                            <p className="text-xl max-w-3xl mx-auto">
                                {t.appointmentPageDescription}
                            </p>
                        </div>
                    </div>

                    {/* Search and Doctors Grid */}
                    <div className="py-16 px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="mb-12 max-w-2xl mx-auto">
                                <input
                                    type="text"
                                    placeholder={t.searchPlaceholder}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-full shadow-md focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-300"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg text-center mb-8">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {filteredDoctors.length > 0 ? (
                                    filteredDoctors.map((doctor) => (
                                        <DoctorCard
                                            key={doctor._id}
                                            doctor={doctor}
                                            onBookAppointment={handleBookAppointment}
                                            t={t}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-12">
                                        <p className="text-2xl text-gray-500">
                                            {t.noDoctorsFound}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AppointmentPage;