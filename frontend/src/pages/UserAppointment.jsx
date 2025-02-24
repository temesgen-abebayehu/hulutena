import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserAppointment() {
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      setError("Invalid appointment ID.");
      setLoading(false);
    }
  }, [id]);
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/appointments/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAppointment(data);
        } else {
          setError("Failed to fetch appointment details.");
        }
      } catch (err) {
        setError("An error occurred while fetching appointment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });

      if (response.ok) {
        setIsEditing(false); // Exit edit mode
      } else {
        setError("Failed to update appointment.");
      }
    } catch (err) {
      setError("An error occurred while updating the appointment.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!appointment) {
    return <p>No appointment found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Appointment Details</h1>

        {/* Appointment Details */}
        <div className="space-y-4">
          {/* Patient Name */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Patient Name</label>
            {isEditing ? (
              <input
                type="text"
                name="patientName"
                value={appointment.patientName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <p className="text-lg font-semibold">{appointment.patientName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={appointment.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <p className="text-lg font-semibold">{appointment.phoneNumber}</p>
            )}
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={appointment.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <p className="text-lg font-semibold">{appointment.email}</p>
            )}
          </div>

          {/* Appointment Type */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Appointment Type</label>
            {isEditing ? (
              <select
                name="appointmentType"
                value={appointment.appointmentType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="online">Online</option>
                <option value="in-person">In Person</option>
              </select>
            ) : (
              <p className="text-lg font-semibold">{appointment.appointmentType}</p>
            )}
          </div>

          {/* Date */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Date</label>
            {isEditing ? (
              <input
                type="date"
                name="date"
                value={appointment.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <p className="text-lg font-semibold">
                {new Date(appointment.date).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Time */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Time</label>
            {isEditing ? (
              <input
                type="time"
                name="time"
                value={appointment.time}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <p className="text-lg font-semibold">{appointment.time}</p>
            )}
          </div>

          {/* Payment Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Payment Status</label>
            {isEditing ? (
              <select
                name="paymentStatus"
                value={appointment.paymentStatus}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="completed">Completied</option>
                <option value="pending">Pending</option>
              </select>
            ) : (
              <p className="text-lg font-semibold">{appointment.paymentStatus}</p>
            )}
          </div>

          {/* Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Status</label>
            {isEditing ? (
              <select
                name="status"
                value={appointment.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            ) : (
              <p className="text-lg font-semibold">{appointment.status}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Edit Appointment
              </button>
              <button
                onClick={() => navigate(-1)} // Go back to the previous page
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAppointment;