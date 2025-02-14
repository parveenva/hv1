import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import Home1 from "../components/home-1";
import JobList1 from "../components/job-listing-pages/job-list-v1";


const index = () => {
    return (
        <>
            <Seo pageTitle="Jobs" />
            <JobList1 />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
