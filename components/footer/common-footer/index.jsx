import CopyrightFooter from "./CopyrightFooter";
import FooterContent from "./FooterContent";
import Link from "next/link";
import React from "react";
import BottomNavigation from "./BottomNavigation"; // Adjust the import path


const index = ({ footerStyle = "" }) => {
  return (
    <footer className={`main-footer ${footerStyle}`}>
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <img src="/images/logo.png" alt="brand" />
                  </a>
                </div>
                <p className="phone-num">
                  <span>Call us </span>
                  <a href="thebeehost@support.com">9717713724</a>
                </p>
                <p className="address">
                  C-94, Sector 8, Noida. <br />
                  <a href="mailto:      hr@code91.co" className="email">
                         
                          hr@code91.co
                  </a>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-8 col-lg-9 col-md-12">
              <div className="row">
               </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      <br/>
      <br/><br/>

      <BottomNavigation />


      {/* <!--Bottom--> */}
    </footer>
    //   {/* <!-- End Main Footer --> */}
  );
};

export default index;
