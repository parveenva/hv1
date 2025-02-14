"use client"
import React from "react";
import Card from "./Card";
import ai from "../../images/course/ai.webp";
import backend from "../../images/course/backend.webp";
import ds from "../../images/course/ds.webp";
import dsa from "../../images/course/dsa.webp";
import fe from "../../images/course/fe.webp";
import java from "../../images/course/java.webp";
import js from "../../images/course/js.webp";
import mern from "../../images/course/mern.webp";
import ml from "../../images/course/ml.webp";
import net from "../../images/course/net.webp";
import nosql from "../../images/course/nosql.webp";
import python from "../../images/course/python.webp";

import Data from "../../utils/MockData";

const TrendingCards = () => {
  return (
    <div className="h-fit  w-full flex flex-col gap-8 items-center bg-white py-10 px-5 ">
      <h1>Trending Courses</h1>
      <div className=" w-full mt-4  md:w-[90%] lg:w-[80%] mx-auto grid  grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        <Card
          imagefile={ai}
          title={Data.courses.course9.name}
          paragraph={Data.courses.course9.desc}
        />
        <Card
          imagefile={backend}
          title={Data.courses.course7.name}
          paragraph={Data.courses.course7.desc}
        />
        <Card
          imagefile={ds}
          title={Data.courses.course8.name}
          paragraph={Data.courses.course8.desc}
        />
        <Card
          imagefile={dsa}
          title={Data.courses.course3.name}
          paragraph={Data.courses.course3.desc}
        />
        <Card
          imagefile={fe}
          title={Data.courses.course6.name}
          paragraph={Data.courses.course6.desc}
        />
        <Card
          imagefile={java}
          title={Data.courses.course1.name}
          paragraph={Data.courses.course1.desc}
        />
        <Card
          imagefile={js}
          title={Data.courses.course5.name}
          paragraph={Data.courses.course5.desc}
        />
        <Card
          imagefile={mern}
          title={Data.courses.course2.name}
          paragraph={Data.courses.course2.desc}
        />
        <Card
          imagefile={ml}
          title={Data.courses.course10.name}
          paragraph={Data.courses.course10.desc}
        />
        <Card
          imagefile={net}
          title={Data.courses.course12.name}
          paragraph={Data.courses.course12.desc}
        />
        <Card
          imagefile={nosql}
          title={Data.courses.course11.name}
          paragraph={Data.courses.course11.desc}
        />
        <Card
          imagefile={python}
          title={Data.courses.course4.name}
          paragraph={Data.courses.course4.desc}
        />
      </div>
    </div>
  );
};

export default TrendingCards;
