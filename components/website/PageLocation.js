"use client";
import React from "react";
import background from "../../images/background.jpg";
import Image from "next/image";
import { BsFillHouseDoorFill } from "react-icons/bs";
import Link from "next/link";

const PageLocation = ({ title }) => {
  return (
    <div className="w-full h-[30vh] relative ">
      <Image
        src={background}
        alt="Your Image"
        className="object-cover  h-[30vh]  w-full"
        loading="lazy"
        priority={false}
        placeholder="blur"
      />
      <div className="absolute bottom-0 flex-col flex w-full h-full  px-2 text-center   gap-4 justify-end pb-5">
        <div className=" text-[#582c4f] font-bold text-2xl md:text-3xl flex items-center justify-center flex-row gap-2 ">
          <p>{title}</p>
          <p>/</p>
          <Link href={"/"}>
            <BsFillHouseDoorFill
              className="cursor-pointer hover:text-indigo-900"
              size={32}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageLocation;
