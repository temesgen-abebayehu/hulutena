import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user data and appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser).currentUser;
          setUser(userData);

          // Fetch appointments for the user
          const response = await fetch(`/api/appointments?userId=${userData._id}`);
          if (response.ok) {
            const data = await response.json();
            
            // Fetch doctor details for each appointment
            const appointmentsWithDoctorDetails = await Promise.all(
              data.slice(0, 5).map(async (appointment) => {
                const doctorResponse = await fetch(`/api/doctors/${appointment.doctor}`);
                if (doctorResponse.ok) {
                  const doctorData = await doctorResponse.json();
                  return { ...appointment, doctor: doctorData };
                } else {
                  throw new Error("Failed to fetch doctor details.");
                }
              })
            );

            setAppointments(appointmentsWithDoctorDetails);
          } else {
            setError("Failed to fetch appointments.");
          }
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p>No user data found.</p>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <div className="bg-blue-600 p-6 rounded-t-lg">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={user.profileImage || '/profile.png'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleEditProfile}
              className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Full Name</label>
              <p className="text-lg font-semibold">{user.fullName}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Role</label>
              <p className="text-lg font-semibold">{user.role}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Contact Number</label>
              <p className="text-lg font-semibold">{user.contactNumber}</p>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h2>
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <a
                  key={appointment._id}
                  href={`/appointment/${appointment._id}`}
                  className="block bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  <p className="text-lg font-semibold">
                    Patient: {appointment.patientName}
                  </p>
                  <p className="text-slate-800">
                    Doctor: <span className="font-medium hover:underline" onClick={() => navigate(`/doctor-profile/${appointment.doctor._id}`)}>{appointment.doctor.fullName}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Appointment Type: {appointment.appointmentType}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">Time: {appointment.time}</p>
                  <p className="text-sm text-gray-500">
                    Status: {appointment.status}
                  </p>
                </a>
              ))
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;