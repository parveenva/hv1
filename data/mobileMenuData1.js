export default [
    {
      
        id: 1,
        auth:true,
        role:"candidate",   
        name: "My profile",
        routePath: "/candidates-dashboard/my-profile",
    },

    {
      
        id: 9,
        auth:true,
        role:"admin",   
        name: "Dashboard",
        routePath: "/admin-dash/candidates-list-v1",
    },

    
    {
      
        id: 10,
        auth:true,
        role:"employer",   
        name: "Dashboard",
        routePath: "/admin-dash/candidates-list-v1",
    },

    {
      
        id: 2,
        name: "Home",
        routePath: "/home",
    },
    
    {
      
        id: 3,
        name: "Courses",
        routePath: "/courses",
    },
   
    {
        id: 4,
        name: "Jobs",
        routePath: "/jobs",
    },
    {
        id: 5,
        name: "Internships",
        routePath: "/internships",
    } ,

    {
      
        id: 6,
        name: "Tutorials",
        routePath: "/tutorials/home",
    },
    
    {
      
        id: 7,        
       
        name: "Contact Us",
        routePath: "/contact",
    },
    {
      
        id: 8,
        auth:true,
        role:"all",   
        name: "Logout",
        routePath: "/log-out",
    }


];
