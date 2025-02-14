import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader from "../../header/DefaulHeader";
import MobileMenu from "../../header/MobileMenu";
import ContactForm from "../../website/ContactForm";
import Breadcrumb from "../../common/Breadcrumb";
import Data from "../../../utils/MockData";
import image1 from "../../../images/about/image1.webp";
import image2 from "../../../images/about/image2.webp";
import image3 from "../../../images/about/image3.webp";
import mission1 from "../../../images/mission/mission1.png";
import mission2 from "../../../images/mission/mission2.png";
import mission3 from "../../../images/mission/mission3.png";
import Head from "next/head";
import AboutCard from "../../website/AboutCard";


const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
    
      <div className="container my-11 mx-auto px-4 md:px-6">
        {/* Section: Design Block */}
        <section className="" id="contact-us">
          <div className="flex items-start flex-wrap">
            <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
              <h2 className="text-[#582c4f] md:text-4xl text-2xl font-bold py-2 uppercase">
                Contact US
              </h2>
              <p className="mb-6 text-neutral-500 ">
                We welcome your inquiries and feedback. Feel free to reach out
                to us with any questions or concerns you may have. We are here
                to assist you promptly and provide the support you need.
              </p>
              <p className="mb-2 text-neutral-700 ">C-94, Sector 8, Noida</p>
              <p className="mb-2 text-neutral-700 ">+91 971-771-3724</p>
              <p className="mb-2 text-neutral-700">hr@code91.co</p>
            </div>
            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
              <ContactForm />
            </div>
          </div>
        </section>
        {/* Section: Design Block */}
      </div>
      {/* Container for demo purpose */}

   
      {/* <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
