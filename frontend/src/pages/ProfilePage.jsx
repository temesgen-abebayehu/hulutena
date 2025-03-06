import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const appointmentsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser).currentUser;
          setUser(userData);

          const response = await fetch(`/api/appointments?createdBy=${userData._id}`);
          if (response.ok) {
            const data = await response.json();

            const appointmentsWithDoctorDetails = await Promise.all(
              data.map(async (appointment) => {
                const doctorResponse = await fetch(`/api/doctors/${appointment.doctor}`);
                if (doctorResponse.ok) {
                  const doctorData = await doctorResponse.json();
                  return { ...appointment, doctor: doctorData };
                } else {
                  throw new Error("Failed to fetch doctor details.");
                }
              })
            );

            const sortedAppointments = appointmentsWithDoctorDetails.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );

            setAppointments(sortedAppointments);
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

  const confirmDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(response.message);
      }

      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatTime = (timeString) => {
    const [startTime, endTime] = timeString.split('-');

    const convertTo12HourFormat = (time) => {
      const [hours, minutes] = time.split(':');
      let period = 'AM';
      let hour = parseInt(hours, 10);

      if (hour >= 12) {
        period = 'PM';
        if (hour > 12) hour -= 12;
      }

      return `${hour}:${minutes} ${period}`;
    };

    const formattedStartTime = convertTo12HourFormat(startTime);
    const formattedEndTime = convertTo12HourFormat(endTime);

    return `${formattedStartTime} - ${formattedEndTime}`;
  };

  const sum = (arr) => arr.reduce((a, b) => a + b, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p>No user data found.</p>;
  }

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
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
              {user.language.length > 0 && user.address && user.specialization.length > 0 ? "Edit Profile" : "Complete Profile"}
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {user.isVerified ? (
              <div className="flex items-center bg-green-100 gap-4 p-4 rounded-lg">
                <FaCheckCircle className="text-green-700" size={25} />
                <p>Verified</p>
              </div>
            ) : (
              <a href="#"
                className="border-red-700 rounded-lg p-4 bg-red-50 hover:underline text-red-700"
              >
                <FaInfoCircle className="inline-block mr-2" />
                {user.role === "doctor" ? "Verify Your account to offer service." : "Verify Your account to get In-person service."}
              </a>
            )}
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
              <label className="text-sm text-gray-500">Gender</label>
              <p className="text-lg font-semibold">{user.gender}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Contact Number</label>
              <p className="text-lg font-semibold">{user.contactNumber}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Address</label>
              <p className="text-lg font-semibold">{user.address}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Date of Birth</label>
              <p className="text-lg font-semibold">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString(): ''}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Spoken Language</label>
              <p className="text-lg font-semibold">{user.language.join(', ')}</p>
            </div>
            {user.role === "doctor" && (
              <div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">Specialization</label>
                  <p className="text-lg font-semibold">{user.specialization.join(', ')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">Availability</label>
                  <p className="text-lg font-semibold">{user.availability}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">Rating</label>
                  <p className="text-lg font-semibold">{sum(user.rating) / user.rating.length}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">Experience</label>
                  <p className="text-lg font-semibold">{user.experience}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">Number Of Services You Offered</label>
                  <p className="text-lg font-semibold">{user.numberOfServices}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-500">Number Of Appointments You Have</label>
                  <p className="text-lg font-semibold">{appointments.length}</p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={confirmDelete}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Delete Account
          </button>
        </div>
        <DeleteConfirmationModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
          message="Are you sure you want to delete your account? This action looses all your data and cannot access again."
        />

        <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointments</h2>
          <div className="space-y-4">
            {currentAppointments.length > 0 ? (
              currentAppointments.map((appointment) => (
                <a
                  key={appointment._id}
                  href={`/appointment/${appointment._id}`}
                  className="block bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  <p className="text-lg font-semibold">
                    Patient: {appointment.patientName}
                  </p>
                  <p className="text-slate-800">
                    Doctor: <div className="inline font-medium hover:underline cursor-pointer" onClick={(e) => { e.preventDefault(); navigate(`/doctor-profile/${appointment.doctor._id}`); }}>{appointment.doctor.fullName}</div>
                  </p>
                  <p className="text-sm text-gray-500">
                    Appointment Type: <span className="font-medium">{appointment.appointmentType}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: <span className="font-medium">
                      {formatTime(appointment.time)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Payment Status: <span className="font-medium">{appointment.paymentStatus}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="font-medium">{appointment.status}</span>
                  </p>
                </a>
              ))
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(appointments.length / appointmentsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;