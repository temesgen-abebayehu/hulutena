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
        <div className="flex flex-col items-center p-12 bg-gray-50 min-h-screen">
            {selectedDoctor ? (
                <AppointmentForm
                    doctor={selectedDoctor}
                    onBack={handleBack}
                />
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-6">{t.appointmentTitle}</h1>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <p className="text-center col-span-full">{t.noDoctorsFound}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default AppointmentPage;