// authContext.js
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
 
   
  // Function to set getIsLoggedIn() state and store it in session storage
  const setIsLoggedIn = (value) => {
     sessionStorage.setItem("isLoggedIn", value ? "true" : "false"); // Store in session storage
  };
  const setUserRole = (role) => {
    sessionStorage.setItem("userRole", role); // Store in session storage
  };


  
  
  const setToken = (token) => {
    sessionStorage.setItem("token", token); // Store uId in session storage
 };

 const getToken = () => {
   if (typeof sessionStorage !== 'undefined') {

   const token = sessionStorage.getItem("token");
   return token ? token : null;
   } else{
     return null;
   }
 };



  const setUserId = (id) => {
     sessionStorage.setItem("uId", id); // Store uId in session storage
  };

  const getUserId = () => {
    if (typeof sessionStorage !== 'undefined') {

    const storedUId = sessionStorage.getItem("uId");
    return storedUId ? storedUId : null;
    } else{
      return null;
    }
  };

    
  const getUserRole = () => {
    if (typeof sessionStorage !== 'undefined') {

    const storedRole = sessionStorage.getItem("userRole");
    return storedRole ? storedRole : null;
    } else{
      return null;
    }
  };

  const getIsLoggedIn = () => {
    if (typeof sessionStorage !== 'undefined') {

    const isLoggedIn= sessionStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      return true;
    } else if (isLoggedIn === "false") {
      return false;
    } else {
      return false;
    }  
    }else {
      return false;
    }
  
  };

  const logout = () => {
    sessionStorage.removeItem("isLoggedIn"); // Remove getIsLoggedIn() state from session storage
    sessionStorage.removeItem("userRole"); // Remove userRole from session storage
    sessionStorage.removeItem("uId"); // Remove userRole from session storage

  };

  // useEffect(() => {
  //   // When the component mounts, check if getIsLoggedIn() is already set in session storage
  //   const storedgetIsLoggedIn() = sessionStorage.getItem("getIsLoggedIn()") === "true";
  //   const storedUserRole = sessionStorage.getItem("userRole");
  //   const storedUId = sessionStorage.getItem("uId");
 
  //   if (storedgetIsLoggedIn()) {
  //     setgetIsLoggedIn()(true);
  //   }

  //   if (storedUserRole) {
  //     setUserRole(storedUserRole);
  //   }

  //   if (storedUId) {
  //     setUId(storedUId);
  //   }

  // }, []);

  
  return (
    <AuthContext.Provider value={{ getToken,setToken,logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
