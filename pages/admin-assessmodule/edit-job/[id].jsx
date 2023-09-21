import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import PostJob from "../../../components/dashboard-pages/admin-dashboard/edit-job";

const index = () => {
  return (
    <>
      <Seo pageTitle="Post Jobs" />
      <PostJob />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
