import dynamic from "next/dynamic";
import Seo from "../../components/common/Seo";
import CandidatesListV1 from "../../components/dashboard-pages/admin-dashboard/candidates-listing-pages/all-applications";

const index = () => {
    return (
        <>
            <Seo pageTitle="All Applications" />
            <CandidatesListV1 />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
