// utils/withAuth.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./authContext";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { getIsLoggedIn} = useAuth();

    useEffect(() => {
      if (!getIsLoggedIn()) {
        router.push("/login"); // Redirect to login page if not logged in
      }
    }, [getIsLoggedIn()]);

    if (!getIsLoggedIn()) {
      return null; // Or you can show a loading spinner or message
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
