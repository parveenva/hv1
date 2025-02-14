"use client";
import React from "react";
import { useState } from "react";
import Button from "./Button";
import form from '../../images/logo1.png'
import Image from "next/image";

const HomeForm = () => {
  const [data, setData] = useState({ name: "", contact: "" });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    const wait = document.getElementById("wait");
    const complete = document.getElementById("complete");
    const incomplete = document.getElementById("incomplete");
    wait.style.display = "block";
    e.preventDefault();

    await fetch("/api/home", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          wait.style.display = "none";
          complete.style.display = "block";
          setTimeout(() => {
            complete.style.display = "none";
          }, 5000);

          setData({
            name: "",
            contact: "",
          });
        } else {
          wait.style.display = "none";
          incomplete.style.display = "block";
          setTimeout(() => {
            incomplete.style.display = "none";
          }, 5000);
        }
      })
      .catch((err) => {
        if (err) {
          wait.style.display = "none";
          complete.style.display = "none";
          incomplete.style.display = "block";
          setTimeout(() => {
            incomplete.style.display = "none";
          }, 5000);
        }

        console.log(err);
      });
  }

  return (
    <div className="w-full h-fit  bg-white ">
      <div className="container mx-auto flex gap-5  justify-between flex-col">
        <h1 capitalise>Be a part of our upcoming Campus Drive!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
        <Image
          src={form}
          alt="partner"
          loading="lazy"
          width={1000}
          height={400}
          priority={false}
          placeholder="blur"
          className=" object-cover "
        />


        </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col  gap-5 p-5 w-full justify-center items-center"
          >
            <input
              className="p-4 w-full border rounded-xl shadow-md"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              minLength="4"
              maxLength="30"
              required
            />
            <input
              className="p-4 w-full  border rounded-xl shadow-md"
              type="tel"
              name="contact"
              pattern="[0-9]{10}}"
              value={data.contact}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
              minLength="10"
              maxLength="10"
              required
            />
            <div className="w-fit">
              {" "}
              <Button>Submit</Button>{" "}
            </div>
            <div id="wait" className=" text-xs hidden mb-2 ">
              <span className="font-bold text-yellow-500">WAIT!</span> WHILE WE
              SEND YOUR REQUEST.
            </div>
            <div id="complete" className=" text-xs mb-2  hidden">
              <span className="font-bold text-green-500"> WAIT OVER! </span>{" "}
              YOUR MESSAGE IS RECIEVED AND THE TEAM WILL GET IN TOUCH WITH YOU
              SHORTLY.
            </div>
            <div id="incomplete" className=" text-xs mb-2 hidden">
              <span className="font-bold text-red-500"> OOPS </span> SOMETHING
              WENT WRONG PLEASE TRY AFTER SOMETIME.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeForm;
