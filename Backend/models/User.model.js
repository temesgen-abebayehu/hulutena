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
    role: { 
        type: String, 
        enum: ['doctor', 'patient', 'admin'], 
        required: true 
    },
    contactNumber: {
        type: String,
        unique: true,
        require: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    dateOfBirth: {
        type: Date,
    },
    medicalHistory: {
        type: [String],
        default: [],
    },
    profileImage:{
        type: String,
        default: 'https://i.pinimg.com/474x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg'
    },
    specialization: {
        type: [String],
        default: [],
    },
    rating: {
        type: [Number],
        min: 0,
        max: 5,
        default: 0,
    },
    avarageRating: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
    },
    availability: {
        type: String,
        enum: ['online', 'in-person', 'both'],
    },
    experience: {
        type: Number,
        default: 0,
    },
    onlineStatus: {
        type: Boolean,
        default: false,
    },
    numberOfAppointments: {
        type: Number,
        default: 0,
    },
    numberOfServices: {
        type: Number,
        default: 0,
    },
    language: {
        type: [String],
        default: [],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationStatus: {
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending" 
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