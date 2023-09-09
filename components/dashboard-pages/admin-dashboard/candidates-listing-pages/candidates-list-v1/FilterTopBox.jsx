import Link from "next/link";
import ListingShowing from "../components/ListingShowing";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../../app/authContext";

import {
    addCandidateGender,
    addCategory,
    addDatePost,
    addDestination,
    addKeyword,
    addLocation,
    addPerPage,
    addSort,
    clearExperienceF,
    clearQualificationF,
} from "../../../../../features/filter/candidateFilterSlice";
import {
    clearDatePost,
    clearExperience,
    clearQualification,
} from "../../../../../features/candidate/candidateSlice";
import { useEffect, useState } from "react";


const FilterTopBox = () => {

    const { setToken,getToken,logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();

    const {
        keyword,
        location,
        destination,
        category,
        candidateGender,
        datePost,
        experiences,
        qualifications,
        sort,
        perPage,
    } = useSelector((state) => state.candidateFilter) || {};

    const dispatch = useDispatch();

    const [candidates, setCandidates] = useState([]);

    const accessToken = getToken();

    useEffect(() => {
        // Fetch candidates from the API
        const fetchCandidates = async () => {
            try {


                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate`, {
                    method: 'GET', // Specify the HTTP method (GET in this case)
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // Include the authorization token
                        'Content-Type': 'application/json', // Set the content type if needed
                    },
                });

 
              //  const response = await fetch(`/api/candidates`); // Replace with your API endpoint
                const data = await response.json();
                console.log("data :", data);
        
                setCandidates(data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };
        fetchCandidates();
    }, []);

    // keyword filter
    const keywordFilter = (item) =>
        keyword !== ""
            ? item?.name?.toLowerCase().includes(keyword?.toLowerCase()) && item
            : item;

    // location filter
    const locationFilter = (item) =>
        location !== ""
            ? item?.location?.toLowerCase().includes(location?.toLowerCase())
            : item;

    // destination filter
    const destinationFilter = (item) =>
        item?.destination?.min >= destination?.min &&
        item?.destination?.max <= destination?.max;

    // category filter
    const categoryFilter = (item) =>
        category !== ""
            ? item?.category?.toLocaleLowerCase() ===
              category?.toLocaleLowerCase()
            : item;

    // gender filter
    const genderFilter = (item) =>
        candidateGender !== ""
            ? item?.gender.toLocaleLowerCase() ===
                  candidateGender.toLocaleLowerCase() && item
            : item;

    // date-posted filter
    const datePostedFilter = (item) =>
        datePost !== "all" && datePost !== ""
            ? item?.created_at
                  ?.toLocaleLowerCase()
                  .split(" ")
                  .join("-")
                  .includes(datePost)
            : item;

    // experience filter
    const experienceFilter = (item) =>
        experiences?.length !== 0
            ? experiences?.includes(
                  item?.experience?.split(" ").join("-").toLocaleLowerCase()
              )
            : item;

    // qualification filter
    const qualificationFilter = (item) =>
        qualifications?.length !== 0
            ? qualifications?.includes(
                  item?.qualification?.split(" ").join("-").toLocaleLowerCase()
              )
            : item;

    // sort filter
    const sortFilter = (a, b) =>
        sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1;

        let content = candidates
        ?.slice(perPage.start, perPage.end === 0 ? 10 : perPage.end)
        // Filter, sort, or map operations as needed
        ?.map((candidate) => (
          <tr key={candidate._id}>
            <td>{`${candidate.firstName} ${candidate.lastName}`}</td>
            <td>{candidate.phone}</td>
            <td>{candidate.currentCity}</td>
            <td>{candidate.leadSource}</td>
            <td>{candidate.leadStatus}</td>
            {/* Display lead owner's name if available */}
            <td>{candidate.leadOwner ? candidate.leadOwner : ''}</td>
            <td>{candidate.lastContactedDate ? new Date(candidate.lastContactedDate).toLocaleDateString() : ''}</td>
            <td>{candidate.nextFollowUpDate ? new Date(candidate.nextFollowUpDate).toLocaleDateString() : ''}</td>
            <td className="lead-actions">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
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

    // clear handler
    const clearHandler = () => {
        dispatch(addKeyword(""));
        dispatch(addLocation(""));
        dispatch(addDestination({ min: 0, max: 100 }));
        dispatch(addCategory(""));
        dispatch(addCandidateGender(""));
        dispatch(addDatePost(""));
        dispatch(clearDatePost());
        dispatch(clearExperienceF());
        dispatch(clearExperience());
        dispatch(clearQualification());
        dispatch(clearQualificationF());
        dispatch(addSort(""));
        dispatch(addPerPage({ start: 0, end: 0 }));
    };

    return (
        <>
            <div className="ls-switcher">

                
          <div >            
            <Link href={`/admin-dash/add-candidate`}>
Add New                            </Link>
          </div>
          
          
          <div >            
            <Link href={`/admin-dash/parse-leads`}>
Parse sheet                            </Link>
          </div>
                <div className="showing-result">
                    <div className="show-1023">
                        <button
                            type="button"
                            className="theme-btn toggle-filters "
                            data-bs-toggle="offcanvas"
                            data-bs-target="#filter-sidebar"
                        >
                            <span className="icon icon-filter"></span> Filter
                        </button>
                    </div>
                    {/* Collapsible sidebar button */}

                    <div className="text">
                        <strong>{candidates?.length}</strong> candidates
                    </div>
                </div>
                {/* End showing-result */}

                <div className="sort-by">
                    {keyword !== "" ||
                    location !== "" ||
                    destination.min !== 0 ||
                    destination.max !== 100 ||
                    category !== "" ||
                    candidateGender !== "" ||
                    datePost !== "" ||
                    experiences?.length !== 0 ||
                    qualifications?.length !== 0 ||
                    sort !== "" ||
                    perPage?.start !== 0 ||
                    perPage?.end !== 0 ? (
                        <button
                            className="btn btn-danger text-nowrap me-2"
                            style={{ minHeight: "45px", marginBottom: "15px" }}
                            onClick={clearHandler}
                        >
                            Clear All
                        </button>
                    ) : undefined}

                    <select
                        onChange={sortHandler}
                        className="chosen-single form-select"
                        value={sort}
                    >
                        <option value="">Sort by (default)</option>
                        <option value="asc">Newest</option>
                        <option value="des">Oldest</option>
                    </select>
                    {/* End select */}

                    <select
                        className="chosen-single form-select ms-3 "
                        onChange={perPageHandler}
                        value={JSON.stringify(perPage)}
                    >
                        <option
                            value={JSON.stringify({
                                start: 0,
                                end: 0,
                            })}
                        >
                            All
                        </option>
                        <option
                            value={JSON.stringify({
                                start: 0,
                                end: 15,
                            })}
                        >
                            15 per page
                        </option>
                        <option
                            value={JSON.stringify({
                                start: 0,
                                end: 20,
                            })}
                        >
                            20 per page
                        </option>
                        <option
                            value={JSON.stringify({
                                start: 0,
                                end: 25,
                            })}
                        >
                            25 per page
                        </option>
                    </select>
                    {/* End select */}
                </div>
            </div>
            {/* End top filter bar box */}


            <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>Source</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Last Contact</th>
            <th>Next</th>
          </tr>
        </thead>
        <tbody>
          {candidates
            ?.slice(perPage.start, perPage.end === 0 ? 50 : perPage.end)
            // Filter, sort, or map operations as needed
            ?.map((candidate) => (
              <tr key={candidate._id}>
                <td>

                <Link href={`/admin-dash/edit-candidate/${candidate._id}`}>

       {`${candidate.name}`}
    </Link>
                    </td>
                <td>{candidate.phone}</td>
                <td>{candidate.currentCity}</td>
                <td>{candidate.leadSource}</td>
                <td>{candidate.leadStatus}</td>
                {/* Display lead owner's name if available */}
                <td>{candidate.leadOwner ? candidate.leadOwner : ''}</td>
                <td>{candidate.lastContactedDate ? new Date(candidate.lastContactedDate).toLocaleDateString() : ''}</td>
                <td>{candidate.nextFollowUpDate ? new Date(candidate.nextFollowUpDate).toLocaleDateString() : ''}</td>
                {/* <td className="lead-actions">

                           
           

                <Link href={`/admin-dash/edit-candidate/${candidate._id}`}>
  <button className="btn btn-primary">
    <i className="fas fa-pencil-alt"></i> {/* Edit Icon */}
  {/* </button>
</Link>
  <button className="btn btn-danger">
    <i className="fas fa-trash-alt"></i> {/* Delete Icon */}
  {/* </button> */}

              </tr>
            ))}
        </tbody>
      </table>

            {/* <ListingShowing /> */}
            {/* <!-- Listing Show More --> */}
        </>
    );
};

export default FilterTopBox;
