import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    medicalHistory: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;