import React, { useState } from "react";

function Payment() {
  const [selectedBank, setSelectedBank] = useState("CBE");
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
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
      setConfirmationMessage("Please upload the payment receipt to complete the payment.");
      return;
    }

    setConfirmationMessage("Payment completed successfully. Thank you!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold text-blue-800 mb-4">Payment Process</h1>
        <div className="mb-4">
          <label htmlFor="bank" className="block text-gray-700 font-medium mb-2">
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
        <div className="mb-4">
          <p className="text-gray-700">
            Receiver {selectedBank} Account Number:
          </p>
          <p className="font-semibold text-gray-800">{selectedAccount?.accountNumber}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            After you have made the payment, please attach the payment receipt here:
          </p>
          <input
            type="file"
            accept=".png, .jpeg, .jpg, .pdf"
            onChange={handleFileUpload}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Complete Payment
        </button>
        {confirmationMessage && (
          <div
            className={`mt-4 p-4 rounded-md ${
              confirmationMessage.includes("successfully")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {confirmationMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
