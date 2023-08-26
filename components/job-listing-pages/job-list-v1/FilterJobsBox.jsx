import Link from "next/link";
//import jobs from "../../../data/job-featured";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
 
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


    const [jobs, setJobs] = useState([]);

    useEffect(() => {

    const endpoint = "job"; // Replace with the specific API's endpoint

    // Fetch jobs from the generic API route with the specified endpoint
    const fetchJobs = async () => {
      try {
        // Call the generic API route and provide the desired endpoint as a query parameter

        const response = await fetch(`/api/apicall?endpoint=${(endpoint)}`);

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
                    <span className="company-logo">
  {item.logo ? (
    <img src={item.logo} alt="item brand" />
  ) : (
    <div className="placeholder-logo">{item.jobTitle.charAt(0)}</div>
  )}
</span>

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
                            <li>
                                <span className="icon flaticon-money"></span>{" "}
                                {item.salaryType === 'fixed' ? (
  <span>{item.salaryFixed}</span>
) : (
  <span>{item.salaryRangeMin} - {item.salaryRangeMax}</span>
)}
                            </li>
                            {/* salary info */}
                        </ul>
                        {/* End .job-info */}

                        <ul className="job-other-info">
                            {item?.skills?.map((val, i) => (
                                <li key={i} className={`${val.styleClass}`}>
                                    {val}
                                </li>
                            ))}
                        </ul>
                        {/* End .job-other-info */}


                        <ul className="job-other-info">
                        <li>
                                 {item.jd}
                            </li>
                           </ul>

                        <button className="bookmark-btn">
                            <span className="flaticon-bookmark"></span>
                        </button>
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
