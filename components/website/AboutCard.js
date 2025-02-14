"use client";
import React from "react";
import Image from "next/image";

const AboutCard = ({ imagesrc, paragraph, type }) => {
  return (
    <div
      className={
        type === true ? "w-full p-5 h-fit " : "w-full p-5 h-fit bg-white"
      }
    >
      <div
        className={
          type === true
            ? "flex flex-col items-center justify-around container mx-auto w-full gap-5 h-auto lg:flex-row "
            : " justify-around items-center gap-5 flex container flex-col  mx-auto w-full h-auto lg:flex-row-reverse"
        }
      >
      <div className="relative">
        <Image
          src={imagesrc}
          alt="ai"
          width={500}
          height={500}
          loading="lazy"
          priority={false}
          placeholder="blur"
          className="   overflow-hidden object-contain brightness-75  "
        /></div>

        <div className="flex flex-col  w-full lg:w-[50%] gap-5 p-2 ">
          <div className="text-base  font-[300]">
            <span className="font-bold text-2xl">{"CODE91"}</span>
            {paragraph}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
