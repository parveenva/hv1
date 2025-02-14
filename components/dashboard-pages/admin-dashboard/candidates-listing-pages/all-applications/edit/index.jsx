import MobileMenu from "../../../../../header/MobileMenu";
import DashboardAdminHeader from "../../../../../header/DashboardAdminHeader";
import LoginPopup from "../../../../../common/form/login/LoginPopup";
import DashboardAdminSidebar from "../../../../../header/DashboardAdminSidebar";
import BreadCrumb from "../../../../BreadCrumb";
import CopyrightFooter from "../../../../CopyrightFooter";
 import PostBoxForm from "./components/PostBoxForm";
 import ApplicantDetails from "./components/new/ApplicantDetails";

 
import MenuToggler from "../../../../MenuToggler";



const index = () => {
  return (
    <div className="page-wrapper dashboard">
<span className="header-span" style={{ display: 'inline-block', height: '50px', backgroundColor: '#f0f0f0' }}></span>
{/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardAdminHeader />
      {/* End Header */}

      {/* End MobileMenu */}

      <DashboardAdminSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
        <div className="dashboard-outer">
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            {/* <div className="col-lg-12"> */}
              {/* <!-- Ls widget --> */}
              {/* <div className="ls-widget"> */}
                {/* <div className="tabs-box"> */}
                  {/* <div className="widget-title">
                    <h4>Post Job</h4>
                  </div> */}

                  {/* <div className="widget-content"> */}
                    {/* <PostJobSteps /> */}
                    {/* End job steps form */}
                    {/* <PostBoxForm /> */}
                    <ApplicantDetails />

                    {/* End post box form */}
                  {/* </div> */}
                {/* </div> */}
              {/* </div> */}
            {/* </div> */}
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
