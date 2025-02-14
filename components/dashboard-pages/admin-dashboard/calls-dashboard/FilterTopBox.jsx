 import React, { useEffect, useState } from 'react';
 import { useAuth } from "../../../../app/authContext";


const FilterTopBox = () => {
  // Static data for demonstration purposes

    // State variables for user selection and date filter
     const [selectedDateFilter, setSelectedDateFilter] = useState('today'); // Default to 'today'

    const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]); // Add a state to store users


  const [salesFunnelData, setSalesFunnelData] = useState({});


  const fetchSalesFunnelData = async () => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}lead/generateSalesFunnel?user=${selectedUser}`);

      
      if (response.ok) {
        const data = await response.json();
        setSalesFunnelData(data);
      } else {
        console.error('Failed to fetch sales funnel data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching sales funnel data:', error);
    }
  };


  const statusMap = {
    1: 'New lead',
    2: 'Contacted',
    10:'Not reachable',
    14: 'Wrong phone',
    3: 'Scheduled Follow-up',
    4: 'Office Visit Scheduled',
    5: 'Office Visit Completed',
    6: 'Interested',
    7: 'All steps completed',
    13:'Consent Revent Awaited',
    8: 'Converted - Job Only',
    11: 'Converted - PAP',
    12: 'Converted - Retail',
    9: 'Not interested',
   
  };
  
  const { setToken,getToken,logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();


  const staticLeadStatusCounts = {
    'New': 15,
    'Contacted': 10,
    'Qualified': 5,
    'Closed': 2,
  };

  
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  const [summaryData, setSummaryData] = useState({});


  const staticTodayCallsCount = 20;
  const staticLast7DaysCallsCount = 100;

  const staticTodaysCallsSummary = {
    totalCalls: 30,
    oldLeads: 10,
    newLeads: 20,
    statusCounts: {
      'Pending': 5,
      'InProgress': 10,
      'Completed': 5,
    },
    sourceCounts: {
      'Website': 15,
      'Referral': 10,
      'Social Media': 5,
    },
  };

  const accessToken = getToken();



  
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


  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/leadOwners`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data); // Set the users data in the state
      } else {
        console.error('Failed to fetch users:', response.status);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchDashboardCallsSummarybyStatus = async () => {

     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}lead/dashboardCallsSummarybyStatus?user=${selectedUser}&dateFilter=${selectedDateFilter}`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

  
      setSummaryData(data);
    }  
   


    const getDateFilterLabel = (dateFilter) => {
      switch (dateFilter) {
        case 'today':
          return "Today's";
        case 'yesterday':
          return "Yesterday's";
        case 'day_before_yesterday':
          return "Day Before Yesterday's";
        case 'last_week':
          return "Last Week's";
        case 'last_2_weeks':
          return "Last 2 Weeks'";
        case 'current_month':
          return "Current Month's";
        case 'last_month':
          return "Last Month's";
        case 'total':
          return "Total";
        default:
          return '';
      }
    };
      
  useEffect(() => {
    console.error('in useeffect ');

    fetchSalesFunnelData();


       fetchDashboardCallsSummarybyStatus();

       fetchUsers(); // Call the fetchUsers function to populate users


      }, [selectedUser, selectedDateFilter]); // Trigger fetch when user or date filter changes

  return (
    <div>

<div>

  
  <div className="row">
    {/* User Dropdown Filter */}
    {getUserRole() === "admin" && (

    <div className="col-md-6">
  <label>User:</label>
  <select
    value={selectedUser}
    onChange={(e) => {
      console.log('Selected User:', e.target.value);
      setSelectedUser(e.target.value);
    }}
  >
    <option value="">All Users</option>
    {users.map((user) => (
      <option key={user._id} value={user._id}> {/* Use user.id as the value */}
        {user.name}
      </option>
    ))}
  </select>
</div>
    )}

    {/* Date Filter */}
    <div className="col-md-6">
      <label>Date Filter:</label>
      <select
        value={selectedDateFilter}
        onChange={(e) => setSelectedDateFilter(e.target.value)}
      >
       <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="day_before_yesterday">Day Before Yesterday</option>
            <option value="last_week">Last Week</option>
            <option value="last_2_weeks">Last 2 Weeks</option>
            <option value="current_month">Current Month</option>
            <option value="last_month">Last Month</option>
            <option value="total">Total</option>
            <option value="select_date">Select Date</option> {/* Option to select a specific date */}
         </select>
    </div>
  </div>

  {/* Rest of your code */}
</div>

      
      <h2>Calls Dashboard for {getTodayDate()}</h2>



      <div className="card mt-3" style={{ height: '35rem', overflowY: 'auto' }}>
  <div className="card-body">
  <h5 className="card-title">Summary of {getDateFilterLabel(selectedDateFilter)} Calls</h5>
 
 {/* Create a grid container for subsections */}
 <div className="call-summary-grid">

{/* Subsection: Total Calls */}
<div className="call-summary-subsection">
  <h6>Total Calls</h6>
  <p>{summaryData.totalCalls}</p>
</div>

{/* Subsection: Unique Leads */}
<div className="call-summary-subsection">
  <h6>Unique Leads</h6>
  <p>{summaryData.uniqueLeads}</p>
  </div>
  <div className="call-summary-subsection">

  <div className="call-summary-sub-subsection">
          <span>Fresh Calls</span>
          <span>{summaryData.freshCalls}</span>
        </div>
        <div className="call-summary-sub-subsection">
          <span>Follow-up Calls</span>
          <span>{summaryData.followupCalls}</span>
        </div>
      </div>
      </div>


  <div className="row">
        <div className="col-md-6">

    <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Total</th>
                {/* <th>New Leads</th> */}
                {/* <th>Old Leads</th> */}
                {/* Add more headers for specific data fields */}
              </tr>
            </thead>
            <tbody>
            <tr>
                <th>Status</th>
                <td>{summaryData.uniqueLeads}</td>
                {/* <td>{summaryData.newLeads}</td> */}
                {/* <td>{summaryData.oldLeads}</td> */}
                {/* Add more cells for specific data fields */}
              </tr>
              {/* Rows for individual statuses */}
             

              {Object.entries(summaryData.statusCounts || {}).map(([status, count]) => {
                  const statusName = statusMap[status] || 'Unknown';

          if (count !== null) {
            return (
              <tr key={status}>
                <th>{statusName}</th>

                <td>{count}</td>
                {/* Add more cells for specific data fields */}
              </tr>
            );
          } else {
            return null; // Return null for entries where count is null
          }
      })}

            </tbody>
            </table>
            </div>

            <div className="col-md-6">
  <table className="table">
    <thead>
      <tr>
        <th>Source</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(summaryData.sourceCounts || {}).map(([source, count]) => {
        return (
          <tr key={source}>
            <th>{source}</th>
            <td>{count}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


</div>
 
 
  </div>
</div>

      {/* First Row: Sales Funnel */}


      <div className="card mt-3" style={{ height: '30rem', overflowY: 'auto' }}>
  <div className="card-body">
  <h5 className="card-title">Sales Funnel(Total)</h5>

      <div className="row">
    
  {/* Sales Funnel Summary */}
  <div className="col-md-6">
 

  <table className="table">
    <thead>
      <tr>
        <th>Status</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>

    {Object.entries(salesFunnelData).map(([status, count]) => {
        const statusName = statusMap[status] || 'Unknown';
        return (
          <tr key={status}>
          <th>{statusName}</th>
          <td>{count}</td>
        </tr>

        );
      })}


      </tbody>
  </table>

</div>



</div>


</div>
</div>


    </div>
  );
};

export default FilterTopBox;
