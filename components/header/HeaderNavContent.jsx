import Link from "next/link";
import { useAuth } from "../../app/authContext";


import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { useRouter } from "next/router";

const HeaderNavContent = () => {
  const router = useRouter();

  const { logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();

  const getDashboardURL = () => {
    if (getUserRole() === "candidate") {
      return "/candidates-dashboard/my-profile";
    } else if (getUserRole() === "employer") {
      return "/admin-dash/all-applications";
    } else if (getUserRole() === "admin") {
      return "/admin-dash/all-applications";
    } else {
      // Handle other roles or default case
      return "/"; // Set a default URL if needed
    }
  };

  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}


          {getIsLoggedIn() &&    (     
          <li>
        <Link href={getDashboardURL()}>


            <span>             <a>Dashboard</a>
            </span>
                </Link>
             </li>

  )}

  


          <li
            // className={`${
            //   isActiveParent(homeItems, router.asPath) ? "current" : ""
            // } dropdown`}
          >

            
        <Link href="/home">


<span>             <a>Home</a>
</span>
    </Link>
           
           </li>

           <li>

            <Link href="/courses">
    
            <span><a>Courses</a>
    </span>
        </Link>
               
                </li>


          <li
            // className={`${
            //   isActiveParent(homeItems, router.asPath) ? "current" : ""
            // } dropdown`}
          >

            
        <Link href="/jobs">


<span>             <a>Jobs</a>
</span>
    </Link>
           
           </li>
          {/* End homepage menu items */}


          <li
            // className={`${
            //   isActiveParent(homeItems, router.asPath) ? "current" : ""
            // } dropdown`}
          >

            
        <Link href="/internships">


<span>             <a>Internships</a>
</span>
    </Link>
           
           </li>
          

       
   <li>
    <Link href="/tutorials/home">
      <span>
        <a>Tutorials</a>
      </span>
    </Link>
  </li>


       
   <li>
    <Link href="/contact">
      <span>
        <a>Contact Us</a>
      </span>
    </Link>
  </li>


      

            {/* <li>
            <span>Placements</span>
            </li>

            <li>
            <span>Blogs</span>
            </li> */}

          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
