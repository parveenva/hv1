import CopyrightFooter from "../footer/common-footer/CopyrightFooter";
import FooterContent4 from "../footer/FooterContent4";

const Footer = () => {
  return (
    <footer className="main-footer style-six">
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-3 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <img src="/images/logo-2.svg" alt="brand" />
                  </a>
                </div>
                <p className="phone-num">
                  <span>Call us </span>
                  <a href="thebeehost@support.com">9717713724</a>
                </p>
                <p className="address">
                  C-94, Sector 8, Noida.
                  <a href="mailto:      hr@code91.co" className="email">
                          hr@code91.co
                  </a>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-9 col-lg-9 col-md-12">
              <div className="row">
                <FooterContent4 />
              </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
  );
};

export default Footer;
