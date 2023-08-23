import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform logout logic here
    sessionStorage.removeItem("isLoggedIn"); // Remove isLoggedIn state from sessionStorage
    // You can perform any other cleanup or logout-related actions here if needed

    // Redirect to the home page after logout
    router.push("/");
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
