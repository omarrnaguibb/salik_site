import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoute, socket } from "../App";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
const Home = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);


  return (
    <>
      <div
        className="   py-1 flex items-center flex-col w-full"
        style={{
          backgroundImage: "url('/home.jfif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" flex flex-col items-center justify-center gap-y-3 bg-white my-3 w-11/12 rounded-sm p-8 ">
          <span className="text-xl font-bold">Recharge </span>
          <span className=" font-bold">Choose a recharge method</span>
          <div className=" w-full mt-5 flex justify-around items-stretch gap-x-5 ">
            <div
              className="flex flex-col justify-center gap-y-3 items-center border p-3 flex-1"
              onClick={() => (window.location.href = "/details")}
            >
              <img src="/home1.png" className="w-14" />
              <span className="text-xs font-bold">Online Payment</span>
            </div>{" "}
            <div
              className="flex flex-col justify-center gap-y-3 items-center border py-3 px-2 flex-1 "
              onClick={() => setError(!error)}
            >
              <img src="/home2.png" className="w-10" />
              <span className="text-xs font-bold">Recharge number </span>
            </div>
          </div>
          
          {error ? (
            <span className="text-red-500 border border-red-500 py-1 px-5">
              Not available right now{" "}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <img src="/home3.png" />
      <img src="/home4.png" />
    </>
  );
};

export default Home;
