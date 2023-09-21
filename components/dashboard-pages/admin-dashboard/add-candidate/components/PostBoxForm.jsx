// PostBoxForm.js

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from "../../../../../app/authContext";


const PostBoxForm = () => {
  // State to store form data
  const router = useRouter();
  const { setToken,getToken,logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();

  const [error, setError] = useState(null); // Error state

  const [formData, setFormData] = useState({
    logCall: true, // Set it to true by default
    callDate:'',
    newLeadStatus :'',
    followUpDate: '', // Add the Follow-Up Date field


    user: '',
    name: '',
    filePath: '',
    email: '',
    phone: '',
    age: '',
    currentCity: '',
    languages: [],
    additionalInformation: '',
    gender: 'Male', // Default value
    typeOfWork: 'Full-Time', // Default value
    areasOfInterest: [],
    jobOrInternship: 'Job', // Default value
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

  const [leadStatuses, setLeadStatus] = useState([]);

  const [showCompanyField, setShowCompanyField] = useState(false); // Track if Company field should be shown
  const [jobOpenings, setJobOpenings] = useState(["Java", "MERN"]); // Values for the Job Opening dropdown

  
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
  // Function to handle form field changes
  const handleInputChange = (e) => {

    const { name, value, type, checked } = e.target;

 
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }


    if (name === 'leadCategory' ) {
      if ( value === 'HR') {
      setShowCompanyField(true);
       } else {
      setShowCompanyField(false);
      }
    }
  };

  // Function to handle form submission
 
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getTomorrowDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(tomorrow.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  
  useEffect(() => {
    // Fetch candidate data from the API using candidateId

    const tomorrowDate = getTomorrowDate();
    setFormData({
      ...formData,
      //followUpDate: tomorrowDate,
      callDate: getTodayDate(), // Set the default call date to today's date

    });
      populateLeadStatus();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Implement form validation here
  
    try {
      const accessToken = getToken();

      // Create a data object to hold the form data
    const fdata = {
      ...formData,
      lastContactedDate: formData.logCall ? formData.callDate : null,
      leadStatus: formData.newLeadStatus ? formData.newLeadStatus : "1",

    };

    // Include leadCategory in the request body only for admin users
    if (getUserRole() === 'admin') {
      fdata.leadCategory = formData.leadCategory;
    }
  
      // Make a POST request to create a new candidate
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/admin`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Include the authorization token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fdata),
      });
  
      if (!response.ok) {
  //      throw new Error("Network response was not ok");

  const errorResponse = await response.json();
  const errorMessage = errorResponse.error; // Access the error message
  // throw new Error(errorMessage);

 

  setError(errorResponse.error); // Set the error message
  // Scroll to the error message
  window.scrollTo({ top: 0, behavior: "smooth" });
 return;
      }
  
      const data = await response.json();
      console.log("Candidate added successfully:", data);
  
      // Check if the logCall checkbox is selected
      if (formData.logCall) {
        // Make a POST request to log the call to a different API
        const callResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/logCall`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Include the authorization token
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            actionDate: formData.callDate,
            followUpDate: formData.followUpDate, // Include Follow-Up Date in the request

            comments: formData.callNotes,
            newLeadStatus : formData.newLeadStatus,
            candidateId: data.data._id, // Use the candidate ID from the previous response
           }),
        });
  
        if (!callResponse.ok) {
          throw new Error("Error logging the call");
        }
  
        console.log("Call logged successfully");
      }
  
      router.push(`/admin-dash/edit-candidate/${data.data._id}`); // Redirect to the newly added candidate's page
    } catch (error) {
      console.error("Error submitting form:", error);

      setError(error.message); // Set the error message
      // Scroll to the error message
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Handle errors here if needed
    }
  };
  

  return (
    <div className="container">
      <h2>Add Candidate</h2>

      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

      <form onSubmit={handleSubmit}>
        {/* Add form fields for adding a candidate here */}


        {getUserRole() === 'admin' && (
  <div className="row mb-3">
    <div className="col-md-3">
      <label>Lead Category
      <span className="text-danger">*</span> {/* Red star for mandatory field */}


      </label>
      <select
        name="leadCategory"
        className="form-control"
        value={formData.leadCategory}
        onChange={handleInputChange}
      >
        <option value="">Select Lead Category</option>
        <option value='HR'>HR</option>
        <option value='Candidate'>Candidate</option>
                {/* Add more options as needed */}
      </select>
    </div>
  </div>
)}

{showCompanyField && (
  <div>
    <div className="row mb-3">
      <div className="col-md-3">
        <label>Company
        <span className="text-danger">*</span> {/* Red star for mandatory field */}

        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="form-control"
          required // Make it mandatory when the leadCategory is "HR"
        />
      </div>
      <div className="col-md-3">
        <label>Job Opening
        <span className="text-danger">*</span> {/* Red star for mandatory field */}

        </label>
        <select
          name="jobOpening"
          required
          className="form-control"
          value={formData.jobOpening}
          onChange={handleInputChange}
        >
          <option value="">Select Job Opening</option>
          {jobOpenings.map((jobOpening) => (
            <option key={jobOpening} value={jobOpening}>
              {jobOpening}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
)}



        <div className="row mb-3">
        <div className="col-md-3">

          <label>Name
          <span className="text-danger">*</span> {/* Red star for mandatory field */}

          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control" 
            required // Add the required attribute

          />
        </div>
 
         <div className="col-md-3">

          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control" 
          />
        </div>
        </div>


        <div className="row mb-3">
        <div className="col-md-3">

          <label>Phone
          {!showCompanyField && <span className="text-danger">*</span>} {/* Conditional red star */}

          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-control" 
            {...(showCompanyField ? {} : { required: true })}

          />
        </div>
        <div className="col-md-3">

          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="form-control" 
          />
        </div>


        <div className="row mb-3">
  <div className="col-md-3">
    <label>Log a Call</label>
    <input
      type="checkbox"
      name="logCall"
      checked={formData.logCall}
      onChange={handleInputChange}
    />
  </div>
</div>


{formData.logCall && (
  <div>
    <div className="row mb-3">
    
      <div className="col-md-3">
        <label>Follow-Up Date</label>
        <input
          type="date"
          name="followUpDate" // Add a new field for Follow-Up Date
          value={formData.followUpDate}
           onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        
      <label>Lead Status</label>

        <select
          name="newLeadStatus"
          className="form-control"
          value={formData.newLeadStatus}
          onChange={handleInputChange}
          required={formData.logCall} // Add the condition to make it required when logCall is true
        >
          <option value="">Select New Lead Status</option>
          {leadStatuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
        </div>
        </div>

    <div className="row mb-3">
      <div className="col-md-6">
        <label>Call Notes</label>
        <textarea
          name="callNotes"
          value={formData.callNotes}
          onChange={handleInputChange}
          className="form-control"
          required={formData.logCall} // Add the condition to make it required when logCall is true

        ></textarea>
      </div>
    </div>

    <div className="row mb-3">
      <div className="col-md-3">
        <label>Call Date</label>
        <input
          type="date"
          name="callDate"
          value={formData.callDate}
          required={formData.logCall} // Add the condition to make it required when logCall is true

          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      </div>


  </div>
)}

        </div>

        {/* Add other form fields here */}

        <button type="submit" className="btn btn-primary">
          Add Candidate
        </button>
      </form>
    </div>
  );
};

export default PostBoxForm;
