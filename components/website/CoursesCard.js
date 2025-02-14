"use client";
import React from "react";
import Image from "next/image";

import Button from "./Button";
import Link from "next/link";

const CoursesCard = ({ imgsrc, Data, type }) => {
  return (
    <div className="w-full h-fit p-4 md:p-10  bg-white">
      <div
        className={
          type === true
            ? "container p-5 shadow-md  shadow-slate-400  mx-auto  rounded-xl border items-center justify-between flex flex-col md:flex-row gap-5"
            : "container p-5 shadow-md  shadow-slate-400  mx-auto  rounded-xl border items-center justify-between flex flex-col md:flex-row-reverse gap-5"
        }
      >
        <div className="border-b-black "></div>

        <div className="relative  p-2">
          <Image
            src={imgsrc}
            alt="ai"
            width={500}
            loading="lazy"
            priority={false}
            placeholder="blur"
            className="rounded-xl shadow-md brightness-50  object-contain overflow-hidden  "
          />
        </div>
        <div className="flex flex-col  w-full lg:w-1/2 gap-5 p-2 ">
          <h1 className="text-left">{Data.name}</h1>
          {/* <p className="text-lg md:text-lg font-[400]">{Data.desc}</p> */}
          <p className=" text-md md:text-md  font-semibold">
            <span className="font-bold">COURSE DURATION : </span>{" "}
            {Data.duration}
          </p>
          <div className="flex flex-col flex-wrap">
            {Data.highlights.map((highlight, index) => (
              <span
                key={index}
                className="inline-block  text-xs     py-1 md:text-sm font-semibold text-gray-700 mr-1 mb-1"
              >
                &#10004; {highlight}
              </span>
            ))}
          </div>
          <Link href={'/contact#contact-us'}>
          <Button>Request a callback</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
