import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import JobListV1 from "../components/job-listing-pages/ilist";

const index = () => {
  return (
    <>
      <Seo pageTitle="Internships" />
      <JobListV1 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
