import React from "react";

const Success = () => {
  return (
    <div
      className="   py-1 flex items-center flex-col w-full md:w-1/3 h-screen justify-center"
      style={{
        backgroundImage: "url('/home.jfif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-11/12 max-w-md border rounded-xl shadow-sm p-6 py-8 mt-10 !bg-white flex justify-center flex-col items-center gap-y-5">
        <span className="text-[#1f80d1] text-center text-xl ">
          Successfully Transaction ...
        </span>
        <span
          className="bg-[#1f80d1] text-white rounded-md text-center px-5 py-1 mt-5 w-full cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          {" "}
          Back to home
        </span>
      </div>
    </div>
  );
};

export default Success;
