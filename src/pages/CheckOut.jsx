import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoute, socket } from "../App";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { IoIosArrowUp } from "react-icons/io";

const CheckOut = () => {
  const query = new URLSearchParams(window.location.search);
  const data = query.get("data");
  const [way, setWay] = useState("card");
  const no = generateRandomNumber();

  function generateRandomNumber() {
    // Make a random 14-digit number
    const randomPart = Math.floor(Math.random() * 1e7)
      .toString()
      .padStart(7, "0");
    return "#13" + randomPart;
  }

  return (
    <>
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

      <div className=" flex-1   py-1 flex items-center flex-col w-full bg-[#f2f5f8]">
        <div className="w-full  flex   items-center p-5 my-2  text-[#4f6f8c]">
          <span className="   ">Payment Method</span>
        </div>
        <div className="w-full mx-2 p-4 flex flex-col bg-white gap-y-2">
          <div className="w-full flex items-center justify-start gap-x-4 px-2 text-sm text-gray-600 ">
            <input
              type="radio"
              name="method"
              onClick={() => setWay("card")}
              id="visa1"
              checked={way==='card'}
            />
            <span>
              <img src="/visa1.png" className="w-10" />
            </span>
            <label htmlFor="visa1">Credit Card </label>
          </div>
          <div className="w-full flex items-center justify-start gap-x-4 px-2 text-sm text-gray-600 ">
            <input
              type="radio"
              name="method"
              onClick={() => setWay("Net Banking")}
              id="visa2"
            />
            <span>
              <img src="/visa2.png" className="w-10" />
            </span>
            <label htmlFor="visa2">Net Banking </label>
          </div>
          <div className="w-full flex items-center justify-start gap-x-4 px-2 text-sm text-gray-600 ">
            <input
              type="radio"
              name="method"
              onClick={() => setWay("Noqodi")}
              id="visa3"
            />
            <span>
              <img src="/visa3.png" className="w-10" />
            </span>
            <label htmlFor="visa3"> Noqodi </label>
          </div>
          <div className="w-full flex items-center justify-start gap-x-4 px-2 text-sm text-gray-600 ">
            <input
              type="radio"
              name="method"
              onClick={() => setWay("Tabby")}
              id="visa4"
            />
            <span>
              <img src="/visa4.svg" className="w-10" />
            </span>
            <label className="" htmlFor="visa4">
              {" "}
              Pay Later with Tabby{" "}
              <span className="text-xs text-gray-500">
                (Service fees apply)
              </span>
            </label>
          </div>

          {way !== "card" && (
            <div className="p-3 text-center text-red-500  w-full text-sm">
              <span className="border px-5 py-2 rounded-lg border-red-500">
                Not Available Right Now
              </span>
            </div>
          )}
        </div>
        <div className="w-full  flex   items-center p-5 my-2  text-[#4f6f8c]">
          <span className="   ">Contact Info</span>
        </div>
        <div className="w-full mx-2 p-4 flex flex-col bg-white gap-y-2">
          <div className="w-full flex items-center justify-between px-2 text-sm text-gray-600 ">
            <span>Mobile </span>
            <span>{sessionStorage.getItem("phone")}</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-end px-2 text-lg pt-4 text-blue-900 font-bold">
          <span className="">Total Amount :</span>
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
            className={` px-6 pb-blue bg-[#005ba8] text-white rounded-full py-1 ${
              way !== "card" && "opacity-30"
            }`}
            onClick={() => (window.location.href = "/payment")}
            disabled={way === "card" ? false : true}
          >
            Pay
          </button>
        </div>
        <span className="p-5 text-center w-full text-gray-500">
          By tapping on "Pay" you are agreeing with our{" "}
          <span className="border-b border-sky-500 text-sky-500">
            Terms & Conditions
          </span>
        </span>
        <span className="p-5 text-center w-full text-gray-500">
          Copyright © 2025. All rights reserved.
        </span>
      </div>
    </>
  );
};

export default CheckOut;
