import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import { useAuth } from "../../app/authContext";


const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);

  const { isLoggedIn, userRole } = useAuth();


  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link href="/">
                <img src="/images/logo.png" alt="brand" />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Add Listing --> */}
          {!isLoggedIn ? (
        <Link href="/login" className="login-link">
         Upload your CV
        </Link>
      ) : userRole === "candidate" ? (
        <Link href="/candidates-dashboard/cv-manager" className="upload-cv">
          Upload your CV
        </Link>
      ) : null}

          {/* <!-- Login/Register --> */}
          <div className="btn-box">
       
          {!isLoggedIn ? (
        <Link href="#" className="theme-btn btn-style-three call-modal"
        data-bs-toggle="modal"
        data-bs-target="#loginPopupModal"
     >
              Login / Register
        </Link>
           ) : null}

          
            {/* {!isLoggedIn ? ( */}

{/* <Link href="/login" className="theme-btn btn-style-one">
          {/* Post Job for Free! */}
        {/* // </Link> */}
      {/* // ) : userRole === "employer" ? ( */}
        {/* // <Link href="/employers-dashboard/post-jobs" className="theme-btn btn-style-one"> */}
          {/* Post Job for Free! */}
        {/* // </Link> */}
      {/* // ) : null} */} 

       </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
