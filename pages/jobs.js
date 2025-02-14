import RestaurantHeader from "../components/header/RestaurantHeader";
import JobPostings from "../components/website/JobPostings";
import ContactForm from "../components/website/ContactForm";

const index = () => {
  return (
    <>
      <RestaurantHeader />
      <div className="container mx-auto px-4 md:px-6 my-11 flex flex-wrap">
        <div className="w-full md:w-6/12 px-3">
          <JobPostings />
        </div>
        <div className="w-full md:w-6/12 px-3">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default index;
