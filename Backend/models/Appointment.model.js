import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },    
    appointmentType: {
        type: String,
        enum: [ 'online', 'in-person'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['not-paid', 'pending', 'completed'],
        default: 'not-paid'
    },
    status: {
        type: String,
        enum: ['pending','scheduled', 'completed'],
        default: 'pending'
    },
    notes: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;
