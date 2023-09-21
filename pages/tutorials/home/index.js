import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import PostJob from "../../../components/tutorials/questions-listing-pages/all-questions";

const index = () => {
  return (
    <>
      <Seo pageTitle="Add Candidate" />
      <PostJob />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
