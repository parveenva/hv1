
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import ContactForm from "../../components/website/ContactForm";
import Breadcrumb from "../../components/common/Breadcrumb";

import React from "react";
import PageLocation from "../../components/website/PageLocation";
import SevicesCard from "../../components/website/SevicesCard";
import Data from "../../utils/MockData";
import Head from "next/head"
const page = () => {
  
  return (
    <>

<span className="header-span"></span>


<Head>
    <title>Services</title>
    <meta
          name="description"
          content="Code91 is an exceptional training institute located in Noida, which is widely regarded as one of the top online learning platforms and job-focused IT training centers in the Delhi NCR region."
          key="desc"
        />
  </Head>
<LoginPopup />
{/* End Login Popup Modal */}

<DefaulHeader />
{/* <!--End Main Header --> */}

<MobileMenu />
{/* End MobileMenu */}

<Breadcrumb title="Pay after placement" meta="Jobs" />


       {Data.services.map((service) => (
        <div key={service.id} className="flex flex-col gap-5">
          <SevicesCard data={service} />
        </div>
      ))}
    </>
  );
};

export default page;
