import mongoose from "mongoose";

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    address: {
        type: String,
        required: true,
        trim: true 
    },
    dateOfBirth: {
        type: Date,        
    },
    specialization: {
        type: Array,
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

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;