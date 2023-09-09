// PostBoxForm.js

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from "../../../../../app/authContext";

const PostBoxForm = () => {
  // State to store form data
  const router = useRouter();
  const { setToken,getToken,logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();

  const [counts, setCounts] = useState({ newLead: 0, dup: 0 ,inValidData:0}); // Initialize counts state
  const [showCounts, setShowCounts] = useState(false); // Initialize flag for showing counts

  const [leadOwners, setLeadOwners] = useState([]);
  const [leadStatuses, setLeadStatus] = useState([]);
  const [leadSources, setLeadSources] = useState([]);


  const [formData, setFormData] = useState({
    user: '',
    name: '',
    filePath: '',
    email: '',
    phone: '',
    age: '',
    currentCity: '',
    languages: [],
    additionalInformation: '',
     areasOfInterest: [],
     workModePreferences: [],
    preferredCity: '',
    education: [
      {
        institution: '',
        degree: '',
        startYear: '',
        endYear: '',
      },
    ],
    experience: [
      {
        company: '',
        title: '',
        description: '',
        startYear: '',
        endYear: '',
      },
    ],
    skills: [],
    certifications: [
      {
        name: '',
        issuer: '',
        issueDate: '',
        expirationDate: '',
      },
    ],
    profileSummary: '',
    isAvailable: true,
    leadSource: '',
    leadSourceName: '',
    leadStatus: '',
    leadStatusName: '',

    leadOwner: '',
    leadOwnerName:'',
    lastContactedDate: '',
    nextFollowUpDate: '',
    leadNotes: '',
    leadScore: '',
    isConverted: false,
    conversionFailureReason: '',
    leadActivities: [
      {
        activityType: '',
        activityDate: '',
        activityDescription: '',
        activityOwner: '',
      },
    ],
  });


  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      setLeadOwners(data);
    } catch (error) {
      console.error("Error fetching lead owners:", error);
      // Handle errors here if needed
    }
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
      setLeadStatus(data);
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
      setLeadSources(data);
    } catch (error) {
      console.error("Error fetching lead owners:", error);
      // Handle errors here if needed
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement form validation here

    try {

      const accessToken = getToken();

      // Make a POST request to create a new candidate
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/parse-lead`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Include the authorization token

          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Candidate parsed successfully:", data);

      setCounts({ newLead: data.newLead, dup: data.dup,inValidData:data.inValidData });

      setShowCounts(true);

    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors here if needed
    }
  };

  
useEffect(() => {


  populateLeadOwner();
  populateLeadSources();
  populateLeadStatus();
  
  }, []);
  
  return (
    <div className="container">
      <h2>Parse sheets</h2>
      {showCounts && (
        <div>
          New Leads: {counts.newLead}, Duplicates: {counts.dup} , Invalids: {counts.inValidData} 
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Add form fields for adding a candidate here */}
        <div className="row mb-12">
        <div className="col-md-12">

          <label>Google Sheet URL</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="form-control" 
          />
        </div>
 \       </div>

 <div className="row mb-12">
       
 <div className="col-md-3">
  <label className="form-label form-label-sm text-muted">Lead Owner</label>
</div>
<div className="col-md-3">
     <select
      name="leadOwner"
      value={formData.leadOwner}
      onChange={handleInputChange}
      className="form-select"
    >
      <option value="">Select Lead Owner</option>
      {leadOwners.map((owner) => (
        <option key={owner._id} value={owner._id} selected={owner.name === formData.leadOwnerName}>
        {owner.name}
        </option>
      ))}
    </select>
 
</div>
</div>


            <div className="row mb-12">
      <div className="col-md-3">
                <label  className="form-label form-label-sm text-muted">Lead Source</label></div>
                         <div className="col-md-3">
     <select
      name="leadSource"
      value={formData.leadSource}
      onChange={handleInputChange}
      className="form-select"
    >
      <option value="">Select Lead Source</option>
      {leadSources.map((source) => (
        <option key={source.id} value={source.id} selected={source.name === formData.leadSourceName}>
          {source.name}
        </option>
      ))}
    </select>
            </div>

 
          {/* Second Column */}
          
           
           

            {/* Add more fields for the second column here */}
          </div>
        {/* Add other form fields here */}

        <div className="row mb-12">


        <div className="col-md-3">

          

<label  className="form-label form-label-sm text-muted">Lead Status</label></div>
         <div className="col-md-3">
 <select
name="leadStatus"
value={formData.leadStatus}
onChange={handleInputChange}
className="form-select"
>
<option value="">Select Lead Status</option>
{leadStatuses.map((status) => (
<option key={status.id} value={status.id} selected={status.name === formData.leadStatusName}>

{status.name}
</option>
))}
</select>
</div>
</div>

        <button type="submit" className="btn btn-primary">
          Parse
        </button>
      </form>
    </div>
  );
};

export default PostBoxForm;
