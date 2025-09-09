import React, { useState } from "react";
import { CreditCard, Smartphone, DollarSign, Banknote } from "lucide-react";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [totalAmount, setTotalAmount] = useState(25.5); // Example total
  const [cashReceived, setCashReceived] = useState("");
  const [change, setChange] = useState(0);

  const currencyFormatter = new Intl.NumberFormat("en-ZM", {
    style: "currency",
    currency: "ZMW",
  });

  const paymentOptions = [
    {
      id: "mobile",
      name: "Mobile Pay",
      icon: Smartphone,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "card",
      name: "Card",
      icon: CreditCard,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "cash",
      name: "Cash",
      icon: Banknote,
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      id: "split",
      name: "Split Payment",
      icon: DollarSign,
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  const handleNumberClick = (num) => {
    if (selectedPayment === "cash") {
      const newAmount = cashReceived + num;
      setCashReceived(newAmount);

      const received = parseFloat(newAmount) || 0;
      const calculatedChange = received - totalAmount;
      setChange(calculatedChange > 0 ? calculatedChange : 0);
    }
  };

  const handleClear = () => {
    setCashReceived("");
    setChange(0);
  };

  const handleBackspace = () => {
    if (selectedPayment === "cash") {
      const newAmount = cashReceived.slice(0, -1);
      setCashReceived(newAmount);

      const received = parseFloat(newAmount) || 0;
      const calculatedChange = received - totalAmount;
      setChange(calculatedChange > 0 ? calculatedChange : 0);
    }
  };

  const handlePaymentSelect = (paymentId) => {
    setSelectedPayment(paymentId);
    if (paymentId !== "cash") {
      setCashReceived("");
      setChange(0);
    }
  };

  const processPayment = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }

    if (selectedPayment === "cash") {
      const received = parseFloat(cashReceived) || 0;
      if (received < totalAmount) {
        alert("Insufficient cash amount");
        return;
      }
    }

    alert(
      `Processing ${selectedPayment} payment for $${totalAmount.toFixed(2)}`
    );
  };

  const numberPadButtons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "C",
    "0",
    "⌫",
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment</h2>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="text-sm text-gray-600">Total Amount</div>
          <div className="text-3xl font-bold text-gray-800">
            ${totalAmount.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Payment Method
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handlePaymentSelect(option.id)}
                className={`p-4 rounded-lg transition-all duration-200 ${
                  selectedPayment === option.id
                    ? `${option.color} text-white transform scale-105`
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <Icon className="mx-auto mb-2" size={24} />
                <div className="text-sm font-medium">{option.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cash Payment Section */}
      {selectedPayment === "cash" && (
        <div className="mb-6">
          <div className="mb-4">
            <div className="bg-blue-50 rounded-lg p-4 mb-3">
              <div className="text-sm text-blue-600">Cash Received</div>
              <div className="text-2xl font-bold text-blue-800">
                ${cashReceived || "0.00"}
              </div>
            </div>

            {parseFloat(cashReceived) >= totalAmount && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-green-600">Change Due</div>
                <div className="text-2xl font-bold text-green-800">
                  ${change.toFixed(2)}
                </div>
              </div>
            )}
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-2">
            {numberPadButtons.map((btn, index) => (
              <button
                key={index}
                onClick={() => {
                  if (btn === "C") handleClear();
                  else if (btn === "⌫") handleBackspace();
                  else if (btn === "0" && cashReceived === "")
                    return; // Prevent leading zeros
                  else if (btn !== "⌫" && btn !== "C") {
                    if (btn === "." && cashReceived.includes(".")) return; // Prevent multiple decimals
                    handleNumberClick(btn);
                  }
                }}
                className={`p-4 rounded-lg font-semibold transition-all duration-150 ${
                  btn === "C"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : btn === "⌫"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800 hover:scale-105"
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Process Payment Button */}
      <button
        onClick={processPayment}
        disabled={!selectedPayment}
        className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
          selectedPayment
            ? "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {selectedPayment === "cash" && parseFloat(cashReceived) < totalAmount
          ? `Need $${(totalAmount - (parseFloat(cashReceived) || 0)).toFixed(
              2
            )} more`
          : "Process Payment"}
      </button>

      {/* Payment Status */}
      {selectedPayment && selectedPayment !== "cash" && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
          <div className="text-blue-700 font-medium">
            Ready to process {selectedPayment} payment
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
