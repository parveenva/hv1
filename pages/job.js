import { useState, useEffect } from "react";
import RestaurantHeader from "../components/header/RestaurantHeader";

const JobDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");
  const [jobDetails, setJobDetails] = useState(null);
  const [errors, setErrors] = useState({ phone: "" });


   useEffect(() => {
      const fetchJobDetails = async () => {
        try {
          const response = await fetch("/data/jobs/job1.txt");
          if (!response.ok) throw new Error("Failed to fetch job details");
          const data = await response.json();
          setJobDetails(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchJobDetails();
    }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

   
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    if (name === "phone") {
      const isValid = /^[0-9]{10,12}$/.test(value);
      setErrors({ ...errors, phone: isValid ? "" : "Please enter a valid mobile number." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.phone || formData.phone.trim().length < 10) {
    //   alert("Please enter a valid phone number.");
    //   return;
    // }

    const formPayload = new FormData();


    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);
    formPayload.append("jobId", "67a0e78cf8a30e1d1955a19b");

    
    
    if (formData.resume) {
      formPayload.append("resume", formData.resume);
    }

    try {
      const response = await fetch("http://localhost:8080/application/applyForJob", {
        method: "POST",
        body: formPayload,
      });
      
      if (response.ok) {
        setApplied(true);
        setMessage("Application Submitted Successfully. Check your Email for next Steps.");
        closeModal();
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  if (!jobDetails) return <div>Loading job details...</div>;


  return (
    <>
      <RestaurantHeader />
      <div className="container mx-auto px-4 md:px-6 my-11">
        <div className="w-full">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center">

              <h1 className="text-3xl font-bold text-gray-800">{jobDetails.jobTitle}</h1>
              <button
                onClick={openModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none"
              >
                {applied ? "Applied" : "Apply Now"}

              </button>
              
            </div>
            
            {message && <p style={{ color: "green", fontWeight: "bold", textAlign: "right" }}>{message}</p>}

            <p className="text-lg text-gray-600 mt-2">Location: {jobDetails.location}</p>
<p className="text-lg text-gray-600 mt-2">Industry: {jobDetails.industry}</p>
<p className="text-lg text-gray-600 mt-2">Employment Type: {jobDetails.employmentType}</p>
<p className="text-lg text-gray-600 mt-2">Salary: {jobDetails.salary}</p>
<p className="text-lg text-gray-600 mt-2">Company: {jobDetails.companyName}</p>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800">About {jobDetails.companyName}</h2>
              <p className="text-lg text-gray-600 mt-2">
              {jobDetails.about}
              </p>
            </div>

            
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800">Job Summary</h2>
              <p className="text-lg text-gray-600 mt-2">
              {jobDetails.jobSummary}
              </p>
            </div>

            <div className="mt-8">
  <h2 className="text-2xl font-bold text-gray-800">Key Responsibilities</h2>
  <ul className="list-disc list-inside text-lg text-gray-600 mt-2">
    {jobDetails.keyResponsibilities.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
</div>

<div className="mt-8">
  <h2 className="text-2xl font-bold text-gray-800">Requirements</h2>
  <ul className="list-disc list-inside text-lg text-gray-600 mt-2">
    {jobDetails.requirements.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
</div>

<div className="mt-8">
  <h2 className="text-2xl font-bold text-gray-800">Preferred Qualifications</h2>
  <ul className="list-disc list-inside text-lg text-gray-600 mt-2">
    {jobDetails.preferredQualifications.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
</div>

<div className="mt-8">
  <h2 className="text-2xl font-bold text-gray-800">Benefits</h2>
  <ul className="list-disc list-inside text-lg text-gray-600 mt-2">
    {jobDetails.benefits.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
</div>

<div className="mt-8">
  <h2 className="text-2xl font-bold text-gray-800">How to Apply</h2>
  <p className="text-lg text-gray-600 mt-2">{jobDetails.applicationDetails}</p>
</div>

 
          </div>
        </div>
      </div>

      {/* Apply Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Apply</h3>

         
            <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && (
      <span className="text-red-500 text-sm ml-2 whitespace-nowrap">
        {errors.phone}
      </span>
    )}
      </div>
      <div className="mb-4">
        <label htmlFor="resume" className="block text-lg font-medium text-gray-700">
          Upload Resume
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          className="w-full p-3 border border-gray-300 rounded-lg"
          //required
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none"
        >
          Submit Application
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="text-red-600 hover:text-red-700 transition duration-300 focus:outline-none"
        >
          Close
        </button>
      </div>
    </form>
         
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetails;
