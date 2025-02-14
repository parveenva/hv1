"use client"
import React from "react";

import Button from "./Button";
import Link from "next/link";

const SevicesCard = ({ data }) => {
  return (
    <>
      <div className="w-full h-fit p-5 ">
        <div className="container mx-auto flex flex-col justify-around gap-4 items-center border p-2 md:p-5  rounded-xl shadow-md">
          <div className="w-full text-center   ">
            <h1>{data.title}</h1>
          </div>

          <div className="accordion flex flex-col w-full  h-fit">
            {/*  Panel 1  */}
            {data.questions.map((question) => (
              <div
                key={question.id}
                className=" flex flex-col p-2  justify-center gap-4 w-full"
              >
                <input
                  type="checkbox"
                  name="panel"
                  id={question.id}
                  className="hidden input"
                />
                <label
                  htmlFor={question.id}
                  className="relative block label bg-rose-50 text-gray-700 text-base font-medium p-4 shadow border-b border-grey"
                >
                  {question.question}
                </label>
                <div className="accordion__content overflow-hidden bg-grey-lighter">
                  <p
                    className="accordion__body p-4 font-[300] text-base"
                    id="panel1"
                  >
                    {question.answere}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link href={"/contact#contact-us"}>
            {" "}
            <Button>Request a callback</Button>{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default SevicesCard;
