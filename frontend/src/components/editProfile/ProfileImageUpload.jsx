import { MdCloudUpload, MdPhotoCamera } from "react-icons/md";

const ProfileImageUpload = ({ user, setUser, uploadingImage, setUploadingImage, t }) => {

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      // setError("");
      // setSuccessMessage("");

      // Delete the previous image from Cloudinary if it exists AND belongs to this user
      if (user.profileImage && typeof user.profileImage === "string") {
        const isCloudinary = user.profileImage.includes("res.cloudinary.com/dysfxppj1") && user.profileImage.includes("/upload/");
        const hasFolder = user.profileImage.includes("/hulutena/");
        if (isCloudinary && hasFolder) {
          const urlParts = user.profileImage.split("/");
          const lastPart = urlParts[urlParts.length - 1] || ""; // e.g., `${user._id}.jpg`
          const fileNameOnly = lastPart.split("?")[0].split(".")[0];
          if (fileNameOnly && user._id && fileNameOnly === String(user._id)) {
            const publicId = `hulutena/${fileNameOnly}`;
            const response = await fetch(`/api/deleteImage`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ publicId }),
            });
            // Try to parse error message but don't block upload if parsing fails
            let responseData = {};
            try { responseData = await response.json(); } catch { }
            if (!response.ok) {
              throw new Error(`Failed to delete image: ${responseData.message || response.statusText}`);
            }
          }
        }
      }

      // Upload new image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hulutena");
      formData.append("public_id", `hulutena/${user._id}`);

      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/dysfxppj1/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const data = await uploadResponse.json();
      const imageUrl = data.secure_url;

      setUser((prev) => ({ ...prev, profileImage: imageUrl }));
      // setSuccessMessage("Profile image uploaded successfully! Click Save to update your profile.");
    } catch (err) {
      // setError(`Error: ${err.message}`);
      console.error("Image upload error:", err);
    } finally {
      setUploadingImage(false);
    }
  };


  return (
    <div className="w-full md:w-1/3 flex flex-col items-center">
      <div className="relative mb-4">
        <img
          src={user.profileImage || "/default-profile.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <button
          type="button"
          title="Change profile picture"
          onClick={() => document.getElementById('profile-image-input')?.click()}
          className="absolute bottom-1 right-1 bg-white text-gray-700 shadow-sm border border-gray-200 rounded-full p-2 hover:bg-gray-50"
          aria-label="Change profile picture"
        >
          <MdPhotoCamera className="text-xl" />
        </button>
      </div>
      <input
        id="profile-image-input"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      {uploadingImage && <p className="text-sm text-gray-600 mb-2">Uploading...</p>}
      <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 2MB.</p>
      <label
        htmlFor="profile-image-input"
        className={`inline-block bg-blue-500 text-white px-4 py-2 rounded ${uploadingImage ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-blue-600"}`}
        aria-disabled={uploadingImage}
      >
        <span className="inline-flex items-center gap-2">
          <MdCloudUpload className="text-xl" aria-hidden="true" />
          {t.uploadProfileImage}
        </span>
      </label>
    </div>
  );
};

export default ProfileImageUpload;
