import React, { useEffect, useState } from 'react';
import { useAuth } from "../../../../../app/authContext";




const AllCallsPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(5);
const [perPage] = useState(50); // Set the number of records per page

const [totalCalls, setTotalCalls] = useState();

const [leadOwners, setleadOwners] = useState([]);


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



 




const changePage = (page) => {
  setCurrentPage(page);
};

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



  const { setToken,getToken,logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();

  const [allCalls, setAllCalls] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    userId: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const accessToken = getToken();




  
  const fetchTotalCalls = async () => {
    try {
        console.error("in fetchTotalCandidates");

        const queryString = new URLSearchParams(filters).toString();



        let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}candidate/total-calls?leadCategory=HR&${queryString}`;

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

        setTotalCalls(data.total);
        console.error("in data total",data.total);


        setTotalPages(Math.ceil(data.total / 50));
      } catch (error) {
        console.error("Error fetching total candidates:", error);
      }
    };


    
    const fetchAllCalls = async () => {

      const queryString = new URLSearchParams(filters).toString();


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/all-calls?leadCategory=HR&page=${currentPage}&${queryString}`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      
        setAllCalls(data);
    }




  useEffect(() => {
    // Fetch all call records initially
    populateLeadOwner();



    fetchAllCalls();
    fetchTotalCalls();

  }, [currentPage, filters]); // Watch for changes in currentPage and filters

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <h2 className="me-3">All Calls</h2>

        <div className="me-3">
          {/* <label htmlFor="fromDate">From Date:</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
          />

          <label htmlFor="toDate">To Date:</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
          /> */}

          <label htmlFor="userId">User ID:</label>
          <select
            id="userId"
            name="userId"
            value={filters.userId}
            onChange={handleFilterChange}
          >
            <option value="">User</option>
      {leadOwners.map((owner) => (
        <option key={owner._id} value={owner._id} >
        {owner.name}
        </option>
      ))}
    
            {/* Add options here */}
          </select>
          {/* <button
            className="btn btn-primary"
            onClick={fetchAllCalls}
          >
            Apply Filters
          </button> */}
        </div>
      </div>

      <div className="table-responsive">

      <div>
  <button onClick={prevPage} disabled={currentPage === 1}>
    Previous
  </button>
  &nbsp;
  <button onClick={nextPage} disabled={currentPage === totalPages}>
    Next
  </button>
  &nbsp;
  <strong>
  <strong>
            {(currentPage - 1) * 50 + 1} - {Math.min(currentPage * 50, totalCalls)}   </strong>  of {totalCalls} calls
  </strong>
</div>

        <table className="table table-striped table-bordered">
          {/* Table headers */}
          <thead>
            <tr>
            <th>Call Date/Time</th>
              <th>Name</th>
              <th>Phone</th>

               <th>Old Lead Status</th>
              <th>New Lead Status</th>
              <th>Comments</th>
              <th>Follow-Up Date</th>
              <th>User</th>            </tr>
          </thead>

          {/* Table data */}
          <tbody>
            {allCalls.map((call) => (
              <tr key={call._id}>

<td>{call.actionDate ? `${new Date(call.actionDate).toLocaleDateString()} ${new Date(call.actionDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}</td>

              <td>{call.candidate.name}</td>
              <td>{call.candidate.phone}</td>

               <td>{call.oldLeadStatus}</td>
              <td>{call.newLeadStatus}</td>
               <td>{call.comments}</td>
              <td>{call.followUpDate ? new Date(call.followUpDate).toLocaleDateString() : ''}</td>
              <td>{call.user ? call.user.name : ''}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCallsPage;
