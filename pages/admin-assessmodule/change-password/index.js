import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import ChangePassword from "../../../components/dashboard-pages/admin-dashboard/change-password";

const index = () => {
  return (
    <>
      <Seo pageTitle="Change Password" />
      <ChangePassword />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
