import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImageUpload from "../components/editProfile/ProfileImageUpload";
import EditForm from "../components/editProfile/EditForm";
import { useLanguage } from "../context/LanguageContext";

function EditProfile() {
  const [user, setUser] = useState({});
  const [initialUserState, setInitialUserState] = useState({}); // Store initial user state
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [languageInput, setLanguageInput] = useState("");
  const [specializationInput, setSpecializationInput] = useState("");
  const [loading, setLoading] = useState(true); // initial fetch state
  const [saving, setSaving] = useState(false); // form submit state
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          navigate(`/login?returnTo=/profile/edit`);
          return;
        }

        const userId = JSON.parse(storedUser).currentUser._id;
        const response = await fetch(`/api/users/${userId}`, {
          credentials: "include",
        });
        if (response.status === 401) {
          navigate(`/login?returnTo=/profile/edit`);
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        // Ensure array fields exist
        const normalized = {
          ...data,
          language: Array.isArray(data.language) ? data.language : [],
          specialization: Array.isArray(data.specialization) ? data.specialization : [],
        };
        setUser(normalized);
        setInitialUserState(normalized); // Store the initial user state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle input change for non-array fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Add/remove languages
  const handleLanguageAdd = () => {
    if (!languageInput.trim()) return;
    const newLanguage = languageInput.trim();
    setUser((prev) => ({
      ...prev,
      language: [...(prev.language || []), newLanguage],
    }));
    setLanguageInput("");
  };
  const handleLanguageRemove = (index) => {
    setUser((prev) => ({
      ...prev,
      language: (prev.language || []).filter((_, i) => i !== index),
    }));
  };

  // Add/remove specialization
  const handleSpecializationAdd = () => {
    if (!specializationInput.trim()) return;
    const newSpecialization = specializationInput.trim();
    setUser((prev) => ({
      ...prev,
      specialization: [...(prev.specialization || []), newSpecialization],
    }));
    setSpecializationInput("");
  };
  const handleSpecializationRemove = (index) => {
    setUser((prev) => ({
      ...prev,
      specialization: (prev.specialization || []).filter((_, i) => i !== index),
    }));
  };

  // Remove a language
  const removeLanguage = (index) => {
    setUser((prevUser) => ({
      ...prevUser,
      language: prevUser.language.filter((_, i) => i !== index),
    }));
  };

  // Remove a specialization
  const removeSpecialization = (index) => {
    setUser((prevUser) => ({
      ...prevUser,
      specialization: prevUser.specialization.filter((_, i) => i !== index),
    }));
  };

  // Image updates are handled inside ProfileImageUpload via setUser

  // Validate form fields
  const validateForm = () => {
    if (user.password && user.password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      // Create an object with only the updated fields
      const fieldsToUpdate = {};
      for (const key in user) {
        if (user[key] !== initialUserState[key]) {
          fieldsToUpdate[key] = user[key];
        }
      }

      // Remove password if it's empty
      if (!fieldsToUpdate.password) {
        delete fieldsToUpdate.password;
      }

      // If no fields were updated, show a message and return
      if (Object.keys(fieldsToUpdate).length === 0) {
        setSuccessMessage("No changes detected.");
        setLoading(false);
        return;
      }

      const updateResponse = await fetch(`/api/users/${user._id}`, {
        method: "PATCH", // Use PATCH for partial updates
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(fieldsToUpdate),
      });

      if (updateResponse.status === 401) {
        navigate(`/login?returnTo=/profile/edit`);
        return;
      }
      if (!updateResponse.ok) {
        throw new Error("Failed to update user data.");
      }

      const updatedUser = await updateResponse.json();
      setSuccessMessage("Profile updated successfully!");

      // Update local storage
      localStorage.setItem("user", JSON.stringify({ currentUser: updatedUser }));

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Handle form submit and cancel
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSave();
  };
  const handleCancel = () => {
    navigate("/profile");
  };

  // Loading state (initial fetch)
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-sky-50 to-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900">{t.editProfileTitle}</h1>
          <p className="text-gray-600 mt-2">Update your information and profile image.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-3">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 text-green-700 px-4 py-3">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <ProfileImageUpload
              user={user}
              setUser={setUser}
              uploadingImage={uploadingImage}
              setUploadingImage={setUploadingImage}
              t={t}
            />
            <EditForm
              user={user}
              handleChange={handleChange}
              handleLanguageAdd={handleLanguageAdd}
              handleLanguageRemove={handleLanguageRemove}
              languageInput={languageInput}
              setLanguageInput={setLanguageInput}
              handleSpecializationAdd={handleSpecializationAdd}
              handleSpecializationRemove={handleSpecializationRemove}
              specializationInput={specializationInput}
              setSpecializationInput={setSpecializationInput}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              t={t}
              saving={saving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;