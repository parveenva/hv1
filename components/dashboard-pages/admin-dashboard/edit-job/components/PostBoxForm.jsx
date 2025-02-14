import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Map from "../../../Map";
import Select from "react-select";

const PostBoxForm = ({ onSubmit }) => {
  const specialisms = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Management", label: "Management" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];

  const router = useRouter();

 
  
  const [formData, setFormData] = useState({
    jobTitle: "",
    jd: "",
    company: "", // Company ID
    city: "",
    time: "",
    salary: "",
    link: "",
    tag: "",
    minDestination: "",
    maxDestination: "",
    category: "",
    created_at: "",
    experience: "",
    skills: [],
    openings: "",
    salaryType: "fixed", // Default to fixed salary type
    salaryFixed: "",
    salaryRangeMin: "",
    salaryRangeMax: "",
    active: true,
  });

  const [companies, setCompanies] = useState([]); // State for storing fetched companies


  const [formErrors, setFormErrors] = useState({});

 
  // Mandatory fields that must be filled
  const mandatoryFields = ["jobTitle", "jd"];


  const [selectedSkills, setSelectedSkills] = useState([
    "Programming",
    "Web Development",
    "Data Analytics",
    "Machine Learning",
    "UI/UX",
    "Digital Marketing",
    "Soft Skills",
    "Customer Service",
    "Sales",
    "Business development",
    "Marketing",

  ]);
  
  const handleSkillsChange = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData((prevData) => ({
        ...prevData,
        skills: prevData.skills.filter((lang) => lang !== skill),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, skill],
      }));
    }
  };


  const currentPath = window.location.pathname;

  // Extract the last part of the path as the dynamic parameter
  const parts1 = currentPath.split('/');
  const jobId = parts1[parts1.length - 1];

  useEffect(() => {


    const fetchJobData = async () => {

 
      try {
 
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}job/${jobId}`); // Replace with your API endpoint
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };
    fetchJobData();
  
    // Fetch companies from the API and update the companies state
    const fetchCompanies = async () => {
      try {

        
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}company`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Error fetching companies");
        }
        const data = await response.json();
        setCompanies(data); // Update the companies state with fetched data
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    const errors = {};
    let hasErrors = false;
    mandatoryFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is mandatory";
        hasErrors = true;
      }
    });

    // If there are errors, set the formErrors state and return
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    try {
      // Make API request using the apicall proxy
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}job/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Job submission successful:", data);

      router.push("/admin-dash/employer-confirmation"); // Redirect to the employer confirmation page

      // Call the onSubmit function passed as a prop to handle any additional actions after successful form submission
      if (typeof onSubmit === "function") {
        onSubmit(data); // You can pass any data or perform any actions here based on the API response
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors here if needed
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">


      <div className="form-group col-lg-6 col-md-12">
          <label>Status</label>
          <select
            className="chosen-single form-select"
            name="active"
            value={formData.active}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
           </select>
        </div>
      <div className="form-group col-lg-6 col-md-12">
          <label>Job/Internship</label>
          <select
            className="chosen-single form-select"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1">Job</option>
            <option value="2">Internship</option>
           </select>
        </div>

      <div className="form-group col-lg-12 col-md-12">
          <label>Company</label>
          <select
            name="company"
            value={formData.company._id}
            onChange={handleChange}
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}

