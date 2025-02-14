"use client";
import React from "react";
import { FaHandshake } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";

import BannerCard from "./BannerCard";

const Banner = () => {
  return (
    <div className="w-full my-5  h-fit">
      <div className="lg:w-[80%] w-full p-5 items-center gap-5 justify-center  mx-auto flex flex-col">
        <h1>What Sets Us Apart</h1>
        <div className="w-full gap-8 md:gap-4 flex flex-col mt-5 md:flex-row justify-between ">
          <BannerCard
            icon={<FaHandshake size={55} color="#582c4f" />}
            title={"75+ Partner companies"}
            desc1={"Unlock a vast network of 75+ partner"}
            desc2={"companies for limitless opportunities."}
          />
          <BannerCard
            icon={<FaUserGraduate size={55} color="#582c4f" />}
            title={"250+ placements"}
            desc1={"Our track record speaks for itself "}
            desc2={"with hundreds of successful placements."}
          />
          <BannerCard
            icon={<FaBookReader size={55} color="#582c4f" />}
            title={"20+ courses"}
            desc1={"Choose from a variety of courses"}
            desc2={"tailored to your interests and goals."}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
