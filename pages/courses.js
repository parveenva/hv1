import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";
import BlogListV1 from "../components/blog-meu-pages/courses/index";

const index = () => {
  return (
    <>
      <Seo pageTitle="Best training institute in Noida" />
      <BlogListV1 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
