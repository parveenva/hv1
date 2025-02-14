"use client";
import React from "react";
import Button from "./Button";
import { useState } from "react";

const ContactForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    const wait = document.getElementById("wait");
    const complete = document.getElementById("complete");
    const incomplete = document.getElementById("incomplete");
    wait.style.display = "block";
    e.preventDefault();

    await fetch("/api/contact", {
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
            email:"",
            contact: "",
            message:""
          });
        }
        else{
          wait.style.display = "none";
          incomplete.style.display = "block";
          setTimeout(() => {
            incomplete.style.display = "none";
          }, 5000)
          
        }
      })
      .catch((err) => {
        if (err) {
          wait.style.display = "none";
          complete.style.display = "none";
          incomplete.style.display = "block";
          setTimeout(() => {
            incomplete.style.display = "none";
          }, 5000)
        }

        console.log(err);
      });
  }


  return (
    <>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <div className="relative mb-6" data-te-input-wrapper-init="">
          <input
            type="text"
            className="peer block shadow-md min-h-[auto] w-full rounded border bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="name"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            minLength="4"
            maxLength="30"
            required
          />
          {data.name.length === 0 ? (
            <label
              className=" pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              htmlFor="name"
            >
              Name
            </label>
          ) : null}
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init="">
          <input
            type="email"
            className="peer block shadow-md min-h-[auto] w-full rounded border bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="email"
            placeholder="Email address"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          {data.email.length === 0 ? (
            <label
              className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              htmlFor="email"
            >
              Email address
            </label>
          ) : null}
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init="">
          <input
            type="tel"
            className="peer shadow-md block min-h-[auto] w-full rounded border bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="tel"
            placeholder="Enter your Number"
            name="contact"
            value={data.contact}
            onChange={handleChange}
            required
            pattern="[0-9]{10}}"
            minLength="10"
            maxLength="10"
          />
          {data.contact.length === 0 ? (
            <label
              className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              htmlFor="tel"
            >
              Enter your number
            </label>
          ) : null}
        </div>
        <div className="relative mb-6" data-te-input-wrapper-init="">
          <textarea
            className="peer shadow-md block min-h-[auto] w-full rounded border bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="message"
            rows={2}
            placeholder="Your message in 200 words.."
            name="message"
            value={data.message}
            onChange={handleChange}
            minLength="4"
            maxLength="200"
            required
          />
          {data.message.length === 0 ? (
            <label
              htmlFor="message"
              className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-900 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Message
            </label>
          ) : null}
        </div>

   

        <div id="wait" className=" text-xs hidden mb-2 ">
          <span className="font-bold text-yellow-500">WAIT!</span> WHILE WE SEND
          YOUR REQUEST.
        </div>
        <div id="complete" className=" text-xs mb-2  hidden">
          <span className="font-bold text-green-500"> WAIT OVER! </span> YOUR
          MESSAGE IS RECIEVED AND THE TEAM WILL GET IN TOUCH WITH YOU SHORTLY.
        </div>
        <div id="incomplete" className=" text-xs mb-2 hidden">
          <span className="font-bold text-red-500"> OOPS </span> SOMETHING WENT
          WRONG PLEASE TRY AFTER SOMETIME.
        </div>

        <Button>Submit</Button>
      </form>
    </>
  );
};

export default ContactForm;
