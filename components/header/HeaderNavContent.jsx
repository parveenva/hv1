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
      return "/admin-dash/candidates-list-v1";
    } else if (getUserRole() === "admin") {
      return "/admin-dash/candidates-list-v1";
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

            
        <Link href="/job-list-v1">


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

            
        <Link href="/ilist">


<span>             <a>Internships</a>
</span>
    </Link>
           
           </li>
          

           <li>
            
            <Link href="/blog-list-v1">
    
            <span><a>Courses</a>
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
