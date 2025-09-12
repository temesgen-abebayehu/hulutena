const ProfileImageUpload = ({ user, setUser, uploadingImage, setUploadingImage, t }) => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // setError("");
      // setSuccessMessage("");

      // Delete the previous image from Cloudinary if it exists
      if (user.profileImage) {
        const parts = user.profileImage.split("/");
        let publicId = parts.length > 0 ? parts.pop().split(".")[0] : null;

        if (publicId && publicId == userId) {
          publicId = `hulutena/${publicId}`;

          const response = await fetch(`/api/deleteImage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ publicId }),
          });

          const responseData = await response.json();

          if (!response.ok) {
            throw new Error(`Failed to delete image: ${responseData.message}`);
          }
        }
      }

      // Upload new image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hulutena");
      formData.append("public_id", `hulutena/${userId}`);

      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/dysfxppj1/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const data = await uploadResponse.json();
      const imageUrl = data.secure_url;

      onImageUpload(imageUrl);
      // setSuccessMessage("Profile image uploaded successfully! Click Save to update your profile.");
    } catch (err) {
      // setError(`Error: ${err.message}`);
      console.error("Image upload error:", err);
    }
  };


  return (
    <div className="w-full md:w-1/3 flex flex-col items-center">
      <img
        src={user.profileImage || "/default-profile.png"}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {uploadingImage && <p>Uploading...</p>}
      <button
        onClick={() => document.querySelector('input[type="file"]').click()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={uploadingImage}
      >
        {t.uploadProfileImage}
      </button>
    </div>
  );
};

export default ProfileImageUpload;
