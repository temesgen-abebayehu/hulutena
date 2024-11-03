import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  idCard: {
    type: String,
  },
  degreeCertificate: {
    type: String,
  },
  livenessVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  adminReviewed: {
    type: Boolean,
    default: false,
  },
  adminReviewStatus: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
  adminReviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, // Admin who reviewed
  adminComments: {
    type: String,
  },
});

const Verification = mongoose.model("Verification", verificationSchema);

export default Verification;
