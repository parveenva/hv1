import dynamic from "next/dynamic";
import Seo from "../../../components/common/Seo";
import AllQuestions from "../../../components/admin-assessmodule/questions-listing-pages/all-questions";

const index = () => {
  return (
    <>
      <Seo pageTitle="All Questions" />
      <AllQuestions />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
