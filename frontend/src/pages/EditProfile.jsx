import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    role: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false); // Track image upload status
  const navigate = useNavigate();

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
          password: "", // Do not prefill password
          role: data.role || "",
          profileImage: data.profileImage || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
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
  
      // Optionally clear the previous image if needed
      setUser((prevUser) => ({ ...prevUser, profileImage: "" }));
  
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

  // Validate user inputs
  const validateForm = () => {
    if (!user.fullName || !user.email || !user.contactNumber || !user.role) {
      setError("All fields are required.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (user.password && user.password.length < 6) {
      setError("Password must be at least 6 characters long.");
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
        throw new Error("User not found in local storage.");
      }

      const userId = JSON.parse(storedUser).currentUser._id;
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data.");
      }

      const updatedUser = await response.json();
      setSuccessMessage("Profile updated successfully!");

      // Update local storage with the updated user data
      localStorage.setItem(
        "user",
        JSON.stringify({ currentUser: updatedUser })
      );

      // Redirect to profile page after 2 seconds
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
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

        <div className="space-y-4">
          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm text-gray-500">Profile Image</label>
            <div className="flex items-center gap-4">
              <img
                src={user.profileImage || "/profile.png"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-md"
                disabled={uploadingImage}
              />
            </div>
            {uploadingImage && (
              <p className="text-sm text-gray-500">Uploading image...</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-500">Full Name</label>
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
            <label className="block text-sm text-gray-500">Email</label>
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
            <label className="block text-sm text-gray-500">Phone Number</label>
            <input
              type="text"
              name="contactNumber"
              value={user.contactNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-gray-500">Role</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-500">New Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Leave blank to keep current password"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleCancel}
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
  );
}

export default EditProfile;
