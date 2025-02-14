import Link from "next/link";
//import jobs from "../../../data/job-featured";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useAuth } from "../../../app/authContext";

 
import {
    addCategory,
    addDatePosted,
    addDestination,
    addKeyword,
    addcity,
    addPerPage,
    addSalary,
    addSort,
    addTag,
    clearExperience,
    clearJobType,
} from "../../../features/filter/filterSlice";
import {
    clearDatePostToggle,
    clearExperienceToggle,
    clearJobTypeToggle,
} from "../../../features/job/jobSlice";

const FilterJobsBox = () => {


    const { logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();

    const [jobs, setJobs] = useState([]);

    const [isApplied, setIsApplied] = useState(false);
  const [applyMessage, setApplyMessage] = useState(""); // Initialize state


  const [formData, setFormData] = useState({
    candidateId: getUserId(),
    jobId: "",
    coverLetter: "",
  });
  
  // Handle form submission
  const handleApplyJobAPI = async (jobId) => {
    // e.preventDefault();

    console.log("in handleApplyJobAPI");


    const updatedFormData = {
        candidateId: getUserId(),
        jobId: jobId, // Assign the jobId here
        coverLetter: "",
      };

      
     try {
      // Make API request to handle form submission
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if(data.error){
        throw new Error("Invalid Credentials");
      }
      // Handle the API response if needed
      console.log("Job Applied successfully:", data);

          setApplyMessage(data.message); // Set the message from the API response

      setIsApplied(true); // Set state to indicate successful application

    } catch (error) {
      console.error("Error submitting form:", error);
//      setError("Incorrect email or password. Please try again."); // Set error message for incorrect credentials
    }
  };

    useEffect(() => {

    const endpoint = "job"; // Replace with the specific API's endpoint

    // Fetch jobs from the generic API route with the specified endpoint
    const fetchJobs = async () => {
      try {
        // Call the generic API route and provide the desired endpoint as a query parameter

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${(endpoint)}`,
        
        {
            headers: {
              Referer: 'no-referrer',
              // Other headers
            }
        });

        const apiUrl = `${endpoint}`;


         const data = await response.json();
         
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

    const { jobList, jobSort } = useSelector((state) => state.filter);
    const {
        keyword,
        city,
        destination,
        category,
        jobType,
        datePosted,
        experience,
        salary,
        tag,
    } = jobList || {};

    const { sort, perPage } = jobSort;

    const dispatch = useDispatch();

    // keyword filter on title
    const keywordFilter = (item) =>
        keyword !== ""
            ? item.jobTitle
                  .toLocaleLowerCase()
                  .includes(keyword.toLocaleLowerCase())
            : item;

    // city filter
    const cityFilter = (item) =>
        city !== ""
            ? item?.city
                  ?.toLocaleLowerCase()
                  .includes(city?.toLocaleLowerCase())
            : item;

    // city filter
    const destinationFilter = (item) =>
        item?.destination?.min >= destination?.min &&
        item?.destination?.max <= destination?.max;

    // category filter
    const categoryFilter = (item) =>
        category !== ""
            ? item?.category?.toLocaleLowerCase() ===
              category?.toLocaleLowerCase()
            : item;

    // job-type filter
    const jobTypeFilter = (item) =>
        jobType?.length !== 0 && item?.jobType !== undefined
            ? jobType?.includes(
                  item?.jobType[0]?.type
                      .toLocaleLowerCase()
                      .split(" ")
                      .join("-")
              )
            : item;


            const truncateDescription = (description, wordLimit) => {
                const words = description.split(' ');
                if (words.length > wordLimit) {
                  return words.slice(0, wordLimit).join(' ') + '...';
                }
                return description;
              };

            // date-posted filter


    const datePostedFilter = (item) =>
        datePosted !== "all" && datePosted !== ""
            ? item?.created_at
                  ?.toLocaleLowerCase()
                  .split(" ")
                  .join("-")
                  .includes(datePosted)
            : item;

    // experience level filter
    const experienceFilter = (item) =>
        experience?.length !== 0
            ? experience?.includes(
                  item?.experience?.split(" ").join("-").toLocaleLowerCase()
              )
            : item;

    // salary filter
    const salaryFilter = (item) =>
        item?.totalSalary?.min >= salary?.min &&
        item?.totalSalary?.max <= salary?.max;

    // tag filter
    const tagFilter = (item) => (tag !== "" ? item?.tag === tag : item);

    // sort filter
    const sortFilter = (a, b) =>
        sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1;

    let content = jobs
    ?.filter((item) => item.jobTitle) // Include jobs with jobTitle
        // ?.filter(cityFilter)
        // ?.filter(destinationFilter)
        // ?.filter(categoryFilter)
        // ?.filter(jobTypeFilter)
        // ?.filter(datePostedFilter)
        // ?.filter(experienceFilter)
        // ?.filter(salaryFilter)
        // ?.filter(tagFilter)
        // ?.sort(sortFilter)
        .slice(perPage.start, perPage.end !== 0 ? perPage.end : 10)
        ?.map((item) => (
            <div className="job-block" key={item.id}>
                <div className="inner-box">
                    <div className="content">
           

                        <h4>
                            <Link href={`/job-single-v1/${item._id}`}>
                                {item.jobTitle}
                            </Link>
                        </h4>


                        <ul className="job-info">
                            <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.company ? item.company.name : 'Code91'}
                            </li>
                            {/* compnay info */}
                            <li>
                                <span className="icon flaticon-map-locator"></span>
                                {item.city}
                            </li>
                            {/* city info */}
                            {/* <li>
                                <span className="icon flaticon-clock-3"></span>{" "}
                                {item.time}
                            </li> */}
                            {/* time info */}
                                {/* salary info */}
                        </ul>
                        {/* End .job-info */}

                        <ul className="job-info">
                            {/* time info */}
                            <li>
                                <span className="icon flaticon-money"></span>{" "}
                                {item.salaryType === 'fixed' ? (
  <span>{item.salaryFixed && new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(item.salaryFixed)}
  {item.ctcFrequency === 'ANNUAL' && ' per year'}
  {item.ctcFrequency !== 'ANNUAL' && ' per month'}
  </span>

  ) : (
    <span>{item.salaryRangeMin && new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(item.salaryRangeMin)} - {item.salaryRangeMax && new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(item.salaryRangeMax)}
    {item.ctcFrequency === 'ANNUAL' && ' per year'}
    {item.ctcFrequency !== 'ANNUAL' && ' per month'}
    </span>

)}
                            </li>
                            {/* salary info */}
                        </ul>
                        {/* End .job-info */}

                        <ul className="job-info">
                        <span className="icon flaticon-lightbulb"></span>
                            {item?.skills?.map((val, i) => (
                                <li key={i} >
                                    {val}
                                </li>
                            ))}
                        </ul>
                        {/* End .job-other-info */}

                        
                        <ul className="job-info">

                        <li>

                        <span className="icon flaticon-notebook"></span>

                        {truncateDescription(item.jd, 20)}
                            </li>
                           </ul>

                        {/* <button className="bookmark-btn">
                            <span className="flaticon-bookmark"></span>
                        </button> */}
                    </div>
                    <div className="btn-box" style={{ textAlign: 'right' }}>
                <Link href={`/job-single-v1/${item._id}`}>
View details                            </Link>
      </div>
                </div>

                
            
            </div>
            // End all jobs
        ));

    // sort handler
    const sortHandler = (e) => {
        dispatch(addSort(e.target.value));
    };

    // per page handler
    const perPageHandler = (e) => {
        const pageData = JSON.parse(e.target.value);
        dispatch(addPerPage(pageData));
    };

    // clear all filters
    const clearAll = () => {
        dispatch(addKeyword(""));
        dispatch(addcity(""));
        dispatch(addDestination({ min: 0, max: 100 }));
        dispatch(addCategory(""));
        dispatch(clearJobType());
        dispatch(clearJobTypeToggle());
        dispatch(addDatePosted(""));
        dispatch(clearDatePostToggle());
        dispatch(clearExperience());
        dispatch(clearExperienceToggle());
        dispatch(addSalary({ min: 0, max: 20000 }));
        dispatch(addTag(""));
        dispatch(addSort(""));
        dispatch(addPerPage({ start: 0, end: 0 }));
    };

    return (
        <>
            {/* End top filter bar box */}
            {content}
            {/* <!-- List Show More --> */}
            {/* <div className="ls-show-more">
                <p>Show 36 of 497 Jobs</p>
                <div className="bar">
                    <span className="bar-inner" style={{ width: "40%" }}></span>
                </div>
                <button className="show-more">Show More</button>
            </div> */}
        </>
    );
};

export default FilterJobsBox;
