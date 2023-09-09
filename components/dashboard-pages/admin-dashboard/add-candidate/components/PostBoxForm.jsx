// PostBoxForm.js

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useAuth } from "../../../../../app/authContext";


const PostBoxForm = () => {
  // State to store form data
  const router = useRouter();
  const { setToken,getToken,logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();

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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement form validation here

    try {

      const accessToken = getToken();

      // Make a POST request to create a new candidate
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/admin`, {
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
      console.log("Candidate added successfully:", data);

      router.push(`/admin-dash/edit-candidate/${data.data._id}`); // Redirect to the newly added candidate's page
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors here if needed
    }
  };

  return (
    <div className="container">
      <h2>Add Candidate</h2>

      <form onSubmit={handleSubmit}>
        {/* Add form fields for adding a candidate here */}
        <div className="row mb-3">
        <div className="col-md-3">

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control" 
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

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-control" 
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
