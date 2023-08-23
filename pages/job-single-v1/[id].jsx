import dynamic from "next/dynamic";
// import jobs from "../../data/job-featured";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/common/Seo";
import RelatedJobs from "../../components/job-single-pages/related-jobs/RelatedJobs";
import JobOverView from "../../components/job-single-pages/job-overview/JobOverView";
import JobSkills from "../../components/job-single-pages/shared-components/JobSkills";
import CompnayInfo from "../../components/job-single-pages/shared-components/CompanyInfo";
import MapJobFinder from "../../components/job-listing-pages/components/MapJobFinder";
import SocialTwo from "../../components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "../../components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "../../components/job-single-pages/shared-components/ApplyJobModalContent";
import { useAuth } from "../../app/authContext";

const JobSingleDynamicV1 = () => {
  const router = useRouter();
    const { asPath } = router;

  const [company, setCompany] = useState({});
 
  const { userRole, isLoggedIn ,uId} = useAuth();

  
  const currentPath = window.location.pathname;

  // Extract the last part of the path as the dynamic parameter
  const parts1 = currentPath.split('/');
  const jobId = parts1[parts1.length - 1];


  const [formData, setFormData] = useState({
    candidateId: uId,
    jobId: jobId,
    coverLetter: "",
  });

  const [isApplied, setIsApplied] = useState(false);

  // Handle form submission
  const handleApplyJobAPI = async (e) => {
    e.preventDefault();

    try {
      // Make API request to handle form submission
      const response = await fetch(`/api/apicall?endpoint=application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if(data.error){
        throw new Error("Invalid Credentials");
      }
      // Handle the API response if needed
      console.log("Job Applied successfully:", data);
      setIsApplied(true); // Set state to indicate successful application

    } catch (error) {
      console.error("Error submitting form:", error);
//      setError("Incorrect email or password. Please try again."); // Set error message for incorrect credentials
    }
  };

  

  useEffect(() => {
    
    console.log("Job ID:", jobId);


    

    if (!jobId) return;




    async function fetchJobData() {
      try {
        const response = await fetch(`/api/apicall?endpoint=job/${jobId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data----------"+data);
 
        setCompany(data);

      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    }

    fetchJobData();


    // if (!id) <h1>Loading...</h1>;
    // else setCompany(jobs.find((item) => item.id == id));

    return () => {};
  }, [jobId]);

  return (
    <>
      <Seo pageTitle="Job Single Dyanmic V1" />

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src={company?.logo} alt="logo" />
                  </span>
                  <h4>{company?.jobTitle}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {company?.company}
                    </li>
                    {/* compnay info */}
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {company?.location}
                    </li>
                    {/* location info */}
                    <li>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {company?.time}
                    </li>
                    {/* time info */}
                    <li>
                      <span className="icon flaticon-money"></span>{" "}
                      {company?.salary}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}
{/* 
                  <ul className="job-other-info">
                    {company?.jobType?.map((val, i) => (
                      <li key={i} className={`${val.styleClass}`}>
                        {val.type}
                      </li>
                    ))}
                  </ul> */}
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}
  
                <div className="btn-box">
        {isLoggedIn && userRole === "candidate" ? (
          isApplied ? (
            <span className="theme-btn btn-style-one">Applied</span>
          ) : (
            <button
              className="theme-btn btn-style-one"
              onClick={handleApplyJobAPI}
            >
              Apply For Job
            </button>
          )
        ) : (
          <a
            href="#"
            className="theme-btn btn-style-one"
            data-bs-toggle="modal"
            data-bs-target="#applyJobModal"
          >
            Apply For Job
          </a>
        )}
        <button className="bookmark-btn">
          <i className="flaticon-bookmark"></i>
        </button>
      </div>
  

                {/* End apply for job btn */}

                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="applyJobModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      {/* End modal-header */}

                      <ApplyJobModalContent />
                      {/* End PrivateMessageBox */}
                    </div>
                    {/* End .send-private-message-wrapper */}
                  </div>
                </div>
                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">


{/* // description start */}


<div className="job-detail">
      <h4>Job Description</h4>
      <p>
      {company?.jd}

        </p>
     </div>



{/* desciption end */}


                {/* End jobdetails content */}

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div>
                {/* <!-- Other Options --> */}

                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                    <div className="text">
                      2020 jobs live - 293 added today.
                    </div>
                  </div>
                  {/* End title box */}

                  <RelatedJobs />
                </div>
                {/* <!-- Related Jobs --> */}
              </div>
              {/* End .content-column */}

              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV1), {
  ssr: false,
});
