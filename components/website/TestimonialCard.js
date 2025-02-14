'use client'
import React from "react";
import akshat from "../../images/testimonials/akshat.webp";
import abhishek from "../../images/testimonials/Abhishek.webp";
import akarshi from "../../images/testimonials/akarshi.webp";
import ankur from "../../images/testimonials/Ankur.webp";
import ayush from "../../images/testimonials/Ayush.webp";
import rahul from "../../images/testimonials/rahul.webp";
import shivam from "../../images/testimonials/Shivam.webp";
import sushant from "../../images/testimonials/sushant.webp";
import vineet from "../../images/testimonials/vineet.webp";

import Testimoni from "./Testimoni";

const TestimonialCard = () => {
  return (
    <div id="testimonials" className="w-full h-fit  bg-white">
      <div className="md:w-[80%] p-5 mx-auto w-full h-fit flex flex-col gap-10 items-center   ">
        <div>
          <h1>Testimonials</h1>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
          <Testimoni
            image={akshat}
            name={"Akshat"}
            review={`I am grateful to Code91 for providing me with
the skills and knowledge that helped me
secure a job at a top software company.
The training program was practical and
hands-on, and the faculty members were
knowledgeable and supportive.`}
          />

          <Testimoni
            image={sushant}
            name={"SUSHANT"}
            review={`I was in a difficult situation when I wanted to
learn Java but couldn't afford it. But then I was
introduced to Code91 training program that
offered free classes. Now I am employed with a
prestigious company earning a good
package.
`}
          />

          <Testimoni
            image={vineet}
            name={"VINEET"}
            review={`I want to express my heartfelt gratitude to
Code91 for helping me secure a job in a
reputed company ANR Software. The training
and guidance that I received here not only
prepared me for the challenges ahead but
also helped me to discover my strengths and
potential.`}
          />

          <Testimoni
            image={akarshi}
            name={"AKARSHI"}
            review={`I recently received training from Code91, and it
was a game-changer for me. With the help of
the training received, I was able to crack a
software development interview and got a job
in my dream field. `}
          />

          <Testimoni
            image={rahul}
            name={"RAHUL"}
            review={`I am extremely grateful to the Pay After
Placement Java training program at Code91
for paving the way toward my dream career.
The trainers are exceptionally skilled and their
guidance was instrumental in my successful
job placement.
`}
          />

          <Testimoni
            image={ankur}
            name={"ANKUR"}
            review={`I have successfully secured a position as a
Software Engineer Trainee with a salary
package of 4.2 LPA, following my completion of
training at Code91. I would highly recommend
Code91 services to anyone looking to advance
their career in the field of technology. `}
          />
          <Testimoni
            image={ayush}
            name={"AYUSH "}
            review={`Code91's software development training and resume assistance were invaluable. The training honed my expertise, and the resume guidance presented my skills effectively. Thanks to Code91, I am now happily employed as an SDE in an MNC `}
          />
          <Testimoni
            image={abhishek}
            name={"ABHISHEK"}
            review={`Code91's software development training and resume making assistance were instrumental in my career success. The comprehensive training equipped me with the necessary skills, and the resume guidance helped me create an impactful profile. Thanks to Code91, I am now successfully placed as an SDE in an MNC. `}
          />
          <Testimoni
            image={shivam}
            name={"SHIVAM"}
            review={`I am grateful to Code91 for their exceptional software development training and resume support. Their program sharpened my skills, and the resume guidance helped me stand out to employers. Thanks to Code91, I am now flourishing as an SDE in an MNC. `}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
