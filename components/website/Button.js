"use client";
import React from "react";

const Button = ({ children }) => {
  return (
    <button className="h-12 px-6  w-fit text-lg text-white transition-colors duration-150 bg-[#582c4f] rounded-lg focus:shadow-outline hover:bg-[#E0115F] hover:text-black">
      {children}
    </button>
  );
};

export default Button;
