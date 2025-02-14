import DefaulHeader2 from "../../../header/DefaulHeader2";
import MobileMenu from "../../../header/MobileMenu";
import MDBox from "./MDBox";
import FilterSidebar from "./FilterSidebar";
import Breadcrumb from "../../../common/Breadcrumb";

const index = () => {
    return (
        <>
            {/* <!-- Header Span --> */}
            <span className="header-span"></span>

             {/* End Login Popup Modal */}

            <DefaulHeader2 />
            {/* End Header with upload cv btn */}

            <MobileMenu />
            {/* End MobileMenu */}

            <Breadcrumb title="Java Tutorials" meta="Java Tutorials" />
            {/* <!--End Breadcrumb Start--> */}

            {/* <section className="ls-section"> */}
                <div className="auto-container">
                    <div className="row">
                        {/* <div
                            className="offcanvas offcanvas-start"
                            tabIndex="-1"
                            id="filter-sidebar"
                            aria-labelledby="offcanvasLabel"
                        >
                            <div className="filters-column hide-left">
                                {/* <FilterSidebar /> */}
                            {/* </div>
                        </div> */}
                        {/* End filter column for tablet and mobile devices */}
{/* 
                        <div className="filters-column hidden-1023 col-lg-4 col-md-12 col-sm-12">
                            {/* <FilterSidebar /> */}
                        {/* </div>  */} 
                        {/* <!-- End Filters Column for destop and laptop --> */}

                        <div className="content-column col-lg-12 col-md-12 col-sm-12">
                            <div className="ls-outer">
                                <MDBox />
                                {/* <!-- ls Switcher --> */}
                            </div>
                        </div>
                        {/* <!-- End Content Column --> */}
                    </div>
                    {/* End row */}
                </div>
                {/* End container */}
            {/* </section> */}
            {/* <!--End Listing Page Section --> */}

             {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
