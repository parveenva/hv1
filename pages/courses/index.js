import React from "react";
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
import Data from "../../data/MockData";
 import CoursesCard from "../../components/CoursesCard";
import Head from "next/head";

const page = () => {
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta
          name="description"
          content="Code91 is an exceptional training institute located in Noida, which is widely regarded as one of the top online learning platforms and job-focused IT training centers in the Delhi NCR region."
          key="desc"
        />
      </Head>
       <div className="flex flex-col gap-6 ">
        <CoursesCard imgsrc={java} type={true} Data={Data.courses.course1} />
        <CoursesCard imgsrc={mern} type={false} Data={Data.courses.course2} />
        <CoursesCard imgsrc={dsa} type={true} Data={Data.courses.course3} />
        <CoursesCard imgsrc={python} type={false} Data={Data.courses.course4} />
        <CoursesCard imgsrc={js} type={true} Data={Data.courses.course5} />
        <CoursesCard
          imgsrc={backend}
          type={false}
          Data={Data.courses.course7}
        />
        <CoursesCard imgsrc={ds} type={true} Data={Data.courses.course8} />
        <CoursesCard imgsrc={ai} type={false} Data={Data.courses.course9} />
        <CoursesCard imgsrc={nosql} type={true} Data={Data.courses.course11} />
        <CoursesCard imgsrc={net} type={false} Data={Data.courses.course12} />
        <CoursesCard imgsrc={ml} type={true} Data={Data.courses.course10} />
        <CoursesCard imgsrc={fe} type={false} Data={Data.courses.course6} />
      </div>
    </>
  );
};

export default page;
