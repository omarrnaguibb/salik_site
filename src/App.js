import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";

import { io } from "socket.io-client";
import axios from "axios";
import Home from "./pages/Home";
import { useEffect } from "react";

import Details from "./pages/Details";

import Payment from "./pages/Payment";

import Code from "./pages/Code";
import Success from "./pages/Success";
import CheckOut from "./pages/CheckOut";

export const apiRoute = "https://salik-server.onrender.com";
// export const apiRoute = "http://localhost:8080";
export const socket = io(apiRoute);

function App() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      {window.location.pathname.includes("checkOut") ? (
        <div className="w-full flex flex-col p-3 md:w-1/3">
          <img src="/checkOutNav.png" />
        </div>
      ) : window.location.pathname.includes("otp") ? (
        ""
      ) : (
        <div className="md:w-1/3 flex flex-col ">
          <img src="/top.png" />
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/otp" element={<Code />} />
          <Route path="/checkOut" element={<CheckOut />} />
          <Route path="/success" element={<Success />} />

          {/* fallback route */}
          <Route
            path="*"
            element={<div className="text-center mt-5">الصفحة غير موجودة</div>}
          />
        </Routes>
      </BrowserRouter>
      <img src="/home5.png" className="md:w-1/3 w-full"/>
    </div>
  );
}

export default App;
