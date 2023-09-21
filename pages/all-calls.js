import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
 
const index = () => {
    return (
        <>
            <Seo pageTitle="Candidates List V1" />
         </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
