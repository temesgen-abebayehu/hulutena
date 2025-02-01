import React, { useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaUpload,
  FaMoneyCheckAlt,
  FaCopy,
} from "react-icons/fa";

function Payment({ appointmentDetails, onPaymentComplete }) {
  const [selectedBank, setSelectedBank] = useState("CBE");
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [paymentConfirmation, setPaymentConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const ourAccountNumbers = [
    { id: 1, bankName: "CBE", accountNumber: "1000400426938" },
    { id: 2, bankName: "BOA", accountNumber: "9383452" },
    { id: 3, bankName: "Abay Bank", accountNumber: "2998100" },
    { id: 4, bankName: "Awash Bank", accountNumber: "10049921771" },
    { id: 5, bankName: "Dashen Bank", accountNumber: "20939477448" },
    { id: 6, bankName: "Enat Bank", accountNumber: "67660192" },
    { id: 7, bankName: "Ahadu Bank", accountNumber: "13721122927" },
    { id: 8, bankName: "Amhara Bank", accountNumber: "987302452" },
    { id: 9, bankName: "TeleBirr", accountNumber: "0985962697" },
    { id: 10, bankName: "M-pesa", accountNumber: "0907777680" },
  ];

  const selectedAccount = ourAccountNumbers.find(
    (account) => account.bankName === selectedBank
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPaymentReceipt(file);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (!paymentReceipt) {
      setConfirmationMessage(
        "Please upload the payment receipt to complete the payment."
      );
      return;
    }

    // Simulate payment completion
    setIsPaymentCompleted(true);
    setPaymentConfirmation(true);
    setConfirmationMessage("Payment completed successfully. Thank you!");

  };

  const copyAccountNumber = () => {
    if (selectedAccount?.accountNumber) {
      navigator.clipboard.writeText(selectedAccount.accountNumber);
      setConfirmationMessage("Account number copied to clipboard!");
      setTimeout(() => {
        setConfirmationMessage("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onPaymentComplete}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Appointment Form
        </button>

        <h1 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
          <FaMoneyCheckAlt className="mr-2" />
          Payment Process
        </h1>

        {/* Display Appointment Details */}
        {appointmentDetails && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Appointment Details
            </h2>
            <p className="text-gray-600">
              <strong>Date:</strong>{" "}
              {appointmentDetails.selectedDate?.toDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Time:</strong> {appointmentDetails.selectedTime}
            </p>
            <p className="text-gray-600">
              <strong>Type:</strong> {appointmentDetails.appointmentType}
            </p>
          </div>
        )}

        {/* Payment Options */}
        <div className="mb-4">
          <label
            htmlFor="bank"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Payment Option
          </label>
          <select
            id="bank"
            name="bank"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ourAccountNumbers.map((account) => (
              <option key={account.id} value={account.bankName}>
                {account.bankName}
              </option>
            ))}
          </select>
        </div>

        {/* Account Number with Copy Functionality */}
        <div className="mb-4">
          <p className="text-gray-700">
            Receiver {selectedBank} Account Number:
          </p>
          <div className="flex items-center justify-between p-2 border border-gray-300 rounded-lg">
            <p className="font-semibold text-gray-800">
              {selectedAccount?.accountNumber}
            </p>
            <button
              onClick={copyAccountNumber}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaCopy />
            </button>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            After you have made the payment, please attach the payment receipt
            here:
          </p>
          <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <label className="cursor-pointer flex items-center">
              <FaUpload className="mr-2 text-blue-600" />
              <span className="text-blue-600">Upload Receipt</span>
              <input
                type="file"
                accept=".png, .jpeg, .jpg, .pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          {paymentReceipt && (
            <p className="mt-2 text-sm text-gray-600">
              Uploaded: {paymentReceipt.name}
            </p>
          )}
        </div>

        {/* Complete Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isPaymentCompleted}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPaymentCompleted ? "Payment Completed" : "Complete Payment"}
        </button>

        {/* Confirmation Message */}
        {confirmationMessage && (
          <div
            className={`mt-4 p-4 rounded-md flex items-center ${
              confirmationMessage.includes("successfully") ||
              confirmationMessage.includes("copied")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <FaCheckCircle className="mr-2" />
            {confirmationMessage}
          </div>
        )}

        {paymentConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">Appointment Scheduled!</h2>
              <div className="flex items-center justify-center mt-4">
                <FaCheckCircle className="text-green-500 text-6xl mt-4" />
                <p className="font-bold">
                  Your appointment has been successfully scheduled!
                </p>
              </div>
              <p>You will receive a confirmation email shortly.</p>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setPaymentConfirmation(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
