import { useState, useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    role: "",
    profileImage: "",
    gender: "",
    language: [],
    specialization: [],
    onlineStatus: false,
    isVerified: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [languageInput, setLanguageInput] = useState(""); 
  const [specializationInput, setSpecializationInput] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          throw new Error("User not found in local storage.");
        }

        const userId = JSON.parse(storedUser).currentUser._id;
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setUser({
          fullName: data.fullName || "",
          email: data.email || "",
          contactNumber: data.contactNumber || "",
          password: "", 
          role: data.role || "",
          profileImage: data.profileImage || "",
          gender: data.gender || "",
          language: data.language || [], 
          specialization: data.specialization || [],
          onlineStatus: data.onlineStatus || false,
          isVerified: data.isVerified || false,
        });
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

  // Handle language input
  const handleLanguageInput = (e) => {
    if (e.key === "Enter" && languageInput.trim()) {
      e.preventDefault();
      setUser((prevUser) => ({
        ...prevUser,
        language: [...prevUser.language, languageInput.trim()],
      }));
      setLanguageInput(""); // Clear input after adding
    }
  };

  // Handle specialization input
  const handleSpecializationInput = (e) => {
    if (e.key === "Enter" && specializationInput.trim()) {
      e.preventDefault();
      setUser((prevUser) => ({
        ...prevUser,
        specialization: [...prevUser.specialization, specializationInput.trim()],
      }));
      setSpecializationInput(""); // Clear input after adding
    }
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

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setError("");
      setSuccessMessage("");

      // Delete the previous image from Cloudinary if the link exists
      if (user.profileImage) {
        const publicId = user.profileImage.split('/').pop().split('.')[0];
        await fetch(`/api/deleteImage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicId }),
        });
      }

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hulutena");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dysfxppj1/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      setUser((prevUser) => ({ ...prevUser, profileImage: imageUrl }));
      setSuccessMessage("Profile image updated successfully!");
    } catch (err) {
      setError("Failed to upload profile image. Please try again.");
      console.error("Image upload error:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Validate form fields
  const validateForm = () => {
    if (!user.fullName || !user.email || !user.contactNumber || !user.gender) {
      setError("Please fill in all required fields.");
      return false;
    }
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
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/login");
        return;
      }

      const userId = JSON.parse(storedUser).currentUser._id;

      // Get the original user data
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const originalUser = await response.json();

      // Find only changed fields
      const updatedFields = {};
      Object.keys(user).forEach((key) => {
        if (user[key] && user[key] !== originalUser[key]) {
          updatedFields[key] = user[key];
        }
      });

      // Only send the update request if there are changes
      if (Object.keys(updatedFields).length === 0) {
        setSuccessMessage("No changes detected.");
        setLoading(false);
        return;
      }

      const updateResponse = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

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
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate("/profile");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        {/* Cover Image */}
        <div className="relative h-48 bg-gray-200 rounded-t-lg">
          <img
            src="/homeimage.jpeg" // Default cover image
            alt="Cover"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        {/* Profile Image */}
        <div className="relative flex justify-center -mt-20">
          <div className="group relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={user.profileImage || "/profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">Edit</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                ref={fileInputRef}
                disabled={uploadingImage}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Edit Profile</h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
              {successMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-500 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-500 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm text-gray-500 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={user.contactNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm text-gray-500 font-medium">Gender</label>
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Password */}
              <div>
                <label className="block text-sm text-gray-500 font-medium">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Leave blank to keep current password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-gray-500 font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  placeholder="Confirm your new password"
                />
              </div>

              {/* Doctor-Specific Fields */}
              {user.role === "doctor" && (
                <>
                  {/* Language */}
                  <div>
                    <label className="block text-sm text-gray-500 font-medium">Languages You Speak</label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                      {user.language.map((lang, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                        >
                          {lang}
                          <button
                            type="button"
                            onClick={() => removeLanguage(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        onKeyDown={handleLanguageInput}
                        className="flex-1 p-1 border-none focus:ring-0"
                        placeholder="Add a language and press Enter"
                      />
                    </div>
                  </div>

                  {/* Specialty */}
                  <div>
                    <label className="block text-sm text-gray-500 font-medium">Specializations</label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                      {user.specialization.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm"
                        >
                          {spec}
                          <button
                            type="button"
                            onClick={() => removeSpecialization(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        value={specializationInput}
                        onChange={(e) => setSpecializationInput(e.target.value)}
                        onKeyDown={handleSpecializationInput}
                        className="flex-1 p-1 border-none focus:ring-0"
                        placeholder="Add a specialization and press Enter"
                      />
                    </div>
                  </div>

                  {/* Active Account */}
                  {user.isVerified && (
                    <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Account Status</label>
                    
                    <div className="flex items-start p-3 bg-blue-100 rounded-md">
                      <FaInfoCircle className="text-blue-600 mt-1 mr-2" size={18} />
                      <p className="text-sm text-blue-800">
                        If you're unavailable for appointments, you can temporarily deactivate your account. Reactivate anytime when you're ready.
                      </p>
                    </div>
                  
                    <select
                      name="onlineStatus"
                      value={user.onlineStatus ? "active" : "inactive"}
                      onChange={(e) =>
                        setUser((prev) => ({
                          ...prev,
                          onlineStatus: e.target.value === "active",
                        }))
                      }
                      className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                      required
                    >
                      <option value="active">Active (Ready for appointments)</option>
                      <option value="inactive">Temporarily Unavailable (Not ready for appointments)</option>
                    </select>
                  </div>                  
                  )}
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleCancel}
              disabled={loading || uploadingImage}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              disabled={loading || uploadingImage}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;