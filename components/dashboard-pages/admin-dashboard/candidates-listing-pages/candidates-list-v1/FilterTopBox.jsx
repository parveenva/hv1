import Link from "next/link";
import ListingShowing from "../components/ListingShowing";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../../app/authContext";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";

 

import {
    addCandidateGender,
    addCategory,
    addDatePost,
    addDestination,
    addKeyword,
    addLocation,
     addSort,
    clearExperienceF,
    clearQualificationF,
} from "../../../../../features/filter/candidateFilterSlice";


const FilterTopBox = () => {

    const [totalCandidates, setTotalCandidates] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [selectedCandidates, setSelectedCandidates] = useState([]);
      const [leadNewOwner, setleadNewOwner] = useState([]);


    
    const [selectedOwner, setSelectedOwner] = useState(""); // State to store the selected owner

    const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);


    const [leadCategoryFilter, setLeadCategoryFilter] = useState('Candidate'); // Set "Candidate" as the default value

    const handleLeadCategoryFilterChange = (e) => {
      setLeadCategoryFilter(e.target.value);
    };
    
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
     } = useSelector((state) => state.candidateFilter) || {};

     const [formData, setFormData] = useState({
      leadSource: '',
      leadStatus: '',
     leadOwner: '',
    });
  
  
    const [bulkformData, setbulkFormData] = useState({
     leadNewOwner: '',
    });

    const dispatch = useDispatch();

    const [candidates, setCandidates] = useState([]);

    const accessToken = getToken();

    const [currentPage, setCurrentPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const [ownerFilter, setOwnerFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sourceFilter, setSourceFilter] = useState("");


    const [leadOwners, setleadOwners] = useState([]);
const [statusOptions, setStatusOptions] = useState([]);
const [sourceOptions, setSourceOptions] = useState([]);


    const handleSearch = () => {
        console.log("in handleSearch");
        // Dispatch an action to update the filter with the search query
        fetchCandidates(1,searchQuery);
      };
      

      const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  
      const openBulkEditDialog = () => {
        setIsBulkModalOpen(true);
      };

  // Function to close the bulk edit dialog
  const closeBulkEditDialog = () => {
    setIsBulkModalOpen(false);
  };
    const fetchTotalCandidates = async () => {
        try {
            console.error("in fetchTotalCandidates");

            let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}candidate/total`;


            if (isAdmin && leadCategoryFilter) {
              apiUrl += `?leadCategory=${encodeURIComponent(leadCategoryFilter)}`;
            }

            const response = await fetch(apiUrl, {
    
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            });
            console.error("in fetchTotalCandidates after");

 
            const data = await response.json();
            console.error("in data",data);

            setTotalCandidates(data.total);
            console.error("in data total",data.total);

 
            setTotalPages(Math.ceil(data.total / 50));
          } catch (error) {
            console.error("Error fetching total candidates:", error);
          }
        };
 
    // Change page handler
  const changePage = (page) => {
    console.log("in change page new ");  
    setCurrentPage(page);
  };
  
  const isAdmin = getUserRole() === 'admin';


  const fetchCandidates = async (page,searchQuery) => {
    try {

        let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}candidate?page=${page}`;

        if (isAdmin && leadCategoryFilter) {
          apiUrl += `&leadCategory=${encodeURIComponent(leadCategoryFilter)}`;
        }

        // If a search query is provided, add it to the API URL
        if (searchQuery) {
          apiUrl += `&query=${encodeURIComponent(searchQuery)}`;
        }
    
        const response = await fetch(apiUrl, {

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

  
const openBulkDeleteDialog = () => {
  setIsBulkDeleteModalOpen(true);
};

const closeBulkDeleteDialog = () => {
  setIsBulkDeleteModalOpen(false);
};


const populateLeadOwner = async () => {
    try {
      // Make an API request to fetch the list of lead owners
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/leadOwners`);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      
      // Set the leadOwners state variable with the fetched data
      setleadOwners(data);
    } catch (error) {
      console.error("Error fetching lead owners:", error);
      // Handle errors here if needed
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleBulkInputChange = (e) => {
    const { name, value } = e.target;
    setbulkFormData({
      ...bulkformData, // Use bulkformData here
      [name]: value,
    });
  };
  

  

  const populateLeadStatus = async () => {
    try {
      // Make an API request to fetch the list of lead owners
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/leadStatus`);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      
      // Set the leadOwners state variable with the fetched data
      setStatusOptions(data);
    } catch (error) {
      console.error("Error fetching lead owners:", error);
      // Handle errors here if needed
    }
  };

  const populateLeadSources = async () => {
    try {
      // Make an API request to fetch the list of lead owners
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/leadSources`);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      
      // Set the leadOwners state variable with the fetched data
      setSourceOptions(data);
    } catch (error) {
      console.error("Error fetching lead owners:", error);
      // Handle errors here if needed
    }
  };


    // Function to toggle the selection of a candidate
  const toggleCandidateSelection = (candidateId) => {
    const updatedSelection = [...selectedCandidates];
    if (updatedSelection.includes(candidateId)) {
      updatedSelection.splice(updatedSelection.indexOf(candidateId), 1);
    } else {
      updatedSelection.push(candidateId);
    }
    setSelectedCandidates(updatedSelection);
  };


  // Function to handle selecting/deselecting all candidates
  const toggleSelectAll = () => {
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map((candidate) => candidate._id));
    }
  };


  const performBulkDelete = () => {
    // Send a request to the backend to delete the selectedCandidates
    // You can use fetch or axios to make the API request
    fetch(`${process.env.NEXT_PUBLIC_API_URL}lead/bulk-delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedCandidates,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Bulk delete successful") {
          // Close the dialog if the bulk delete was successful

  
          setSelectedCandidates([]);

          closeBulkDeleteDialog();
          fetchCandidates(currentPage, searchQuery);

          // You may also want to update the UI or show a success message
        } else {
          // Handle the case where the bulk delete was not successful
          // You can show an error message or take appropriate action
          console.error("Bulk delete failed:", data.message);
        }
        // Handle the response from the backend (success or error)
        // Close the dialog if successful and update the UI as needed
      })
      .catch((error) => {
        console.error("Error performing bulk delete:", error);
        // Handle errors here if needed
      });
  };

  
  const performBulkEdit = ( ) => {
    // Send a request to the backend to update the lead owner for selectedCandidates
    // You can use fetch or axios to make the API request
    console.log("in performBulkEditnewOwner is ----",leadNewOwner);
    console.log("in selectedCandidates is ----",selectedCandidates);


    fetch(`${process.env.NEXT_PUBLIC_API_URL}lead/bulk-update-lead-owner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedCandidates,
        leadNewOwner, // The new owner value selected in the dialog
      }),
    }).then((response) => response.json())
    .then((data) => {

      if (data.message === 'Bulk update successful') {

        setSelectedCandidates([]);

        // Close the dialog if the bulk edit was successful
        closeBulkEditDialog();
        fetchCandidates(currentPage, searchQuery);

        // You may also want to update the UI or show a success message
      } else {
        // Handle the case where the bulk edit was not successful
        // You can show an error message or take appropriate action
        console.error("Bulk edit failed:", data.message);
      }
      // Handle the response from the backend (success or error)
      // Close the dialog if successful and update the UI as needed
    })
    .catch((error) => {
      console.error("Error performing bulk edit:", error);
      // Handle errors here if needed
    });
};

  
    useEffect(() => {
        // Fetch candidates from the API
        fetchTotalCandidates();

        fetchCandidates(currentPage,""); // Fetch candidates when the component mounts


        populateLeadOwner();
        populateLeadSources();
        populateLeadStatus();
        
 }, [ currentPage,leadCategoryFilter]); //

 
 const nextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };


  //   const pageButtons = Array.from({ length: totalPages }, (_, i) => (
  //       <li key={i} className={i + 1 === currentPage ? "active" : ""}>
  //     <button onClick={() => changePage(i + 1)}>{i + 1}</button>
  //   </li>
  // ));
 

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
     };

    return (
        <>
        

  {/* ...Other elements... */}



  {isAdmin && (
          <div className="d-flex align-items-center">

        <div className="row mb-12">
          <div className="col-md-6">
            <label className="form-label">Lead Category</label>
          </div>
          <div className="col-md-6">
          <select
              name="leadCategoryFilter"
              value={leadCategoryFilter}
              onChange={handleLeadCategoryFilterChange}
              className="form-select"
            >
               <option value="HR">HR</option>
              <option value="Candidate">Candidate</option>
              {/* Add more options based on your categories */}
            </select>
          </div>
          </div>

          </div>
       )}

&nbsp;

<div className="d-flex align-items-center">

{/* Owner Filter */}
<div className="me-3">
<select
      name="leadOwner"
          onChange={handleInputChange}
      className="form-select"
    >
      <option value="">Filter Lead Owner</option>
      {leadOwners.map((owner) => (
        <option key={owner._id} value={owner._id} >
        {owner.name}
        </option>
      ))}
    </select>
 </div>

{/* Status Filter */}
<div className="me-3">
  <select
    className="form-select"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">Filter Status</option>
    {statusOptions.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ))}
  </select>
</div>

{/* Source Filter */}
<div className="me-3">
  <select
    className="form-select"
    value={sourceFilter}
    onChange={(e) => setSourceFilter(e.target.value)}
  >
    <option value="">Filter Source</option>
    {sourceOptions.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ))}
  </select>
</div>
  
  <div className="d-flex">
  <input
    type="text"
    placeholder="Search name or phone"
    className="form-control" 

    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  &nbsp;
  <button  className="btn btn-primary" onClick={handleSearch}>Search</button>
</div>
</div>
<br/>
        <div className="ls-switcher">
      <div className="d-flex align-items-center">
        <div className="me-3">
          <Link href={`/admin-dash/add-candidate`}>Add New</Link>
        </div>
        <div className="me-3">
          <Link href={`/admin-dash/parse-leads`}>Parse sheet</Link>
        </div>
        
        
      </div>


      {/* End top filter bar box */}

      <div >
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        &nbsp;
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        &nbsp;
        &nbsp;

            <strong>
            {(currentPage - 1) * 50 + 1} - {Math.min(currentPage * 50, totalCandidates)}   </strong>  of {totalCandidates} candidates
           
          </div>
     </div>






    &nbsp;

    {getUserRole() === "admin" && (

    <div className="d-flex align-items-center">

    <div className="me-3">
          <input
            type="checkbox"
            checked={selectedCandidates.length === candidates.length}
            onChange={toggleSelectAll}
          />
        </div>

        <div className="me-3">
          <button className="btn btn-primary" onClick={openBulkEditDialog}>Bulk Edit Owner</button>
        </div>
&nbsp;
        <div className="me-3">
  <button className="btn btn-danger" onClick={openBulkDeleteDialog}>
    Bulk Delete
  </button>
</div>


        </div>

)}


            <table className="table table-striped table-bordered">
        <thead>
          <tr>
          <th>Select</th> {/* Checkbox for selection */}

            <th>Name</th>
            {leadCategoryFilter === 'HR' && <th>Company</th>}

            <th>Phone</th>
            {leadCategoryFilter === 'HR' && <th>Email</th>}

            <th>City</th>
            <th>Source</th>
            <th>Status</th>
            {leadCategoryFilter !== 'HR' && <th>Owner</th>}
            <th>Last Contact</th>
            {leadCategoryFilter !== 'HR' && <th>Next</th>}
          </tr>
        </thead>
        <tbody>
          {candidates
             // Filter, sort, or map operations as needed
            ?.map((candidate) => (
              <tr key={candidate._id}>

<td>
                <input
                  type="checkbox"
                  checked={selectedCandidates.includes(candidate._id)}
                  onChange={() => toggleCandidateSelection(candidate._id)}
                />
              </td>
                <td>

                <Link href={`/admin-dash/edit-candidate/${candidate._id}`}>

       {`${candidate.name}`}
    </Link>
                    </td>
                    {leadCategoryFilter === 'HR' && <td>{candidate.company}</td>}

                <td>{candidate.phone}</td>
                {leadCategoryFilter === 'HR' && <td>{candidate.email}</td>}

                <td>{candidate.currentCity}</td>
                <td>{candidate.leadSource}</td>
                <td>{candidate.leadStatus}</td>
                {/* Display lead owner's name if available */}
                

                {leadCategoryFilter !== 'HR' && <td>{candidate.leadOwner ? candidate.leadOwner : ''}</td>}

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

            <Modal className="custom-modal"
        isOpen={isBulkModalOpen}
        onRequestClose={closeBulkEditDialog}
        contentLabel="Bulk Edit Dialog"
      >
        <h2>Bulk Edit Owner</h2>
       
        <div className="form-group">
          <label>Select New Owner:</label>
          <select
      name="leadNewOwner"
      onChange={(e) => setleadNewOwner(e.target.value)}
      className="form-select"
    >
      <option value="">Select new Owner</option>
      {leadOwners.map((owner) => (
        <option key={owner._id} value={owner._id} >
        {owner.name}
        </option>
      ))}
    </select>
  </div>
        <button  className="btn btn-primary" onClick={closeBulkEditDialog}>Cancel</button>
        &nbsp;
        <button  className="btn btn-primary" onClick={performBulkEdit}>Submit</button>
      </Modal>

      <Modal
  className="custom-modal"
  isOpen={isBulkDeleteModalOpen}
  onRequestClose={closeBulkDeleteDialog}
  contentLabel="Bulk Delete Dialog"
>
  <h2>Bulk Delete Candidates</h2>
  <p>Are you sure you want to delete the selected candidates?</p>
  <p>Selected candidates: {selectedCandidates.length}</p>
  <button className="btn btn-primary" onClick={closeBulkDeleteDialog}>
    Cancel
  </button>
  &nbsp;
  <button className="btn btn-danger" onClick={performBulkDelete}>
    Delete
  </button>
</Modal>

        </>
    );
};

export default FilterTopBox;