</select>
          {formErrors.company && <p className="error-message">{formErrors.company}</p>}
        </div>
        {/* Job Title */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Title"
            value={formData.jobTitle}
            onChange={handleChange}
          />
                    {formErrors.jobTitle && <p className="error-message">{formErrors.jobTitle}</p>}

        </div>

        {/* Job Description */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea
            name="jd"
            placeholder="Description"
            value={formData.jd}
            onChange={handleChange}
          />
                    {formErrors.jd && <p className="error-message">{formErrors.jd}</p>}

        </div>

        {/* Radio buttons for the "Where will an employee report to work?" question */}
        {/* <div className="form-group col-lg-12 col-md-12">
          <label>Where will an employee report to work?</label>
          <div className="radio-option radio-box">
            <input
              type="radio"
              name="reportToAddress"
              value="specific"
              checked={formData.reportToAddress === "specific"}
              onChange={handleChange}
            />
            <label>Employees will report to a specific address</label>
            <input
              type="radio"
              name="reportToAddress"
              value="not_specific"
              checked={formData.reportToAddress === "not_specific"}
              onChange={handleChange}
            />
            <label>Employees will not report to a specific address</label>
          </div>
        </div> */}

        {/* Complete Address */}
        <div className="form-group col-lg-12 col-md-12">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder=""
            value={formData.city}
            onChange={handleChange}
          />
        </div>


        <div className="form-group col-lg-12 col-md-12">
          <label>Salary Type</label>
          <select
            name="salaryType"
            value={formData.salaryType}
            onChange={handleChange}
          >
            <option value="fixed">Fixed</option>
            <option value="range">Range</option>
          </select>
        </div>

        {formData.salaryType === "fixed" && (
          <div className="form-group col-lg-12 col-md-12">
            <label>Fixed Salary</label>
            <input
              type="text"
              name="salaryFixed"
              placeholder="Fixed Salary"
              value={formData.salaryFixed}
              onChange={handleChange}
            />
          </div>
        )}

{formData.salaryType === "range" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Salary Range Min</label>
            <input
              type="text"
              name="salaryRangeMin"
              placeholder="Min Salary"
              value={formData.salaryRangeMin}
              onChange={handleChange}
            />
          </div>
        )}

{formData.salaryType === "range" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Salary Range Max</label>
            <input
              type="text"
              name="salaryRangeMax"
              placeholder="Max Salary"
              value={formData.salaryRangeMax}
              onChange={handleChange}
            />
          </div>
        )}  

<div className="form-group col-lg-12 col-md-12">
        <label>Skills</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder=""
        />
         <div className="spoken-languages-labels">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className={`tag-label ${
                formData.skills.includes(skill) ? "selected" : ""
              }`}
              onClick={() => handleSkillsChange(skill, 'skills')}
            >
              {skill}
            </span>
          ))}
        </div>

        </div>


        {/* Industry */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <select
            className="chosen-single form-select"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="IT & Software">IT & Software</option>
            <option value="Banking">Banking</option>
            <option value="Digital & Creative">Digital & Creative</option>
            <option value="Retail">Retail</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Management">Management</option>
          </select>
        </div>

        {/* Experience */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <select
            className="chosen-single form-select"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Freshers">Freshers</option>
            <option value="Upto 2 Years">Upto 2 Years</option>
            <option value="2 to 6 Years">2 to 6 Years</option>
            <option value="7 to 12 Years">7 to 12 Years</option>
            <option value="12+ Years">12+ Years</option>
          </select>
        </div>

        {/* Gender */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <select
            className="chosen-single form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Qualification */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <select
            className="chosen-single form-select"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Any Bachelor's Degree">Any Bachelor's Degree</option>
            <option value="Any Master's Degree">Any Master's Degree</option>
            <option value="Bachelor of Technology (B.Tech)">Bachelor of Technology (B.Tech)</option>
            <option value="Bachelor of Science (B.Sc)">Bachelor of Science (B.Sc)</option>
            <option value="Bachelor of Arts (BA)">Bachelor of Arts (BA)</option>
            <option value="Bachelor of Commerce (B.Com)">Bachelor of Commerce (B.Com)</option>
            <option value="Bachelor of Business Administration (BBA)">Bachelor of Business Administration (BBA)</option>
            <option value="Master of Technology (M.Tech)">Master of Technology (M.Tech)</option>
            <option value="Master of Science (M.Sc)">Master of Science (M.Sc)</option>
            <option value="Master of Arts (MA)">Master of Arts (MA)</option>
            <option value="Master of Commerce (M.Com)">Master of Commerce (M.Com)</option>
            <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
            <option value="Doctor of Philosophy (Ph.D.)">Doctor of Philosophy (Ph.D.)</option>
            <option value="Diploma">Diploma</option>
            <option value="Post Graduate Diploma">Post Graduate Diploma</option>
            <option value="Professional Certification">Professional Certification</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Application Deadline Date */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Application Deadline Date</label>
          <input
            type="text"
            name="applicationDeadline"
            placeholder="e.g. 06.04.2023"
            value={formData.applicationDeadline}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            Post Job
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
