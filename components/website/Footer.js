"use client";
import React from "react";
import logo from "@/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaBloggerB } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="w-full  bottom-0 h-fit relative bg-gradient-to-t from-rose-100 to-teal-50 border   p-5 md:p-10">
        <div className="container p-5  mx-auto  rounded-xl  shadow-md border  ">
          <div className="flex flex-col md:flex-row justify-between r gap-5">
            <div className="flex flex-col md:w-1/4 gap-4 ">
              <p className="text-2xl font-bold text-gray-700">About</p>
              <Image width={150} src={logo} alt="logo" />
              <p className="text-xs text-gray-800">
                Code91 is an exceptional training institute located in Noida,
                which is widely regarded as one of the top online learning
                platforms and job-focused IT training centers in the Delhi NCR
                region.
              </p>
            </div>
            <div className="flex flex-col md:w-1/4 ">
              <p className="text-2xl font-bold text-gray-700">Navigation</p>
              <ul className="flex flex-col text-gray-800 justify-between">
                <li className="border-b border-gray-400 hover:text-gray-600 hover:font-bold cursor-pointer pt-2">
                  <Link href="/"> Home </Link>
                </li>
                <li className="border-b border-gray-400 hover:text-gray-600 hover:font-bold cursor-pointer pt-2">
                  <Link href="/courses"> Courses </Link>
                </li>
                <li className="border-b border-gray-400 hover:text-gray-600 hover:font-bold cursor-pointer pt-2">
                  <Link href="/services"> Services </Link>
                </li>
                <li className="border-b border-gray-400 hover:text-gray-600 hover:font-bold cursor-pointer pt-2">
                  <Link href="/about"> About </Link>
                </li>
                <li className="border-b border-gray-400 hover:text-gray-600 hover:font-bold cursor-pointer pt-2">
                  <Link href="/contact"> Contact </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col md:w-1/4 gap-2 ">
              <p className="text-2xl font-bold text-gray-700">Address</p>
              <p className="text-xs text-gray-800">
                {" "}
                C94, Udhyog Marg, near Jaypee Outlet, C Block, Sector 8, Noida,
                Uttar Pradesh 201301
              </p>
              <p className="text-2xl font-bold text-gray-700">Contact</p>
              <div className="flex flex-row gap-2 ">
                <p className="font-semibold text-gray-700">Mobile :</p>
                <Link  href="tel:9717713724" className="hover:font-semibold text-gray-700 cursor-pointer">
                  9717713724
                </Link>
              </div>
              <div className="flex flex-row gap-2 ">
                <p className="font-semibold text-gray-700">Email :</p>
                <p className="hover:font-semibold text-gray-700 cursor-pointer">
                  <Link href="mailto:contact@code91.co">
                    {" "}
                    contact@code91.co{" "}
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex flex-col md:w-1/4 ">
              <p className="text-2xl font-bold text-gray-700">Social Media</p>
              <ul className="flex flex-col text-gray-800 justify-between">
                <Link
                  href={"https://www.instagram.com/code91_co/"}
                  target="_blank"
                >
                  {" "}
                  <li className="border-b border-gray-400 hover:font-bold  flex gap-2 hover:text-gray-600 cursor-pointer pt-2">
                    <FaInstagram size={20} /> Instagram
                  </li>
                </Link>
                <Link
                  href={"https://www.linkedin.com/company/code91foru/"}
                  target="_blank"
                >
                  {" "}
                  <li className="border-b border-gray-400 hover:font-bold flex gap-2 hover:text-gray-600 cursor-pointer pt-2">
                    <FaLinkedinIn size={20} /> Linkedin
                  </li>
                </Link>
                <Link
                  href={
                    "https://www.facebook.com/people/Code91/100093543467075/"
                  }
                  target="_blank"
                >
                  {" "}
                  <li className="border-b border-gray-400 hover:font-bold flex gap-2 hover:text-gray-600 cursor-pointer pt-2">
                    <FaFacebookF size={20} /> Facebook
                  </li>
                </Link>
                <Link href={"https://twitter.com/Code91Co"} target="_blank">
                  {" "}
                  <li className="border-b border-gray-400 hover:font-bold flex gap-2 hover:text-gray-600 cursor-pointer pt-2">
                    <FaTwitter size={20} /> Twitter
                  </li>
                </Link>
                <Link href={"https://code91co.blogspot.com/"} target="_blank">
                  {" "}
                  <li className="border-b border-gray-400 hover:font-bold flex gap-2 hover:text-gray-600 cursor-pointer pt-2">
                    <FaBloggerB size={20} /> Blogger
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
