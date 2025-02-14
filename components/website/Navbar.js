"use client";
import React from "react";
import logo from "@/images/logo.png";
import Image from "next/image";
import { BsTelephoneOutbound } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" bg-gradient-to-t from-rose-50 to-teal-50  shadow-sm  shadow-gray-400 fixed w-full px-8 md:px-auto mx-auto z-10 ">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Logo */}
        <div className="text-indigo-500 md:order-1">
         <Link href={'/'}><Image
            loading="lazy"
            priority={false}
            placeholder="blur"
            width={150}
            alt="logo"
            src={logo}
          /></Link>
        </div>
        <div className="text-[#581845] order-3 w-full md:w-auto md:order-2">
          <ul className="flex md:font-bold  md:text-base  font-semibold  text-xs justify-between">
            {/* Active Link = text-indigo-500
          Inactive Link = hover:text-indigo-500 */}
            <li className="md:px-4 md:py-2 ">
              <Link className=" hover:text-indigo-800" href="/">
                HOME
              </Link>
            </li>
            <li className="md:px-4 md:py-2">
              <Link className=" hover:text-indigo-800" href="/courses">
                COURSES
              </Link>
            </li>
            <li className="md:px-4 md:py-2">
              <Link className=" hover:text-indigo-800" href="/services">
                SERVICES
              </Link>
            </li>
            <li className="md:px-4 md:py-2 ">
              <Link className=" hover:text-indigo-800" href="/about">
                ABOUT
              </Link>
            </li>
            <li className="md:px-4 md:py-2 ">
              <Link className=" hover:text-indigo-800" href="/contact">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
        <div className="order-2 md:order-3">
          <div className="flex flex-row gap-4">
         <Link  href="tel:9717713724">  <BsTelephoneOutbound
              className="cursor-pointer"
              size={25}
              color={"#582c4f"}
            /></Link> 
            <Link href={"https://wa.me/919717713724"} target="_blank">
              {" "}
              <BsWhatsapp
                className="cursor-pointer"
                size={25}
                color={"#582c4f"}
              />{" "}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
