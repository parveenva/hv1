import MobileMenu from "../../../../header/MobileMenu";
import DashboardAdminHeader from "../../../../header/DashboardAdminHeader";
import LoginPopup from "../../../../common/form/login/LoginPopup";
import DashboardAdminSidebar from "../../../../header/DashboardAdminSidebar";
import BreadCrumb from "../../../BreadCrumb";
import CopyrightFooter from "../../../CopyrightFooter";
 import MenuToggler from "../../../MenuToggler";
 import FooterDefault from "../../../../footer/common-footer";
import Breadcrumb from "../../../../common/Breadcrumb";
import DefaulHeader2 from "../../../../header/DefaulHeader2";
 import FilterTopBox from "./FilterTopBox";
import FilterSidebar from "./FilterSidebar";
import withAuth from "../../../../../app/withAuth";
import { Link } from "react-router-dom"; // Import the Link component


const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardAdminHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardAdminSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          {/* breadCrumb */}


          <MenuToggler />
          {/* Collapsible sidebar button */}


          <div className="row">
            

            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
               <FilterTopBox />
             </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default withAuth(index);
