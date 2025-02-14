import Link from "next/link";
import dashboardMenuData from "../../data/dashboardMenuData";
import adminMenuData from "../../data/adminMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { useAuth } from "../../app/authContext";
import { useState } from "react";
import { useEffect } from "react";


const DashboardAdminSidebar = () => {
  const {
    logout,
    setIsLoggedIn,
    setUserRole,
    setUserId,
    getIsLoggedIn,
    getUserRole,
    getUserId,
  } = useAuth();

  const router = useRouter();
  const { menu } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  // menu toggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };


  const renderMenuItem = (item) => (
    <li >

      <div className={`${
        isActiveLink(item.routePath, router.asPath) ? "active" : ""
      } mb-1`}
      key={item.id}
   //   onClick={() => toggleSubmenu(item.id)} // Use onMouseEnter instead of onClick
      
        >
        {item.routePath ? (
          <Link href={item.routePath}>
            <a>
              <i className={`la ${item.icon}`}></i> 
            {item.name}</a> 
          </Link>
        ) : (
          <>
            <i className={`la ${item.icon}`}></i> {item.name}
          </>
        )}
      </div>
      {openSubmenus[item.id] && renderSubMenu(item.id)}
    </li>
  );









  
  const [openSubmenus, setOpenSubmenus] = useState({});

  // Function to toggle the state of a submenu
  const toggleSubmenu = (parentId) => {
    
    console.log("toggleSubmenu called");
    setOpenSubmenus((prevOpenSubmenus) => ({
      ...prevOpenSubmenus,
      [parentId]: !prevOpenSubmenus[parentId],
    }));
  };


  
  useEffect(() => {
    const storedOpenSubmenus = JSON.parse(localStorage.getItem("openSubmenus")) || {};
    setOpenSubmenus(storedOpenSubmenus);
  }, []);


  useEffect(() => {
    localStorage.setItem("openSubmenus", JSON.stringify(openSubmenus));
  }, [openSubmenus]);



  const renderSubMenu = (parentId) => (
    <ul className="submenu">
      {adminMenuData
        .filter((item) => item.pmenu === parentId)
        .map((subItem) => (
          <li
            key={subItem.id}
            className={`${
              isActiveLink(subItem.routePath, router.asPath) ? "active" : ""
            }`}
            onClick={() => handleSubmenuClick(subItem.routePath)} // Handle submenu click
          >
            <Link href={subItem.routePath}>
              <i className={`la ${subItem.icon}`}></i> {subItem.name}
            </Link>
          </li>
        ))}
    </ul>
  );
  
  // ...
  
  // Handle submenu click
  const handleSubmenuClick = (routePath) => {

    console.log("handleSubmenuClick called");
    // Add your custom logic here for submenu click
    // For example, you can navigate to the submenu route if needed
    router.push(routePath);
  
    // Optionally, you can close the menu or handle other actions
    // based on your specific requirements
  };
  
  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Start sidebar close icon */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>
      {/* End sidebar close icon */}

      <div className="sidebar-inner">
        <ul className="navigation">
          {dashboardMenuData.map((item) =>
            !item.auth ||
            (item.auth && item.role === getUserRole()) ? (
              <>
                {renderMenuItem(item)}
              </>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardAdminSidebar;
