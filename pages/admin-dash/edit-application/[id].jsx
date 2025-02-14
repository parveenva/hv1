import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import PostJob from "../../../components/dashboard-pages/admin-dashboard/candidates-listing-pages/all-applications/edit";


const index = () => {
  return (
    <>
      <Seo pageTitle="View Application" />
      <PostJob />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
