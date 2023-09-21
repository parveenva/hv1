import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import Seo from "../../components/common/Seo";
import FooterDefault from "../../components/footer/common-footer";

const EmployerConfirmation = () => {
  const [submittedJobDetails, setSubmittedJobDetails] = useState({});

  useEffect(() => {
    // Fetch the job details from the server using the apicall.js API handler
    fetch(`${process.env.NEXT_PUBLIC_API_URL}submittedJob`)
      .then((response) => response.json())
      .then((data) => {
        setSubmittedJobDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching submitted job details:", error);
        // Handle errors here if needed
      });
  }, []);

  return (
    <>
      <Seo pageTitle="Employer Confirmation Page" />

      {/* Header Span */}
      <span className="header-span"></span>

      <DefaulHeader />
      {/* End Main Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* Confirmation Content */}
      <section className="confirmation-section">
        <div className="auto-container">
          <div className="confirmation-block">
            <div className="inner-box">
              <div className="content">
                <h4>Job Posted Successfully!</h4>
                <p>
                  Congratulations! Your job posting has been successfully
                  submitted.
                </p>

                <h5>Job Details:</h5>
                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    {submittedJobDetails.company} - {submittedJobDetails.jobTitle}
                  </li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {submittedJobDetails.location}
                  </li>
                  <li>
                    <span className="icon flaticon-clock-3"></span>{" "}
                    {submittedJobDetails.time}
                  </li>
                  <li>
                    <span className="icon flaticon-money"></span>{" "}
                    {submittedJobDetails.salary}
                  </li>
                </ul>

                <ul className="job-other-info">
                  {submittedJobDetails.jobType?.map((val, i) => (
                    <li key={i} className={`${val.styleClass}`}>
                      {val.type}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add any additional content here as needed */}
            </div>
          </div>
        </div>
      </section>
      {/* End Confirmation Content */}

      <FooterDefault footerStyle="alternate5" />
      {/* End Main Footer */}
    </>
  );
};

export default EmployerConfirmation;
