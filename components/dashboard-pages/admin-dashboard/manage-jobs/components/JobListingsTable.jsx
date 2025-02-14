import Link from "next/link";
import { useEffect, useState } from "react";
import React from 'react';


const JobListingsTable = () => {

  const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(5);
const [perPage] = useState(50);
const [totalCalls, setTotalCalls] = useState();


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

// const handleFilterChange = (e) => {
//   const { name, value } = e.target;
//   setFilters({
//     ...filters,
//     [name]: value,
//   });
// };

const endpoint = "job/admin"; // Replace with the specific API's endpoint


const fetchTotalCalls = async () => {
  try {
    // const queryString = new URLSearchParams(filters).toString();
    // let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}candidate/total-calls?${queryString}`;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${(endpoint)}/total`);


    const data = await response.json();

   
    setTotalCalls(data.total);
    setTotalPages(Math.ceil(data.total / 50));
  } catch (error) {
    console.error("Error fetching total candidates:", error);
  }
};



  const [jobs, setJobs] = useState([]);

  useEffect(() => {


  // Fetch jobs from the generic API route with the specified endpoint
  const fetchJobs = async () => {
    try {
      // Call the generic API route and provide the desired endpoint as a query parameter

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${(endpoint)}?page=${currentPage}`);

       const data = await response.json();
       
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  fetchJobs();
  fetchTotalCalls();

}, [currentPage]);


  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4> 
                      
          {/* <Link className="applied" href="post-jobs">
            Post Job
          </Link> */}
          </h4>

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
      {(currentPage - 1) * 50 + 1} - {Math.min(currentPage * 50, totalCalls)} of {totalCalls} jobs
    </strong>
  </strong>
</div>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.slice(0, 50).map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                            {/* <Link href={`/job-single-v1/${item._id}`}> */}
                              {item.jobTitle}
                            {/* </Link> */}
                            <br/>
                            {item.company ? item.company.name : ''}
                            <br/>
                            {item.city}

                     </td>
                  <td className="applied">
                    <a href="#">   {item.applicantCount}</a>
                  </td>
                  <td>
                  {item.created_at ? (new Date(item.created_at)).toLocaleString('en-UK', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
   // hour: '2-digit',
    //minute: '2-digit',
    //hour12: true, // Use AM/PM format
  }):""}
                            {/* <br />
                    April 25, 2011 */}
                  </td>
                  <td className="status">{item.active?"Active":"Inactive"}</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        {/* <li>
                          <button data-text="View Aplication">
                            <span className="la la-eye"></span>
                          </button>
                        </li> */}

<li>
  {/* <a href={`/admin-dash/edit-job/${item._id}`}> */}
    <button data-text="Edit">
      <span className="la la-pencil"></span>
     </button>
  {/* </a> */}
</li>
                        {/* <li>
                          <button data-text="Delete Aplication">
                            <span className="la la-trash"></span>
                          </button>
                        </li> */}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
