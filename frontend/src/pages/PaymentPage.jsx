import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaUpload,
  FaMoneyCheckAlt,
  FaCopy,
  FaSpinner,
} from "react-icons/fa";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointmentId, doctor } = location.state || {};

  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [selectedBank, setSelectedBank] = useState("CBE");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  const [receiptUrl, setReceiptUrl] = useState("");

  useEffect(() => {
    if (!appointmentId || !doctor) {
      navigate(-1);
    }
  }, [appointmentId, doctor, navigate]);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPaymentReceipt(file);
    setIsUploading(true); 
    setConfirmationMessage("Uploading receipt...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hulutena");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dysfxppj1/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload receipt.");

      const data = await response.json();
      setReceiptUrl(data.secure_url);
      setConfirmationMessage("Receipt uploaded successfully!");
    } catch (error) {
      console.error("Error uploading receipt:", error);
      setConfirmationMessage("Error uploading receipt. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentReceipt || !selectedBank || !selectedAccount?.accountNumber || !receiptUrl) {
      setConfirmationMessage("Please fill out all fields and upload the payment receipt.");
      return;
    }

    setIsLoading(true);
    setConfirmationMessage("");

    try {
      const paymentData = {
        appointmentId,
        bankName: selectedBank,
        bankAccount: selectedAccount.accountNumber,
        receipt: receiptUrl,
      };

      const response = await fetch(`/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        throw new Error(errorData.message || "Payment failed. Please try again.");
      }

      // Update payment status to pending
      await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentStatus: "pending" }),
      });

      setConfirmationMessage("Your Payment is Under Review! We will notify you once it's approved.");
      setTimeout(() => navigate("/appointment"), 5000);
    } catch (error) {
      console.error("Error processing payment:", error);
      setConfirmationMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h1 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
          <FaMoneyCheckAlt className="mr-2" />
          Payment Process
        </h1>

        {doctor && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Doctor Details</h2>
            <p className="text-gray-600">
              <strong>Name:</strong> {doctor.fullName}
            </p>
            <p className="text-gray-600">
              <strong>Specialty:</strong> {doctor.specialization ? doctor.specialization.join(", ") : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Pronounce:</strong> {doctor.gender === 'male'? 'He': 'She'}
            </p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Bank</label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {ourAccountNumbers.map((account) => (
              <option key={account.id} value={account.bankName}>
                {account.bankName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">Receiver {selectedBank} Account Number:</p>
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

        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            After you have made the payment, please attach the payment receipt here:
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
                required
              />
            </label>
          </div>
          {paymentReceipt && (
            <p className="mt-2 text-sm text-gray-600">Uploaded: {paymentReceipt.name}</p>
          )}
        </div>

        <button
          onClick={handlePayment}
          disabled={isLoading || isUploading} // Disable button while uploading or loading
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2" />
              Processing...
            </div>
          ) : (
            "Complete Payment"
          )}
        </button>

        {confirmationMessage && (
          <div
            className={`mt-4 p-4 rounded-md flex items-center ${
              confirmationMessage.includes("successfully")
                ? "bg-green-100 text-green-800"
                : confirmationMessage.includes("Uploading")
                ? "bg-blue-100 text-blue-800" 
                : "bg-red-100 text-red-800" 
            }`}
          >
            <FaCheckCircle className="mr-2" />
            {confirmationMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;