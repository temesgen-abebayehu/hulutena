import Payment from "../models/Payment.model.js";
import Appointment from '../models/appointment.model.js';

export const processPayment = async (req, res) => {
    const { appointmentId, bankName, bankAccount, receipt } = req.body;
    try {
        const payment = new Payment({ appointmentId, bankName, bankAccount, receipt });
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        console.log(`Error in processPayment: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getPayments = async (_, res) => {
    try {
        const payments = await Payment.find();
        if (!payments) {
            return res.status(404).json({ message: "No payments found." });
        }
        res.status(200).json(payments);
    } catch (error) {
        console.log(`Error in getPayments: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.log(`Error in getPayment: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updatePayment = async (req, res) => {
    try {
        if (!req.admin || !req.admin._id) {
            return res.status(400).json({ message: "User not authenticated." });
        }

        const payment = await Payment.findByIdAndUpdate(
            req.params.id, 
            { 
                verifiedBy: req.admin._id,
                status: 'completed'
            }, { new: true }
        );
        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }

        const updateAppointment = await Appointment.findByIdAndUpdate(
            payment.appointmentId,
            { 
                status: 'scheduled' ,
                paymentStatus: 'completed'
             },
            { new: true }
        );

        if (!updateAppointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        res.status(200).json(payment);
    }
    catch (error) {
        console.log(`Error in updatePayment: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }
        res.status(200).json({ message: "Payment deleted." });
    } catch (error) {
        console.log(`Error in deletePayment: ${error}`);
        res.status(500).json({ message: "Server Error" });
    }
};