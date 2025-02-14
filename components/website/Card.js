"use client";
import React from "react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

const Card = ({ imagefile, title, paragraph, highlights }) => {
  return (
    <div className="w-full bg-white overflow-hidden flex flex-col justify-between   shadow-md rounded-xl border">
      <Image
        className="w-full brightness-50 h-40 object-cover "
        src={imagefile}
        alt={title}
        loading="lazy"
        priority={false}
        placeholder="blur"
      />
      <div className="px-6 py-4 ">
        <div className="font-[400] text-xl mb-2 ">{title}</div>
        <p className="font-[300] text-sm">{paragraph.substring(0, 150)}....</p>
      </div>
      <div className="px-4 py-4 ">
        <Link href={"/courses"}>
          <Button>Read More</Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
