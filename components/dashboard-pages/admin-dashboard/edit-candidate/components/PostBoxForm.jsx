import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Select from "react-select";
import Modal from 'react-modal'; // You'll need a modal library, like react-modal
import { useAuth } from "../../../../../app/authContext";


const PostBoxForm = ({ candidateId }) => {
  // State to store form data
  const router = useRouter();

  const { setToken,getToken,logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();


  const [isLogCallModalOpen, setIsLogCallModalOpen] = useState(false);

  const [logCallFormData, setLogCallFormData] = useState({
    currentLeadStatus: '', // You need to populate this with the current lead status
    newLeadStatus: '',
    comments: '',
    followUpDate: '',
  });


  const handleLogCallButtonClick = () => {
    setIsLogCallModalOpen(true);
  };


  const handleLogCallInputChange = (e) => {
    const { name, value } = e.target;
    setLogCallFormData({
      ...logCallFormData,
      [name]: value,
    });
  };
  const handleLogCallSubmit = async (e) => {
    e.preventDefault();
  
    const accessToken = getToken();

    const newStatus = logCallFormData.newLeadStatus;
  

    const currentPath = window.location.pathname;

    const parts1 = currentPath.split('/');
const id = parts1[parts1.length - 1];


const currentDate = new Date(); // Get the current date and time

// Format the current date as a string in the desired format, e.g., "yyyy-MM-dd"
const formattedDate = currentDate.toISOString().split('T')[0];


    // Step 1: Make a PUT request to update the candidate's status
      try {
        const updateStatusResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}candidate/admin/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              leadStatus: newStatus,
              nextFollowUpDate: logCallFormData.followUpDate, // Include the nextFollowUpDate in the request body
              lastContactedDate:  formattedDate, // Add lastContactedDate conditionally

            }),
          }
        );
    
      if (!updateStatusResponse.ok) {
        throw new Error("Network response was not ok");
      }
  

      // Step 2: Make a separate API call to log the call
      const logCallResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}candidate/logCall`, // Replace with your actual logCall endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`, // Include the authorization token

            
          },
          body: JSON.stringify({
            candidateId: id, // Replace with the actual candidate ID
            newLeadStatus: newStatus, // Assuming newStatus is a variable with the new lead status
            oldLeadStatus: formData.leadStatus, // Assuming formData.leadStatusName contains the old status
            actionDate: formattedDate, // Use the formatted current date
            comments: logCallFormData.comments,
            followUpDate: logCallFormData.followUpDate,          }),
        }
      );
  
      if (!logCallResponse.ok) {
        throw new Error("Network response was not ok");
      }
  
      // After both API calls are successful, close the modal
      setIsLogCallModalOpen(false);


      const newStatusNumber = parseInt(newStatus, 10);

      const newStatusName = leadStatuses.find((status) => status.id === newStatusNumber)?.name;


// Update the candidateData state with the new status and follow-up date
setFormData((prevData) => ({
  ...prevData,
  leadStatus: newStatus, // Update the lead status name
  leadStatusName: newStatusName, // Update the lead status name
  nextFollowUpDate: logCallFormData.followUpDate, // Update the follow-up date
}));


