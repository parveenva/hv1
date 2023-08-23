// utils/withAuth.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./authContext";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/login"); // Redirect to login page if not logged in
      }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
      return null; // Or you can show a loading spinner or message
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
