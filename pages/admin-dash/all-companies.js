import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
import CandidatesListV1 from "../../components/dashboard-pages/admin-dashboard/candidates-listing-pages/all-companies";

const index = () => {
    return (
        <>
            <Seo pageTitle="All Companies" />
            <CandidatesListV1 />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