fetchLeadHistory(); // Fetch lead history when the component mounts
window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors here if needed
    }
  };
  

  const mandatoryFields = ["name","phone"];
  const [formErrors, setFormErrors] = useState({});

  const [editMode, setEditMode] = useState(false); // Default to view mode

  const [leadOwners, setLeadOwners] = useState([]);
 
  const [leadStatuses, setLeadStatus] = useState([]);
  const [leadSources, setLeadSources] = useState([]);


  const [leadHistory, setLeadHistory] = useState([]);


  const fetchLeadHistory = async () => {

    const currentPath = window.location.pathname;

      console.log("currentPath----------",currentPath);
     
      
  // Extract the last part of the path as the dynamic parameter
  const parts1 = currentPath.split('/');
  const id = parts1[parts1.length - 1];


    console.log("in fetchLeadHistory--------");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/logHistory/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("2 fetchLeadHistory--------");

      const data = await response.json();

      console.log("3 fetchLeadHistory--------");

      // Sort the log history data by date in descending order (latest first)
      data.sort((a, b) => new Date(b.activityDate) - new Date(a.activityDate));
      setLeadHistory(data);
    } catch (error) {
      console.error("Error fetching lead history:", error);
      // Handle errors here if needed
    }
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

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
    counsellor: '',
    counsellorName :'',
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


  const handleEducationChange = (index, field, value) => {
    setformData((prevData) => {
      const updatedEducation = [...prevData.education];
      updatedEducation[index][field] = value;
      return { ...prevData, education: updatedEducation };
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

  const isAdmin = getUserRole() === 'admin';

  
// Function to get tomorrow's date in the format "YYYY-MM-DD"
function getTomorrowDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(tomorrow.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}



const fetchJobData = async () => {

  try {

    
    const currentPath = window.location.pathname;

    console.log("currentPath----------",currentPath);
   
    
// Extract the last part of the path as the dynamic parameter
const parts1 = currentPath.split('/');
const id = parts1[parts1.length - 1];

console.log("id----------",id);

    const response =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/byId/${id}`);
   
    const data =  await response.json();
    console.log("data----------",data);

    setFormData(data);

  } catch (error) {
    console.error("Error fetching job data:", error);
  }
}
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

  // Function to fetch candidate data from API and populate form
  useEffect(() => {
    // Fetch candidate data from the API using candidateId



    const tomorrowDate = getTomorrowDate();
    setLogCallFormData({
      ...logCallFormData,
      followUpDate: tomorrowDate,
    });
    populateLeadOwner();
    populateLeadStatus();
    populateLeadSources();

  fetchJobData();

  console.log("before calling");

  fetchLeadHistory(); // Fetch lead history when the component mounts

  console.log("after calling");


  }, [candidateId]);

  // Function to handle form submission
  
  const handleSubmit = async (e) => {
    e.preventDefault();




    console.log("in handleSubmit");



    const errors = {};
    let hasErrors = false;
    mandatoryFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is mandatory";
        hasErrors = true;
      }
    });
    console.log("in aaaa");

    // If there are errors, set the formErrors state and return
    if (hasErrors) {
      setFormErrors(errors);

        // Find the first error message element by class name
        const errorElement = document.querySelector(".error-message");

        // Scroll to the error message element
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        
      return;
    }

    console.log("in handleSubmbbbbbbbbbbbit");

    try {

      const currentPath = window.location.pathname;

      const parts1 = currentPath.split('/');
  const id = parts1[parts1.length - 1];

  console.log("id----------",id);
  
      // Make API request using the apicall proxy
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("in 222222");

      const data = await response.json();
      console.log("Job submission successful:", data);

 
      //router.push(`/admin-dash/edit-candidate/${id}`); // Redirect to the employer confirmation page

      handleEditModeToggle();

      fetchJobData();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Call the onSubmit function passed as a prop to handle any additional actions after successful form submission
      if (typeof onSubmit === "function") {
        onSubmit(data); // You can pass any data or perform any actions here based on the API response
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors here if needed
    }

  };

  return (
    
    
    <div className="container">
            <h2>{editMode ? 'Edit Candidate' : 'View Candidate'}</h2>

               {/* Edit Mode Toggle Button */}
      <button
        className="btn btn-secondary mb-3"
        onClick={handleEditModeToggle}
      >
        {editMode ? 'Cancel Edit' : 'Edit Candidate'}
      </button>
      &nbsp;
      &nbsp;
      <button className="btn btn-primary mb-3" onClick={handleLogCallButtonClick}>
        Log a Call
      </button>


      {isAdmin && (
        // Render the leadCategory field for admin only
<div>
<div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">
              Lead Category
            </label>
          </div>
          <div className="col-md-3">
            {/* Render the input field for leadCategory here */}

            <span className="fw-bold fs-5">{formData.leadCategory}</span>

          </div>
        </div>


<div className="row mb-3">
<div className="col-md-3">
  <label className="form-label">
    Company
  </label>
</div>
<div className="col-md-3">
  {/* Render the input field for leadCategory here */}

  <span className="fw-bold fs-5">{formData.company}</span>

</div>
<div className="col-md-3">
  <label className="form-label">
    Job opening
  </label>
</div>
<div className="col-md-3">
  {/* Render the input field for leadCategory here */}

  <span className="fw-bold fs-5">{formData.jobOpening}</span>

</div>

</div>

</div>



      )}
      
      <form onSubmit={handleSubmit}>
        
        <h2>Primary Info</h2>

          {/* First Column */}
          

            {formErrors.name && <p className="error-message">{formErrors.name}</p>}


            <div className="row mb-3">
      <div className="col-md-3">
              <label  className="form-label">
                Name
              </label>
              </div>

                         <div className="col-md-3">
  {editMode ? ( 
                   
                   


              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
 ) : ( 
  <span className="fw-bold fs-5">{formData.name}</span>
)}
            </div>



           
            <div className="col-md-3">

          

                <label  className="form-label form-label-sm text-muted">Lead Status</label></div>
                         <div className="col-md-3">
                         {editMode ? (
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
  ) : (
               <span className="fw-bold fs-5">{formData.leadStatusName}</span>
              )}
            </div>


            </div>
            <div className="row mb-3">



            <div className="col-md-3">
                <label  className="form-label form-label-sm text-muted">Phone</label></div>
                         <div className="col-md-3">
  {editMode ? ( 


              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control"
              />
              ) : ( 
                <span className="fw-bold fs-5">{formData.phone}</span>
              )}
            </div>

      <div className="col-md-3">
                <label  className="form-label form-label-sm text-muted">Current City</label></div>
                         <div className="col-md-3">
  {editMode ? ( 


              <input
                type="text"
                name="currentCity"
                value={formData.currentCity}
                onChange={handleInputChange}
                className="form-control"
              />
              ) : ( 
                <span className="fw-bold fs-5">{formData.currentCity}</span>
              )}
            </div>
         
         

            </div>

            {/* Add more fields for the second column here */}




            <div className="row mb-3">


                    
          <div className="col-md-3">
  <label className="form-label form-label-sm text-muted">Lead Owner</label>
</div>
<div className="col-md-3">
  {editMode ? (
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
  ) : (
    <span className="fw-bold fs-5">{formData.leadOwnerName}</span>
  )}
</div>


<div className="col-md-3">
  <label className="form-label form-label-sm text-muted">Counsellor</label>
</div>
<div className="col-md-3">
  {editMode ? (
    <select
      name="counsellor"
      value={formData.counsellor}
      onChange={handleInputChange}
      className="form-select"
    >
      <option value="">Select Counsellor</option>
      {leadOwners.map((owner) => (
        <option key={owner._id} value={owner._id} >
        {owner.name}
        </option>
      ))}
    </select>
  ) : (
    <span className="fw-bold fs-5">{formData.counsellorName}</span>
  )}
</div>

            
            </div>
            <div className="row mb-3">
      <div className="col-md-3">
                <label  className="form-label form-label-sm text-muted">Last Contacted Date</label></div>
                         <div className="col-md-3">
  {editMode ? ( 


              <input
                type="date"
                name="lastContactedDate"
                value={formData.lastContactedDate}
                onChange={handleInputChange}
                className="form-control"
              />
              ) : ( 
<span className="fw-bold fs-5">
  {  formData.lastContactedDate ?  `${String(new Date(formData.lastContactedDate).getDate()).padStart(2, '0')}/${String(new Date(formData.lastContactedDate).getMonth() + 1).padStart(2, '0')}/${new Date(formData.lastContactedDate).getFullYear()}` : ''}
</span>
              )}
            </div>
            
      <div className="col-md-3">
                <label  className="form-label form-label-sm text-muted">Next Follow-Up Date</label></div>
                         <div className="col-md-3">
  {editMode ? ( 


              <input
                type="date"
                name="nextFollowUpDate"
                value={formData.nextFollowUpDate}
                onChange={handleInputChange}
                className="form-control"
              />
              ) : ( 
<span className="fw-bold fs-5">
  { formData.nextFollowUpDate ? `${String(new Date(formData.nextFollowUpDate).getDate()).padStart(2, '0')}/${String(new Date(formData.nextFollowUpDate).getMonth() + 1).padStart(2, '0')}/${new Date(formData.nextFollowUpDate).getFullYear()}` :''}
</span>
              )}
            </div>
            </div>
         
          
            <div className="row mb-3">
      <div className="col-md-3">
                <label  className="form-label form-label-sm text-muted">Lead Source</label></div>
                         <div className="col-md-3">
                         {editMode ? (
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
  ) : (
                <span className="fw-bold fs-5">{formData.leadSourceName}</span>
              )}
 
 
 
            </div>

            <div className="col-md-3">
                <label  className="form-label form-label-sm text-muted">Email</label></div>
                         <div className="col-md-3">
  {editMode ? ( 


              <input
                type="tel"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
              />
              ) : ( 
                <span className="fw-bold fs-5">{formData.email}</span>
              )}
            </div>

          {/* Second Column */}
          
           
           
      
            {/* Add more fields for the second column here */}
          </div>
 
          <div className="row mb-3">

          <div className="col-md-3">
                <label  className="form-label form-label-sm text-muted">Creation Date</label></div>
                         <div className="col-md-3">
  {editMode ? ( 

<br/>
              ) : ( 
<span className="fw-bold fs-5">
  {  formData.creationDate ?  `${String(new Date(formData.creationDate).getDate()).padStart(2, '0')}/${String(new Date(formData.creationDate).getMonth() + 1).padStart(2, '0')}/${new Date(formData.creationDate).getFullYear()}` : ''}
</span>
              )}
            </div>
            </div>


{/* Lead History */}
<h2>Lead History</h2>
<div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Activity By</th>
            <th>Old Status</th>
            <th>New Status</th>
            <th>Comments</th>
          </tr>
        </thead>
          <tbody>
            {leadHistory.map((historyItem) => (
              <tr key={historyItem.id}>
              <td>
                {new Date(historyItem.actionDate).toLocaleString('en-GB')}
              </td>
              <td>{historyItem.activityOwner}</td>
              <td>
                {leadStatuses.find((status) => status.id === parseInt( historyItem.oldLeadStatus,10))?.name || historyItem.oldLeadStatus}
              </td>
              <td>
                {leadStatuses.find((status) => status.id === parseInt(historyItem.newLeadStatus,10))?.name || historyItem.newLeadStatus}
              </td>
              <td>{historyItem.comments}</td>
            </tr>
            ))}
        </tbody>
      </table>

      {/* ... (your existing code) */}
    </div>





        
 

          <h2>Other Info</h2>

{/* First Column */}

 
  <div className="row mb-3">
<div className="col-md-3">
      <label  className="form-label form-label-sm text-muted">Age</label></div>
               <div className="col-md-3">
{editMode ? ( 


    <input
      type="text"
      name="age"
      value={formData.age}
      onChange={handleInputChange}
      className="form-control"
    />
    ) : ( 
      <span className="fw-bold fs-5">{formData.age}</span>
    )}
  </div>


{/* Second Column */}

 
 
  
<div className="col-md-3">
      <label  className="form-label form-label-sm text-muted">Gender</label></div>
               <div className="col-md-3">
{editMode ? ( 


    <input
      type="text"
      name="gender"
      value={formData.gender}
      onChange={handleInputChange}
      className="form-control"
    />
    ) : ( 
      <span className="fw-bold fs-5">{formData.gender}</span>
    )}
  </div>


  <div className="form-group col-lg-12 col-md-12">
          <label>Spoken Languages</label>
          <input
            type="text"
            name="languages"
            disabled
            value={formData.languages}
            onChange={handleInputChange}
       
            placeholder=""
            />
    
{/* 
        <div className="spoken-languages-labels">
            {spokenLanguages.map((language) => (
              <span
                key={language}
                className={`tag-label ${
                  formData.languages.includes(language) ? "selected" : ""
                }`}
                onClick={() => handleLanguageClick(language)}
              >
                {language}
              </span>
            ))}
          </div> */}
        </div>


        <div className="form-category col-lg-12" style={{ marginBottom: '20px' }}>
          <h2>Preferences</h2>
          </div>
 

 
          <div className="row mb-3">
<div className="col-md-3">
      <label  className="form-label form-label-sm text-muted">Type of work</label></div>
               <div className="col-md-3">
{editMode ? ( 


    <input
      type="text"
      name="jobOrInternship"
      value={formData.jobOrInternship}
      onChange={handleInputChange}
      className="form-control"
    />
    ) : ( 
      <span className="fw-bold fs-5">{formData.jobOrInternship}</span>
    )}
  </div>


 
 <div className="col-md-3">
      <label  className="form-label form-label-sm text-muted">Availability</label></div>
               <div className="col-md-3">
{editMode ? ( 


    <input
      type="text"
      name="typeOfWork"
      value={formData.typeOfWork}
      onChange={handleInputChange}
      className="form-control"
    />
    ) : ( 
      <span className="fw-bold fs-5">{formData.typeOfWork}</span>
    )}
  </div>
  </div>
<div className="form-group col-lg-6 col-md-12">
          <label>Preferred City</label>

          <input
            type="text"
            name="preferredCity"
            disabled
            value={formData.preferredCity}
            onChange={handleInputChange}
       
            placeholder=""
            />
          </div>


<div className="form-group col-lg-6 col-md-12">
  <label>Work Mode Preferences</label>
  <Select
    isMulti
    disabled
    name="workModePreferences"
    options={[
      { value: "In Office", label: "In Office" },
      { value: "Work from Home", label: "Work from Home" },
      { value: "Hybrid", label: "Hybrid" },
    ]}
    value={formData.workModePreferences.map((mode) => ({
      value: mode,
      label: mode,
    }))}
    onChange={(selectedOptions) => {
      const selectedValues = selectedOptions.map((option) => option.value);
      setformData((prevData) => ({
        ...prevData,
        workModePreferences: selectedValues,
      }));
    }}
  />
</div>

  <div className="form-category col-lg-12" style={{ marginBottom: '20px' }}>
  <h2>Education Details</h2>
</div>

<div className="form-group col-lg-12 col-md-12">
  <label>Highest Qualitcation/Degree/Diploma</label>
  {formData.education.map((edu, index) => (
    <div key={index} className="education-entry">
      <div className="education-row">
        <div className="education-column">
          <input
            type="text"
            name={`education[${index}].degree`}
            placeholder="Degree"
            disabled
            value={edu.degree}
            onChange={(e) =>
              handleEducationChange(index, "degree", e.target.value)
            }
          />
          <input
            type="text"
            name={`education[${index}].startYear`}
            placeholder="Start Year"
            disabled
            value={edu.startYear}
            onChange={(e) =>
              handleEducationChange(index, "startYear", e.target.value)
            }
          />
          
        </div>
        <div className="education-column">
        <input
            type="text"
            name={`education[${index}].stream`}
            placeholder="Stream"
            disabled
            value={edu.stream}
            onChange={(e) =>
              handleEducationChange(index, "stream", e.target.value)
            }
          />
          <input
            type="text"
            name={`education[${index}].endYear`}
            placeholder="End Year"
            disabled
            value={edu.endYear}
            onChange={(e) =>
              handleEducationChange(index, "endYear", e.target.value)
            }
          />
        </div>
      </div>
      <input
        type="text"
        name={`education[${index}].institution`}
        placeholder="Institution"
        disabled
        value={edu.institution}
        onChange={(e) =>
          handleEducationChange(index, "institution", e.target.value)
        }
      />
    </div>
  ))}
  {/* <button
    type="button"
    onClick={() =>
      setformData((prevData) => ({
        ...prevData,
        education: [
          ...prevData.education,
          {
            degree: "",
            stream: "",
            startYear: "",
            endYear: "",
            institution: "",
          },
        ],
      }))
    }
  >
    Add More 
  </button> */}
</div>




  {/* Add more fields for the second column here */}
</div>



        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Update Candidate
        </button>
      </form>

      <Modal   className="custom-modal"  isOpen={isLogCallModalOpen} onRequestClose={() => setIsLogCallModalOpen(false)}>
        <h2>Log a Call</h2>
        <form onSubmit={handleLogCallSubmit}>
        <div className="row mb-6">

          <div className="mb-3">
            <label>Current Status&nbsp;&nbsp; :&nbsp;&nbsp;</label>
            <span className="fw-bold">{formData.leadStatusName}</span>
          </div>
     <div className="mb-3">
            <select
              name="newLeadStatus"
              className="form-control" 

              value={logCallFormData.newLeadStatus}
              onChange={handleLogCallInputChange}
            >
              <option value="">Select New Lead Status</option>
              {leadStatuses.map((status) => (
<option key={status.id} value={status.id} selected={status.name === formData.leadStatusName}>

                  {status.name}
                </option>
              ))}
            </select>
            </div>
          <div className="mb-3">
             <textarea
              name="comments"
              value={logCallFormData.comments}
              onChange={handleLogCallInputChange}
              rows="4"
              placeholder='comments'
              className="form-control" 

            ></textarea>
          </div>
          
          <div className="col-md-3">
          
            <label>Follow-Up Date<br/></label> <br/>
            </div>
            <div className="col-md-3">

            <input
              type="date"
              name="followUpDate"
              value={logCallFormData.followUpDate}
              onChange={handleLogCallInputChange}
                  className="form-control" 

            />
          </div>
          <div className="col-md-3">

          <button type="submit" className="btn btn-primary">
            Log Call
          </button>
</div>
          <div className="col-md-3">

          <button type="button" className="btn btn-secondary" onClick={() => setIsLogCallModalOpen(false)}>
        Cancel
      </button>
      </div>
      </div>

        </form>
      </Modal>
    </div>
  );
};

export default PostBoxForm;
