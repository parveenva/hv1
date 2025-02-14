"use client";
import React from "react";
import Button from "./Button";
import Link from "next/link";
import hero from "../../images/hero.avif";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      <div className="w-full grid  grid-cols-1 lg:grid-cols-2 items-center justify-center  md:pt-16   gap-5  h-auto">
        <div className=" w-full flex p-8 flex-col gap-5">
          <h2 className="text-3xl  font-black text-[#582c4f] md:text-5xl">
            Transform Your Tech Career, Get High Paying Jobs!{" "}
            <span className="text-[#E0115F]">PAY AFTER PLACEMENT</span>
          </h2> 
          {/* <p className=" font-semibold text-[#582c4f]  text-2xl">
            LAUNCH YOUR CAREER WITH OUR FULLSTACK DEVELOPMENT COURSE
          </p> */}
          <Link href={"/services"}>
            {" "}
            <Button>Explore More</Button>{" "}
          </Link>
        </div>
        
        <div className="hidden md:block">
        <Image
          src={hero}
          alt="ai"
          width={2000}
          loading="lazy"
          priority={false}
          placeholder="blur"
          // style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }}
          className="  object-contain brightness-75  "
        /></div>


       

      </div>
    </>
  );
};

export default Hero;
