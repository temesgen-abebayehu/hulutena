const ProfileImageUpload = ({ profileImage, onImageUpload, uploadingImage, userId, setError, setSuccessMessage }) => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      setError("");
      setSuccessMessage("");
  
      // Delete the previous image from Cloudinary if it exists
      if (profileImage) {
        const parts = profileImage.split("/");
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
      setSuccessMessage("Profile image uploaded successfully! Click Save to update your profile.");
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("Image upload error:", err);
    }
  };
  

  return (
    <div className="relative flex justify-center -mt-20">
      <div className="group relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img
          src={profileImage || "/profile.png"}
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
            disabled={uploadingImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
