"use client";
import React from "react";

const BannerCard = ({ icon, title, desc1, desc2 }) => {
  return (
    <div className="md:w-1/3 p-5 h-62 w-full border flex rounded-[20px] bg-white flex-col gap-5 items-center shadow-md ">
      <div> {icon}</div>
      <h1 className="font-medium text-2xl capitalize">{title}</h1>
      <div className="text-center font-[300] text-lg">
        <p>{desc1}</p>
        <p>{desc2}</p>
      </div>
    </div>
  );
};

export default BannerCard;
