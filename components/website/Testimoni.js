"use client";
import React from "react";
import Image from "next/image";
import { BsStarFill } from "react-icons/bs";

const Testimoni = ({ image, name, review }) => {
  return (
    <div className="rounded-xl w-full  shadow-md border flex flex-col items-center justify-center gap-5  p-4">
      <Image
        loading="lazy"
        priority={false}
        placeholder="blur"
        alt="Man"
        src={image}
        className=" h-52 w-fit object-contain "
      />

      <h1 className="text-2xl">{name}</h1>
      <div className="flex flex-row items-center justify-center gap-2">
        <BsStarFill size={20} color="green" />
        <BsStarFill size={20} color="green" />
        <BsStarFill size={20} color="green" />
        <BsStarFill size={20} color="green" />
        <BsStarFill size={20} color="green" />
      </div>
      <p className="font-[300] text-sm ">{review}</p>
    </div>
  );
};

export default Testimoni;
