import React, { useState, useEffect, useMemo } from "react";
import DoctorCard from "../components/DoctorCard";
import AppointmentForm from "../components/AppointmentForm";

function AppointmentPage() {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [error, setError] = useState(null);

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
            <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
                Healthcare Services at Your Fingertips
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
                Discover a range of professional healthcare services designed to meet your needs.
            </p>

            {error && <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">{error}</div>}

            {!selectedDoctor ? (
                <>
                    <div className="w-full max-w-4xl mb-4">
                        <input
                            type="text"
                            placeholder="Search by name, specialty, or language..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <DoctorCard
                                    key={doctor._id}
                                    doctor={doctor}
                                    handleBookAppointment={handleBookAppointment}
                                />
                            ))
                        ) : (
                            <p className="text-gray-600 text-center mt-8">
                                No doctors found matching your criteria.
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <AppointmentForm
                    doctor={selectedDoctor}
                    handleBack={handleBack}
                />
            )}
        </div>
    );
}

export default AppointmentPage;