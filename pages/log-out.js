import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../app/authContext";


const Logout = () => {
  const router = useRouter();

  const { logout } = useAuth();


  useEffect(() => {

    // Perform logout logic here
    sessionStorage.removeItem("getIsLoggedIn()"); // Remove getIsLoggedIn() state from sessionStorage
    // You can perform any other cleanup or logout-related actions here if needed

    logout();

    // Redirect to the home page after logout
    router.push("/");
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
