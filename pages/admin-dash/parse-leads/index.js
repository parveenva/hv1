import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import PostJob from "../../../components/dashboard-pages/admin-dashboard/parse-leads";

const index = () => {
  return (
    <>
      <Seo pageTitle="Parse leadsy" />
      <PostJob />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
