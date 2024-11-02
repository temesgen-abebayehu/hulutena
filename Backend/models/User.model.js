import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    role: { 
        type: String, 
        enum: ['doctor', 'patient'], 
        required: true 
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
    },
    medicalHistory: {
        type: [String],
        default: []
    },
    specialization: {
        type: [String],
        default: []
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    mfaEnabled: {
        type: Boolean,
        default: false
    },
    mfaSecret: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;