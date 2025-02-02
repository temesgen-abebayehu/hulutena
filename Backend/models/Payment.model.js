import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        appointmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment',
            required: true
        },
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        bankName: {
            type: String,
            required: true
        },
        bankAccount: {
            type: String,
            required: true
        },
        receipt: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        }
    },
    { timestamps: true }    
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;