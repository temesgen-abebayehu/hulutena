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
import { useLanguage } from "../context/LanguageContext";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
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
    setConfirmationMessage(t.uploadingReceipt);

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

      if (!response.ok) throw new Error(t.errorUploadingReceipt);

      const data = await response.json();
      setReceiptUrl(data.secure_url);
      setConfirmationMessage(t.receiptUploaded);
    } catch (error) {
      console.error("Error uploading receipt:", error);
      setConfirmationMessage(t.errorUploadingReceipt);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentReceipt || !selectedBank || !selectedAccount?.accountNumber || !receiptUrl) {
      setConfirmationMessage(t.fillAllFields);
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
        throw new Error(errorData.message || t.paymentFailed);
      }

      // Update payment status to pending
      await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentStatus: "pending" }),
      });

      setConfirmationMessage(t.paymentUnderReview);
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
      setConfirmationMessage(t.accountCopied);
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
          <FaArrowLeft className="mr-2" /> {t.back}
        </button>

        <h1 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
          <FaMoneyCheckAlt className="mr-2" />
          {t.paymentProcess}
        </h1>

        {doctor && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{t.doctorDetails}</h2>
            <p className="text-gray-600">
              <strong>{t.doctorName}:</strong> {doctor.fullName}
            </p>
            <p className="text-gray-600">
              <strong>{t.specialty}:</strong> {doctor.specialization ? doctor.specialization.join(", ") : t.notAvailableShort}
            </p>
            <p className="text-gray-600">
              <strong>{t.pronoun}:</strong> {doctor.gender === 'male' ? 'He' : 'She'}
            </p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">{t.selectBank}</label>
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
          <p className="text-gray-700">{t.receiverAccount.replace('{bankName}', selectedBank)}</p>
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

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">{t.uploadReceipt}</label>
          <div className="flex items-center">
            <label
              htmlFor="receipt-upload"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
            >
              <FaUpload className="mr-2" />
              {paymentReceipt ? t.changeReceipt : t.chooseFile}
            </label>
            <input
              id="receipt-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            {isUploading && <FaSpinner className="animate-spin ml-4 text-blue-500" />}
          </div>
          {paymentReceipt && !isUploading && (
            <p className="text-green-600 mt-2 flex items-center">
              <FaCheckCircle className="mr-2" />
              {paymentReceipt.name}
            </p>
          )}
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
          disabled={isLoading || isUploading}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <FaCheckCircle className="mr-2" />
              {t.submitPayment}
            </>
          )}
        </button>

        {confirmationMessage && (
          <p
            className={`mt-4 text-center ${confirmationMessage.includes("Error") || confirmationMessage.includes("failed")
              ? "text-red-500"
              : "text-green-500"
              }`}
          >
            {confirmationMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default Payment;