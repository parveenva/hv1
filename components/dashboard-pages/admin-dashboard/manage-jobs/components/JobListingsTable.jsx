import Link from "next/link";
import { useEffect, useState } from "react";
import React from 'react';


const JobListingsTable = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

  const endpoint = "job/admin"; // Replace with the specific API's endpoint

  // Fetch jobs from the generic API route with the specified endpoint
  const fetchJobs = async () => {
    try {
      // Call the generic API route and provide the desired endpoint as a query parameter

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${(endpoint)}`);

       const data = await response.json();
       
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  fetchJobs();
}, []);


  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>

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
                <th>Created & Expired</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.slice(0, 10).map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                        
                          <ul className="job-info">
                            
                          <li>
                            <Link href={`/job-single-v1/${item._id}`}>
                              {item.jobTitle}
                            </Link>
                          </li>
                            <li>
                              <span className="icon flaticon-briefcase"></span>
                              {item.company ? item.company.name : 'Code91'}
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              {item.location}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="applied">
                    <a href="#">3+ Applied</a>
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
  <a href={`/admin-dash/edit-job/${item._id}`}>
    <button data-text="Edit">
      <span className="la la-pencil"></span>
     </button>
  </a>
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
