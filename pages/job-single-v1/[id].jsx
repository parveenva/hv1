import dynamic from "next/dynamic";
// import jobs from "../../data/job-featured";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader2 from "../../components/header/DefaulHeader2";
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
import Link from "next/link";


const JobSingleDynamicV1 = () => {
  const router = useRouter();
    const { asPath } = router;

  const [company, setCompany] = useState({});
 
  const { logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();

  
  const currentPath = window.location.pathname;

  // Extract the last part of the path as the dynamic parameter
  const parts1 = currentPath.split('/');
  const jobId = parts1[parts1.length - 1];


  const [formData, setFormData] = useState({
    candidateId: getUserId(),
    jobId: jobId,
    coverLetter: "",
  });

  const [isApplied, setIsApplied] = useState(false);
  const [applyMessage, setApplyMessage] = useState(""); // Initialize state


  // Handle form submission
  const handleApplyJobAPI = async (e) => {
    // e.preventDefault();

    console.log("in handleApplyJobAPI");

     try {
      // Make API request to handle form submission
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}application`, {
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

          setApplyMessage(data.message); // Set the message from the API response

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}job/${jobId}`);
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
    // else setCompany(jobs.find((company) => company.id == id));

    return () => {};
  }, [jobId]);

  return (
    <>
      <Seo pageTitle="Jobs" />

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
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
                  <h4>{company?.jobTitle}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {company?.company ? company?.company.name : 'Code91'}
                    </li>
                    {/* compnay info */}
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {company?.city}
                    </li>
                    {/* location info */}
                    {/* time info */}
                    <li>
                                <span className="icon flaticon-money"></span>{" "}
                                {company.salaryType === 'fixed' ? (
  <span>{company.salaryFixed}</span>
) : (
  <span>{company.salaryRangeMin} - {company.salaryRangeMax}</span>
)}
                            </li>
                          {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-info">
                        <span className="icon flaticon-lightbulb"></span>
                            {company?.skills?.map((val, i) => (
                                <li key={i} >
                                    {val}

                                </li>
                            ))}
                        </ul>
                        {/* End .job-other-info */}

                        
                        <ul className="job-info">

                        <li>
                        <span className="icon flaticon-notebook"></span>

                                 {company.jd}
                            </li>
                           </ul>

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
        {getIsLoggedIn() && getUserRole() === "candidate" ? (
          isApplied ? (

                  <div> {applyMessage && <p style={{ color: 'green' }}>{applyMessage}</p>}

            <span className="theme-btn btn-style-one">Applied</span>
            </div>
    
          ) : (
            <button
              className="theme-btn btn-style-one"
              onClick={handleApplyJobAPI}
            >
              Apply For Job
            </button>
          )
        ) : (

          <Link href="#"              
          className="theme-btn btn-style-one call-modal"
          data-bs-toggle="modal"
          data-bs-target="#registerModal"
       >
            Apply For Job
          </Link>
       
       
         
        )}
      </div>
  

                {/* End apply for job btn */}

                {/* <!-- Modal --> */}
                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

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
