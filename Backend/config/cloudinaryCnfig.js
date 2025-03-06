import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Delete image endpoint
export const cloudinary_delete = async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ error: "publicId is required" });
  }

  try {

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return res.status(200).json({ message: "Image deleted successfully" });
    } else {
      return res.status(400).json({ message: `Failed to delete image: ${result.result}` });
    }
  } catch (err) {
    console.error("Error deleting image:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
