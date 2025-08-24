import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { apiRoute, socket } from "../App";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
const Details = () => {
  const [phone, setPhone] = useState(null);
  const [country, setCountry] = useState("United Arab Emirates");
  const [emirate, setEmirate] = useState(null);
  const [category, setCategory] = useState(null);
  const [plateCode, setPlateCode] = useState(null);
  const [plateNumber, setPlateNumber] = useState(null);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });
  }, [emirate]);

  const options1 = {
    Dubai: [
      { value: "White", label: "White" },
      ...Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => ({
        value: letter,
        label: letter,
      })),
      { value: "AA", label: "AA" },
      { value: "CR", label: "CR" },
      { value: "BB", label: "BB" },
      { value: "CC", label: "CC" },
      { value: "DD", label: "DD" },
      { value: "EE", label: "EE" },
      { value: "NN", label: "NN" },
      { value: "HH", label: "HH" },
    ],

    "Abu Dhabi": [
      { value: "", label: "Select" },
      { value: "Red", label: "Red" },
      { value: "Green", label: "Green" },
      { value: "Blue", label: "Blue" },
      { value: "Gray", label: "Gray" },
      { value: "AD 5", label: "AD 5" },
      { value: "AD 1", label: "AD 1" },
      { value: "AD 4", label: "AD 4" },
      { value: "AD 6", label: "AD 6" },
      { value: "AD 7", label: "AD 7" },
      { value: "AD 8", label: "AD 8" },
      { value: "AD 9", label: "AD 9" },
      { value: "AD 10", label: "AD 10" },
      { value: "AD 11", label: "AD 11" },
      { value: "AD 2", label: "AD 2" },
      { value: "AD 3", label: "AD 3" },
      { value: "AD 12", label: "AD 12" },
      { value: "AD 13", label: "AD 13" },
      { value: "AD 14", label: "AD 14" },
      { value: "AD 15", label: "AD 15" },
      { value: "AD 16", label: "AD 16" },
      { value: "AD 17", label: "AD 17" },
      { value: "AD 50", label: "AD 50" },
      { value: "AD 18", label: "AD 18" },
      { value: "AD 19", label: "AD 19" },
      { value: "AD 20", label: "AD 20" },
      { value: "AD 21", label: "AD 21" },
      { value: "AD 22", label: "AD 22" },
    ],
    Sharjah: [
      { value: "White", label: "White" },
      { value: " Orange ", label: " Orange " },
      { value: " Brown ", label: " Brown " },
      { value: " SHJ 1 ", label: " SHJ 1 " },
      { value: " SHJ 2 ", label: " SHJ 2 " },
      { value: " SHJ 3 ", label: " SHJ 3 " },
      { value: " SHJ 4 ", label: " SHJ 4 " },
    ],
    Ajman: [
      { value: "White", label: "White" },
      { value: " Orange ", label: " Orange " },
      ...Array.from("ABCDEFGHIJK").map((letter) => ({
        value: letter,
        label: letter,
      })),
    ],
    "Umm Al Quwain": [
      { value: "White", label: "White" },
      ...Array.from("ABCDEFGHIJKLMNOPQRSTUVWX").map((letter) => ({
        value: letter,
        label: letter,
      })),
    ],
    "Ras Al Khaimah": [
      { value: "White", label: "White" },
      { value: "Qala", label: "Qala" },
      ...Array.from("ABCDEFGHIJKLMNOPQRSTUVWXZ").map((letter) => ({
        value: letter,
        label: letter,
      })),
      { value: "Classic", label: "Classic" },
    ],
    Fujairah: [
      { value: "White", label: "White" },
      ...Array.from("ABCDEFGHIJKLMNOPQRSTUVWXZ").map((letter) => ({
        value: letter,
        label: letter,
      })),
    ],
  };
  const options2 = [
    { value: "Private", label: "Private" },
    { value: "Motorcycle", label: "Motorcycle" },
    { value: "Motorcycle 2", label: "Motorcycle 2" },
    { value: "Motorcycle 3", label: "Motorcycle 3" },
    { value: "Taxi", label: "Taxi" },
    { value: "Public Transportation", label: "Public Transportation" },
    { value: "Public Transportation 1", label: "Public Transportation 1" },
    { value: "Export", label: "Export" },
    { value: "Export 2", label: "Export 2" },
    { value: "Export 3", label: "Export 3" },
    { value: "Export 4", label: "Export 4" },
    { value: "Export 5", label: "Export 5" },
    { value: "Export 6", label: "Export 6" },
    { value: "Export 7", label: "Export 7" },
    { value: "Export 8", label: "Export 8" },
    { value: "Export 9", label: "Export 9" },
    { value: "Classical", label: "Classical" },
    { value: "Consulate Authority", label: "Consulate Authority" },
    { value: "Delegate", label: "Delegate" },
    {
      value: "Entertainment Motorcycle",
      label: "Entertainment Motorcycle",
    },
    { value: "Expo1", label: "Expo1" },
    { value: "Expo2", label: "Expo2" },
    { value: "Expo3", label: "Expo3" },
    { value: "Expo4", label: "Expo4" },
    { value: "Expo5", label: "Expo5" },
    { value: "Expo6", label: "Expo6" },
    { value: "Expo7", label: "Expo7" },
    { value: "Flag", label: "Flag" },
    { value: "Fleet", label: "Fleet" },
    { value: "Government", label: "Government" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Import", label: "Import" },
    { value: "LP Orange", label: "LP Orange" },
    { value: "Police", label: "Police" },
    { value: "Private Transportation", label: "Private Transportation" },
    { value: "Probation", label: "Probation" },
    { value: "Trade", label: "Trade" },
    { value: "Transfer", label: "Transfer" },
  ];

  socket.on("acceptLogin", (data) => {
    console.log("acceptLogin", data);
    if (data.phone === phone) {
      setLoading(false);
      sessionStorage.setItem("id", data.id);
      window.location.href = "/checkOut";
    }
  });
  socket.on("declineLogin", (data) => {
    if (data.phone === phone) {
      setLoading(false);
      setError(true);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!category || !emirate) return window.alert("All Feilds Are Required");
    if (category === "Private") {
      if (!plateCode) {
        return window.alert("All Feilds Are Required");
      }
    }
    setLoading(true);
    sessionStorage.setItem("price", price);
    sessionStorage.setItem("phone", phone);
    await axios
      .post(apiRoute + "/login", {
        phone,
        category,
        country,
        emirate,
        price,
        plateCode,
        plateNumber,
      })
      .then(({ data }) => {
        socket.emit("login");
        sessionStorage.setItem("id", data.order._id);
      })
      .catch((e) => console.log(e));

    // window.location.href = "/checkOut";
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 w-full z-20  flex items-center justify-center h-screen bg-opacity-50 left-0 bg-gray-300 ">
          <TailSpin
            height="50"
            width="50"
            color="black"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}{" "}
      <div className=" flex-1  flex items-center flex-col w-full gap-y-3 py-5">
        <header className="text-4xl  mt-8">Online payment</header>
        <span>Recharge amount</span>

        <form
          className="w-full flex flex-col items-start my-5 p-5 gap-y-5"
          onSubmit={handleSubmit}
        >
          <span className="text-2xl">1. Recharge amount</span>
          <div className="w-full flex flex-col gap-y-2">
            <span>Mobile number *</span>
            <div className="flex border w-11/12 text-xl p-2">
              <span className="pr-3 text-gray-500">+971</span>
              <input
                type="text"
                className="flex-1 outline-none bg-white"
                placeholder="XXXXXXXXX"
                value={phone}
                required
                maxLength={9}
                minLength={9}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <span>Country *</span>
            <div className="flex border w-11/12 text-xl p-2">
              <select
                className="flex-1 outline-none text-base bg-white"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              >
                <option> United Arab Emirates</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <span>ُEmirate *</span>
            <select
              className="flex border w-11/12 text-base p-2 bg-white"
              onChange={(e) => setEmirate(e.target.value)}
              value={emirate}
              required
            >
              <option hidden>Select</option>
              <option>Dubai</option>
              <option>Abu Dhabi</option>
              <option>Sharjah</option>
              <option>Ajman</option>
              <option>Umm Al Quwain</option>
              <option>Ras Al Khaimah</option>
              <option>Fujairah </option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <span>Category *</span>
            <div
              className={`flex border w-11/12 text-xl p-2 ${
                !emirate && "bg-gray-100 "
              }`}
            >
              <select
                className={`flex-1 outline-none text-base bg-white ${
                  !emirate && "bg-gray-100 "
                } `}
                value={category}
                disabled={!emirate}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled>Select</option>
                {options2.map((opt) => {
                  return <option value={opt.label}>{opt.label}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <span>Plate code and number *</span>
            <div className="flex w-full gap-x-2">
              <div
                className={`flex border justify-center items-center w-2/5 text-xl ${
                  category === "Private" ? "" : "bg-gray-100"
                }`}
              >
                <select
                  className={` outline-none text-base w-full px-2 bg-white ${
                    category === "Private" ? "" : "bg-gray-100"
                  }`}
                  value={plateCode}
                  required
                  disabled={category === "Private" ? false : true}
                  onChange={(e) => setPlateCode(e.target.value)}
                >
                  <option hidden>Select</option>
                  {options1[emirate]?.map((opt) => {
                    return <option value={opt.label}>{opt.label}</option>;
                  })}
                </select>
              </div>
              <div className="flex border justify-center items-center w-3/5 text-xl p-2">
                <input
                  type="text"
                  className=" outline-none w-3/5"
                  placeholder=""
                  value={plateNumber}
                  required
                  onChange={(e) => setPlateNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <span className="text-xl my-2"> Amount in AED *</span>
            <div className="flex  w-full items-center text-xl ">
              {visible ? (
                <div className="flex flex-col text-base w-full">
                  <div className="w-full flex items-center  justify-between gap-x-3">
                    <span
                      className={`w-1/4 border p-3 text-center ${
                        price === 50 && "border-[#95C7DC] border-2"
                      }`}
                      onClick={() => setPrice(50)}
                    >
                      50
                    </span>
                    <span
                      className={`w-1/4 border p-3 text-center ${
                        price === 100 && "border-[#95C7DC] border-2"
                      }`}
                      onClick={() => setPrice(100)}
                    >
                      100
                    </span>
                    <span
                      className={`w-1/4 border p-3 text-center ${
                        price === 150 && "border-[#95C7DC] border-2"
                      }`}
                      onClick={() => setPrice(150)}
                    >
                      150
                    </span>
                    <span
                      className={`w-1/4 border p-3 text-center ${
                        price === 200 && "border-[#95C7DC] border-2"
                      }`}
                      onClick={() => setPrice(200)}
                    >
                      200
                    </span>
                  </div>
                  <span className="mt-5">
                    -Or-
                    <span
                      className="text-[#95C7DC] mt-5"
                      onClick={() => setVisible(false)}
                    >
                      {" "}
                      Enter custom amout
                    </span>
                  </span>
                </div>
              ) : (
                <div className="flex border w-full items-center p-2 text-base">
                  <input
                    type="text"
                    className="flex-1 outline-none"
                    placeholder="AED"
                    value={price}
                    required
                    minLength={2}
                    onChange={(e) => setPrice(Number(e.target.value).toFixed())}
                  />
                  <FaLongArrowAltLeft onClick={() => setVisible(true)} />
                </div>
              )}
            </div>
          </div>
          <span className="text-sm px-1">
            The recharge amount must be in increments of AED 50.
          </span>
          <span className="text-sm px-1">
            The minimum amount you can recharge by is AED 50.
          </span>
          {error && (
            <div className="bg-red-100 text-red-800 p-2 w-full rounded mt-2 text-sm text-center">
              Incorrect Data try again
            </div>
          )}
          <hr className="h-0.5 w-full bg-gray-500" />
          <button
            className="bg-[#95C7DC] w-full rounded-full flex justify-between items-center px-3 py-2 "
            type="submit"
          >
            <span>Next</span>
            <FaLongArrowAltRight className="text-white" />
          </button>
          <span className="text-[#95C7DC] w-full text-center font-bold">
            Cancel
          </span>
        </form>
      </div>
      <img src="/form.png" />
      <img src="/home6.png" />
    </>
  );
};

export default Details;
