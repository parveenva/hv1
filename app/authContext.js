// authContext.js
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedInState] = useState(false);

  const [userRole, setUserRoleState] = useState(""); // State to store the user role

  const [uId, setUId] = useState(""); // Add state for user ID

  
  // Function to set isLoggedIn state and store it in session storage
  const setIsLoggedIn = (value) => {
    setIsLoggedInState(value);
    sessionStorage.setItem("isLoggedIn", value ? "true" : "false"); // Store in session storage
  };

  const setUserRole = (role) => {
    setUserRoleState(role);
    sessionStorage.setItem("userRole", role); // Store in session storage
  };


  
  const setUserId = (id) => {

    setUId(id);
    sessionStorage.setItem("uId", id); // Store uId in session storage
  };

  const getUserId = () => {
    const storedUId = sessionStorage.getItem("uId");
    return storedUId ? storedUId : null;
  };

    
  const getUserRole = () => {
    const storedRole = sessionStorage.getItem("userRole");
    return storedRole ? storedRole : null;
  };

  const logout = () => {
    setUserRole(""); // Clear the userRole when logging out

    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn"); // Remove isLoggedIn state from session storage
    sessionStorage.removeItem("userRole"); // Remove userRole from session storage
    sessionStorage.removeItem("uId"); // Remove userRole from session storage

  };

  useEffect(() => {
    // When the component mounts, check if isLoggedIn is already set in session storage
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const storedUserRole = sessionStorage.getItem("userRole");
    const storedUId = sessionStorage.getItem("uId");
 
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }

    if (storedUserRole) {
      setUserRole(storedUserRole);
    }

    if (storedUId) {
      setUId(storedUId);
    }

  }, []);

  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,logout, userRole ,setUserRole,getUserRole,uId,setUserId, getUserId,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
