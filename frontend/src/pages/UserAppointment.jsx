import { useState, useEffect } from "react";
import { FaArrowLeft, FaInfoCircle, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import SaveConfirmationModal from "../components/SaveConfirmationModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useLanguage } from "../context/LanguageContext";

function UserAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Fetch appointment details
  useEffect(() => {
    if (!id) {
      setError(t.invalidAppointmentId);
      setLoading(false);
      return;
    }

    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/appointments/${id}`);
        if (!response.ok) throw new Error(t.failedToFetchAppointment);

        const data = await response.json();
        const doctorResponse = await fetch(`/api/doctors/${data.doctor}`);
        if (!doctorResponse.ok) throw new Error(t.failedToFetchDoctor);

        const doctorData = await doctorResponse.json();
        data.doctor = doctorData;

        setAppointment(data);
      } catch (err) {
        setError(err.message || t.errorFetching);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, t]);

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

      if (!response.ok) throw new Error(t.errorUpdating);
      setIsEditing(false);
      navigate(-1);
    } catch (err) {
      setError(err.message || t.errorUpdating);
    } finally {
      setShowSaveModal(false);
    }
  };

  // Delete the appointment
  const handleDeleteAppointment = async () => {
    try {
      const response = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(t.errorDeleting);
      navigate("/profile");
    } catch (err) {
      setError(err.message || t.errorDeleting);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Navigate to payment page
  const handleNavigateToPayment = () => {
    navigate("/payment", { state: { appointmentId: appointment._id, doctor: appointment.doctor } });
  };

  const statusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return t.statusConfirmed;
      case 'pending': return t.statusPending;
      case 'paid': return t.statusPaid;
      case 'cancelled': return t.statusCancelled;
      default: return status || '';
    }
  };

  const typeLabel = (type) => {
    switch (type) {
      case 'in-person': return t.appointmentTypeInPerson;
      case 'online': return t.appointmentTypeOnline;
      default: return type || '';
    }
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
      <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
        <FaInfoCircle className="text-4xl mb-4" />
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          {t.goBack}
        </button>
      </div>
    );
  }

  // No appointment found
  if (!appointment) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <FaInfoCircle className="text-4xl mb-4 text-gray-500" />
        <p className="text-gray-600">{t.noAppointmentDetailsFound}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          {t.goBack}
        </button>
      </div>
    );
  }

  // Main component render
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{t.userAppointmentTitle}</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Go back"
          >
            <FaArrowLeft size={24} />
          </button>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">{t.doctor}</h2>
            <div className="flex items-center">
              <img
                src={appointment.doctor.profileImage || "/default-profile.png"}
                alt={appointment.doctor.name}
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-lg font-bold">{appointment.doctor.name}</p>
                <p className="text-gray-600">{appointment.doctor.specialization}</p>
              </div>
            </div>
          </div>

          {/* Appointment Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">{t.date}</label>
              {isEditing ? (
                <input
                  type="date"
                  name="date"
                  value={appointment.date.split("T")[0]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              ) : (
                <p className="text-lg">{new Date(appointment.date).toLocaleDateString()}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">{t.time}</label>
              {isEditing ? (
                <input
                  type="time"
                  name="time"
                  value={appointment.time}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              ) : (
                <p className="text-lg">{appointment.time}</p>
              )}
            </div>
          </div>

          {/* Status and Reason */}
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">{t.status}</label>
                <p className={`text-lg font-semibold ${appointment.status === 'Confirmed' || appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}> {statusLabel(appointment.status)} </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">{t.reason}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="reason"
                    value={appointment.reason}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                ) : (
                  <p className="text-lg">{appointment.reason}</p>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-600">{t.notes}</label>
            {isEditing ? (
              <textarea
                name="notes"
                value={appointment.notes}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                rows="4"
              />
            ) : (
              <p className="text-lg whitespace-pre-wrap">{appointment.notes || t.noNotesProvided}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setShowSaveModal(true)}
                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                <FaSave className="mr-2" />
                {t.saveChanges}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                <FaTimes className="mr-2" />
                {t.cancel}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <FaEdit className="mr-2" />
                {t.editAppointment}
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <FaTrash className="mr-2" />
                {t.deleteAppointment}
              </button>
              {appointment.status?.toLowerCase() !== 'paid' && (
                <button
                  onClick={handleNavigateToPayment}
                  className="flex items-center justify-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                >
                  {t.payNow}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <SaveConfirmationModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={handleSaveChanges}
        message={t.confirmSaveChanges}
        confirmText={t.yesSaveChanges}
        cancelText={t.noCancel}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAppointment}
        message={t.confirmDelete}
        confirmText={t.yesDelete}
        cancelText={t.noCancel}
      />
    </div>
  );
}

export default UserAppointment;