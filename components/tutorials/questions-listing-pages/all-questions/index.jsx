import MobileMenu from "../../../header/MobileMenu";
import DashboardAdminHeader from "../../../header/DashboardAdminHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import TutorialSidebar from "../../../header/TutorialSidebar";
 import MenuToggler from "../../../dashboard-pages/MenuToggler";
 import FooterDefault from "../../../footer/common-footer";
 import DefaulHeader2 from "../../../header/DefaulHeader2";
 import FilterTopBox from "./FilterTopBox";
import FilterSidebar from "./FilterSidebar";
import withAuth from "../../../../app/withAuth";
import { Link } from "react-router-dom"; // Import the Link component


const index = () => {
  return (
    <div >
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardAdminHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <TutorialSidebar /> */}
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}

      <section className="ls-section">
                <div className="auto-container">
                <MenuToggler />

                    <div className="row">
                        {/* End filter column for tablet and mobile devices */}

{/* <!-- End Filters Column for destop and laptop --> */}

                        <div className="content-column col-lg-8 col-md-12 col-sm-12">
                            <div className="ls-outer">
                                <FilterTopBox />
                                {/* <!-- ls Switcher --> */}
                            </div>
                        </div>
                        {/* <!-- End Content Column --> */}
                    </div>
                    {/* End row */}
                </div>
                {/* End container */}
            </section>
       



      {/* <!-- End Dashboard --> */}

      {/* <CopyrightFooter /> */}
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default withAuth(index);
