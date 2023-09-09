import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import { useAuth } from "../../app/authContext";


const MobileMenu = () => {

  const { logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();


  return (
    // <!-- Main Header-->
    <header className="main-header main-header-mobile">
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <img src="/images/logo.png" alt="brand" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <MobileSidebar />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}


          <div className="outer-box">

          {!getIsLoggedIn() ? (

              <div className="login-box">
              <a
                href="#"
                className="call-modal"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
              >
                <span className="icon icon-user"></span>
              </a>
          </div>
        ) : null}


            {/* login popup end */}

            <a
              href="#"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1"></span>
            </a>
            {/* right humberger menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
