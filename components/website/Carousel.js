"use client";
import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Image from "next/image";
import p1 from "../../images/partners/p1.webp";
import p2 from "../../images/partners/p2.webp";
import p3 from "../../images/partners/p3.webp";
import p4 from "../../images/partners/p4.webp";
import p5 from "../../images/partners/p5.webp";
import p6 from "../../images/partners/p6.webp";
import p7 from "../../images/partners/p7.webp";
import p8 from "../../images/partners/p8.webp";
import p9 from "../../images/partners/p9.webp";

const Carousel = ({ images, interval }) => {
  const slides = [
    {
      url: p1,
    },
    {
      url: p2,
    },
    {
      url: p3,
    },

    {
      url: p4,
    },
    {
      url: p5,
    },
    {
      url: p6,
    },
    {
      url: p7,
    },
    {
      url: p8,
    },
    {
      url: p9,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full bg-white items-center p-4 flex flex-col gap-5 mt-5 pb-10">
      <div>
        {" "}
        <h1>Our Corporate Partners</h1>
      </div>
      <div className=" h-fit md:w-[50%] w-full border bg-white rounded-xl shadow-md mx-auto  px-4 relative group flex flex-row justify-around">
        <Image
          src={slides[currentIndex].url}
          alt="partner"
          loading="lazy"
          priority={false}
          placeholder="blur"
          className="w-fit h-full rounded-2xl object-cover duration-500"
        />
        {/* Left Arrow */}
        <div className="block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
