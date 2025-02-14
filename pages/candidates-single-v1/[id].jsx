import Link from "next/link";

import dynamic from "next/dynamic";
import candidates from "../../data/candidates";
import candidateResume from "../../data/candidateResume";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/common/Seo";
import Contact from "../../components/candidates-single-pages/shared-components/Contact";
import GalleryBox from "../../components/candidates-single-pages/shared-components/GalleryBox";
import Social from "../../components/candidates-single-pages/social/Social";
import JobSkills from "../../components/candidates-single-pages/shared-components/JobSkills";
import AboutVideo from "../../components/candidates-single-pages/shared-components/AboutVideo";

const CandidateSingleDynamicV1 = () => {
  const router = useRouter();
  const [candidate, setCandidate] = useState({});
  const id = router.query.id;

  
  async function fetchJobData() {
    console.log("in fetchJobData----------");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/byId/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("data----------"+data);

      setCandidate(data);

    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  }
  useEffect(() => {
   

    fetchJobData();
  
    return () => {};
  }, [id]);
  

  return (
    <>
      <Seo pageTitle="Jobs" />

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="candidate-detail-section">
  <div className="upper-box">
    <div className="auto-container">
      <div className="candidate-block-five">
        <div className="inner-box">
          <div className="content">
            <h4 className="name">
              {candidate?.firstName} {candidate?.lastName}
            </h4>
            <h4 className="name">
              {candidate?.phone} {candidate?.phone}
            </h4>
            <h4 className="name">
              {candidate?.leadStatus} 
            </h4>
            <h4 className="name">
              {candidate?.leadOwner} 
            </h4>
            <ul className="candidate-info">
              {/* <li className="designation">{candidate?.jobOrInternship}</li> */}
              <li>
                <span className="icon flaticon-map-locator"></span>
                {candidate?.currentCity}
              </li>
              
              <li>
                <span className="icon flaticon-clock"></span> Created On,
                {candidate?.createdAt}
              </li>
            </ul>

            <ul className="post-tags">
              {candidate?.skills?.map((val, i) => (
                <li key={i}>{val}</li>
              ))}
            </ul>
          </div>
          <div className="btn-box">


          <Link href={`/admin-dash/edit-candidate/${candidate._id}`}>
  <button className="btn btn-primary">
    <i className="fas fa-pencil-alt"></i> {/* Edit Icon */}
  </button>
</Link>
</div>
          <div className="btn-box">
            <a
              className="theme-btn btn-style-one"
              href={`/download/${candidate?.filePath}`}
              download
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
      {/*  <!-- Candidate block Five --> */}
    </div>
  </div>
  {/* <!-- Upper Box --> */}

  <div className="candidate-detail-outer">
    <div className="auto-container">
      <div className="row">
        <div className="content-column col-lg-8 col-md-12 col-sm-12">
        <aside className="sidebar">
            {/* End .sidebar-widget conadidate overview */}

            {/* End .sidebar-widget social-media-widget */}

            {/* End .sidebar-widget skill widget */}

            <div className="sidebar-widget contact-widget">
              <h4 className="widget-title">Log a Call</h4>
              <div className="widget-content">
                <div className="default-form">
                  <Contact />
                </div>
              </div>
            </div>
            {/* End .sidebar-widget contact-widget */}
          </aside>
  
        </div>
        {/* End .content-column */}

        <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
          <aside className="sidebar">
            <div className="sidebar-widget">
              <div className="widget-content">
                <ul className="job-overview">
                  <li>
                    <i className="icon icon-calendar"></i>
                    <h5>Experience:</h5>
                    <span>
                      {/* {candidate?.experience.length === 0
                        ? "No experience"
                        : `${candidate?.experience.length} Years`} */}
                    </span>
                  </li>

                  <li>
                    <i className="icon icon-expiry"></i>
                    <h5>Age:</h5>
                    <span>{candidate?.age} Years</span>
                  </li>

                  <li>
                    <i className="icon icon-rate"></i>
                    <h5>Current Salary:</h5>
                    <span>
                      {candidate?.isAvailable
                        ? `$${candidate?.hourlyRate}/hour`
                        : "Not available"}
                    </span>
                  </li>

                  <li>
                    <i className="icon icon-salary"></i>
                    <h5>Expected Salary:</h5>
                    <span>${candidate?.expectedSalary}</span>
                  </li>

                  <li>
                    <i className="icon icon-user-2"></i>
                    <h5>Gender:</h5>
                    <span>{candidate?.gender}</span>
                  </li>

                  <li>
                    <i className="icon icon-language"></i>
                    <h5>Languages:</h5>
                    <span>{candidate?.languages?.join(", ")}</span>
                  </li>

                  <li>
                    <i className="icon icon-degree"></i>
                    <h5>Education Level:</h5>
                    {/* <span>{candidate?.education[0]?.degree}</span> */}
                  </li>
                </ul>
              </div>
            </div>
            {/* End .sidebar-widget conadidate overview */}

          </aside>
          {/* End .sidebar */}
        </div>
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

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV1), {
  ssr: false,
});
