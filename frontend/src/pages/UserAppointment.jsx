import { useState, useEffect } from "react";
import { FaArrowLeft, FaInfoCircle, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

function UserAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Fetch appointment details
  useEffect(() => {
    if (!id) {
      setError("Invalid appointment ID.");
      setLoading(false);
      return;
    }

    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/appointments/${id}`);
        if (!response.ok) throw new Error("Failed to fetch appointment details.");

        const data = await response.json();
        const doctorResponse = await fetch(`/api/doctors/${data.doctor}`);
        if (!doctorResponse.ok) throw new Error("Failed to fetch doctor details.");

        const doctorData = await doctorResponse.json();
        data.doctor = doctorData;

        setAppointment(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching appointment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes to the appointment
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });

      if (!response.ok) throw new Error("Failed to update appointment.");
      setIsEditing(false);
      navigate(-1);
    } catch (err) {
      setError(err.message || "An error occurred while updating the appointment.");
    } finally {
      setShowSaveModal(false);
    }
  };

  // Delete the appointment
  const handleDeleteAppointment = async () => {
    try {
      const response = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete appointment.");
      navigate("/profile");
    } catch (err) {
      setError(err.message || "An error occurred while deleting the appointment.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Navigate to payment page
  const handleNavigateToPayment = () => {
    navigate("/payment", { state: { appointmentId: appointment._id, doctor: appointment.doctor } });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // No appointment found
  if (!appointment) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">No appointment found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Appointment Details</h1>
          {!isEditing && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-red-500 hover:text-red-600 transition duration-300"
            >
              <FaTrash size={24} />
            </button>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <FaInfoCircle className="text-blue-500 mr-2" size={24} />
                <p className="text-lg">Are you sure you want to delete this appointment?</p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleDeleteAppointment}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Confirmation Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <FaInfoCircle className="text-blue-500 mr-2" size={24} />
                <p className="text-lg">Are you sure you want to save changes?</p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

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

          {/* Note */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-500">Note</label>
            {isEditing ? (
              <textarea
                name="notes"
                value={appointment.notes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <p className="text-lg font-semibold">{appointment.notes}</p>
            )}
          </div>

          {/* Payment Status */}
          {!isEditing && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Complete Payment</label>
              {appointment.paymentStatus === "not-paid" ? (
                <button
                  onClick={handleNavigateToPayment}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Go to Payment
                </button>
              ) : (
                <p className="text-lg font-semibold">{appointment.paymentStatus}</p>
              )}
            </div>
          )}

          {/* Status */}
          {!isEditing && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="text-sm text-gray-500">Status</label>
              <p className="text-lg font-semibold">{appointment.status}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={() => setShowSaveModal(true)}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                <FaSave className="mr-2" /> Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              <FaEdit className="mr-2" /> Edit Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAppointment;