import Select from "react-select";
import { useAuth} from "../../../../../../app/authContext";
import { useEffect, useState } from "react";
import CvUploader from "../../../cv-manager/components/CvUploader";


const FormInfoBox =  ({ afterSave }) => {

  const { userRole, isLoggedIn ,uId} = useAuth();
  const [resumeFile, setResumeFile] = useState(null);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    console.log("in handleResumeChange");
    setResumeFile(file);

   // setCandidateData((prevData) => ({ ...prevData, resumeFile: file }));

  };

  
  const [candidateData, setCandidateData] = useState({
    phone: "",
    email: "",
    age: "",
    currentCity: "",
    languages: "",
    additionalInformation: "",
    gender: "",
    typeOfWork: "",
    areasOfInterest: [],
    jobOrInternship: "",
    workModePreferences: [],
    preferredCity: "",
    education: [
      {
        institution: "",
        degree: "",
        startYear: "",
        endYear: "",
      },
    ],
    experience: [
      {
        company: "",
        title: "",
        description: "",
        startYear: "",
        endYear: "",
      },
    ],
    internExp: [
      {
        company: "",
        title: "",
        description: "",
        startYear: "",
        endYear: "",
      },
    ],
    skills: [],
    certifications: [
      {
        name: "",
        issuer: "",
        issueDate: "",
        expirationDate: "",
      },
    ],
    profileSummary: "", // Add the profile summary field
    //resumeFile: null, // Initialize with null or default resume file

    // ... other properties ...
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [spokenLanguages, setSpokenLanguages] = useState([
    "Hindi",
    "English",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Gujarati",
    "Kannada",
    "Odia",
    "Punjabi",
  ]);

  const handleLanguageClick = (language) => {
    if (candidateData.languages.includes(language)) {
      setCandidateData((prevData) => ({
        ...prevData,
        languages: prevData.languages.filter((lang) => lang !== language),
      }));
    } else {
      setCandidateData((prevData) => ({
        ...prevData,
        languages: [...prevData.languages, language],
      }));
    }
  };
  

    
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
    if (candidateData.skills.includes(skill)) {
      setCandidateData((prevData) => ({
        ...prevData,
        skills: prevData.skills.filter((lang) => lang !== skill),
      }));
    } else {
      setCandidateData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, skill],
      }));
    }
  };
  
  
  const handleExperienceChange = (index, field, value) => {
    setCandidateData((prevData) => {
      const updatedExperience = [...prevData.experience];
      updatedExperience[index][field] = value;
      return { ...prevData, experience: updatedExperience };
    });
  };

  
  const handleInternExperienceChange = (index, field, value) => {
    setCandidateData((prevData) => {
      const updatedInternExperience = [...prevData.internExp];
      updatedExperience[index][field] = value;
      return { ...prevData, internExp: updatedExperience };
    });
  };

  const handleEducationChange = (index, field, value) => {
    setCandidateData((prevData) => {
      const updatedEducation = [...prevData.education];
      updatedEducation[index][field] = value;
      return { ...prevData, education: updatedEducation };
    });
  };

  const handleCertificationChange = (index, field, value) => {
    setCandidateData((prevData) => {
      const updatedCertifications = [...prevData.certifications];
      updatedCertifications[index][field] = value;
      return { ...prevData, certifications: updatedCertifications };
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {



      console.log("candidateData.resumeFile-----",resumeFile)

      //console.log("after .resumeFile-----",candidateData.resumeFile)

      const formData = new FormData();
      var  headersValue = "application/json";
    formData.append("candidateData", JSON.stringify(candidateData));
    if (resumeFile) {
      //headersValue = "multipart/form-data";
      //headersValue = "multipart/form-data; boundary=" + formData._boundary;

      console.log("updating formData -----");

      formData.append("resumeFile", resumeFile);
    }

    console.log("formData -----",formData);

     // Iterate and print formData keys and values
     for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

 
      const response = await fetch(`http://localhost:8080/candidate/${uId}`, {
        method: "PUT", // Use PUT for editing existing data
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      afterSave();

      // Handle success, display a message, or navigate somewhere
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  
  };

  const catOptions = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];

  const generateProfileSummary = () => {
    // Create the dynamic profile summary based on candidateData
    const profileSummary = `
      Personal Details:
      Full Name: ${candidateData.firstName} ${candidateData.lastName}
      Age: ${candidateData.age}
      Phone: ${candidateData.phone}
      Email: ${candidateData.email}
      Gender: ${candidateData.gender}
      Current City: ${candidateData.currentCity}
      Spoken Languages: ${candidateData.languages.join(', ')}

      Education Details:
      ${candidateData.education.map(edu => (
        `Degree: ${edu.degree}, Stream: ${edu.stream}, Institution: ${edu.institution}, Start: ${edu.startYear}, End: ${edu.endYear}`
      )).join('\n')}

      Preferences:
      Job or Internship: ${candidateData.jobOrInternship}
      Type of Work: ${candidateData.typeOfWork}
      Preferred City: ${candidateData.preferredCity}
      Work Mode Preferences: ${candidateData.workModePreferences.join(', ')}

      Experience:
      ${candidateData.experience.map(exp => (
        `Title: ${exp.title}, Company: ${exp.company}, Start: ${exp.startYear}, End: ${exp.endYear}, Description: ${exp.description}`
      )).join('\n')}

      Skills: ${candidateData.skills.join(', ')}
    `;

    return profileSummary;
  };


  
  
  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        console.log("uId-----:", uId);

        const response = await fetch(`/api/apicall?endpoint=candidate?id=${uId}`); // Replace with your API endpoint
        const data = await response.json();
        setCandidateData(data[0]);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };
    fetchCandidateData();
  }, []);
  return (
    <form onSubmit={handleSubmit} className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-category col-lg-12" style={{ marginBottom: '20px' }}>
          <h2>Personal Details</h2>
          </div>
        
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder=""
            required
            value={`${candidateData.firstName} ${candidateData.lastName}`}
            onChange={handleInputChange}
             
          />
                 </div>

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Job Title</label>
          <input type="text" name="name" placeholder="UI Designer" required />
        </div> */}


        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Age</label>

          <input
            type="text"
            name="age"
            value={candidateData.age}
            onChange={handleInputChange}
       
            placeholder=""
            />
          </div>


        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            required       
               value={candidateData.phone}
            onChange={handleInputChange}
           
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input
            type="text"
            name="email"
           
            value={candidateData.email}
            onChange={handleInputChange}
            required
          />
        </div>



        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <select
            name="gender"
            value={candidateData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Current City</label>

          <input
            type="text"
            name="currentCity"
            value={candidateData.currentCity}
            onChange={handleInputChange}
       
            placeholder=""
            />
          </div>


        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="name"
            placeholder="www.jerome.com"
            required
          />
        </div>
 */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
          <label>Current Salary($)</label>
          <select className="chosen-single form-select" required>
            <option>40-70 K</option>
            <option>50-80 K</option>
            <option>60-90 K</option>
            <option>70-100 K</option>
            <option>100-150 K</option>
          </select>
        </div>
 */}
        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-3 col-md-12">
          <label>Expected Salary($)</label>
          <select className="chosen-single form-select" required>
            <option>120-350 K</option>
            <option>40-70 K</option>
            <option>50-80 K</option>
            <option>60-90 K</option>
            <option>70-100 K</option>
            <option>100-150 K</option>
          </select>
        </div> */}

        {/* <!-- Input --> */}
    
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Spoken Languages</label>
          <input
            type="text"
            name="languages"
            value={candidateData.languages}
            onChange={handleInputChange}
       
            placeholder=""
            />
    

        <div className="spoken-languages-labels">
            {spokenLanguages.map((language) => (
              <span
                key={language}
                className={`tag-label ${
                  candidateData.languages.includes(language) ? "selected" : ""
                }`}
                onClick={() => handleLanguageClick(language)}
              >
                {language}
              </span>
            ))}
          </div>
        </div>

   
        <div className="form-category col-lg-12" style={{ marginBottom: '20px' }}>
  <h2>Education Details</h2>
</div>

<div className="form-group col-lg-12 col-md-12">
  <label>Highest Qualitcation/Degree/Diploma</label>
  {candidateData.education.map((edu, index) => (
    <div key={index} className="education-entry">
      <div className="education-row">
        <div className="education-column">
          <input
            type="text"
            name={`education[${index}].degree`}
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) =>
              handleEducationChange(index, "degree", e.target.value)
            }
          />
          <input
            type="text"
            name={`education[${index}].startYear`}
            placeholder="Start Year"
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
            value={edu.stream}
            onChange={(e) =>
              handleEducationChange(index, "stream", e.target.value)
            }
          />
          <input
            type="text"
            name={`education[${index}].endYear`}
            placeholder="End Year"
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
        value={edu.institution}
        onChange={(e) =>
          handleEducationChange(index, "institution", e.target.value)
        }
      />
    </div>
  ))}
  <button
    type="button"
    onClick={() =>
      setCandidateData((prevData) => ({
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
  </button>
</div>

        <div className="form-category col-lg-12" style={{ marginBottom: '20px' }}>
          <h2>Preferences</h2>
          </div>
 
<div className="form-group col-lg-6 col-md-12">
  <label>Type of work</label>
  <select
    name="jobOrInternship"
    value={candidateData.jobOrInternship}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Job or Internship</option>
    <option value="Job">Job</option>
    <option value="Internship">Internship</option>
  </select>
</div>

<div className="form-group col-lg-6 col-md-12">
  <label>Availability</label>
  <select
    name="typeOfWork"
    value={candidateData.typeOfWork}
    onChange={handleInputChange}
    required
  >
    <option value="">Select availability</option>
    <option value="Full-Time">Full-Time</option>
    <option value="Part-Time">Part-Time</option>
   </select>
</div>

<div className="form-group col-lg-6 col-md-12">
          <label>Preferred City</label>

          <input
            type="text"
            name="preferredCity"
            value={candidateData.preferredCity}
            onChange={handleInputChange}
       
            placeholder=""
            />
          </div>


<div className="form-group col-lg-6 col-md-12">
  <label>Work Mode Preferences</label>
  <Select
    isMulti
    name="workModePreferences"
    options={[
      { value: "In Office", label: "In Office" },
      { value: "Work from Home", label: "Work from Home" },
      { value: "Hybrid", label: "Hybrid" },
    ]}
    value={candidateData.workModePreferences.map((mode) => ({
      value: mode,
      label: mode,
    }))}
    onChange={(selectedOptions) => {
      const selectedValues = selectedOptions.map((option) => option.value);
      setCandidateData((prevData) => ({
        ...prevData,
        workModePreferences: selectedValues,
      }));
    }}
  />
</div>
{/* 
        <div className="form-group col-lg-6 col-md-12">
          <label>Areas of Interest</label>
          <Select
            isMulti
            name="areasOfInterest"
            options={catOptions}
            value={catOptions.filter(option => candidateData.areasOfInterest.includes(option.value))}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map(option => option.value);
              setCandidateData((prevData) => ({ ...prevData, areasOfInterest: selectedValues }));
            }}
          />
        </div> */}

        <div className="form-category col-lg-12" style={{ marginBottom: '20px' }}>
          <h2>Experience</h2>
          </div>

       
          <div className="form-group col-lg-12 col-md-12">
   {candidateData.experience.map((exp, index) => (
    <div key={index} className="experience-entry">
      <div className="education-row">
        <div className="education-column">
          <input
            type="text"
            name={`experience[${index}].title`}
            placeholder="Job Title"
            value={exp.title}
            onChange={(e) =>
              handleExperienceChange(index, "title", e.target.value)
            }
          />
          <input
            type="text"
            name={`experience[${index}].startYear`}
            placeholder="Start Year"
            value={exp.startYear}
            onChange={(e) =>
              handleExperienceChange(index, "startYear", e.target.value)
            }
          />
        </div>
        <div className="education-column">
          <input
            type="text"
            name={`experience[${index}].company`}
            placeholder="Company"
            value={exp.company}
            onChange={(e) =>
              handleExperienceChange(index, "company", e.target.value)
            }
          />
          <input
            type="text"
            name={`experience[${index}].endYear`}
            placeholder="End Year"
            value={exp.endYear}
            onChange={(e) =>
              handleExperienceChange(index, "endYear", e.target.value)
            }
          />
        </div>
      </div>
      <textarea
        name={`experience[${index}].description`}
        placeholder="Description"
        value={exp.description}
        onChange={(e) =>
          handleExperienceChange(index, "description", e.target.value)
        }
      />
    </div>
  ))}
  <button
    type="button"
    onClick={() =>
      setCandidateData((prevData) => ({
        ...prevData,
        experience: [
          ...prevData.experience,
          {
            title: "",
            company: "",
            startYear: "",
            endYear: "",
            description: "",
          },
        ],
      }))
    }
  >
    Add work or internship experience 
  </button>
</div>



{/*        
<div className="form-group col-lg-12 col-md-12">
            {candidateData.internExp.map((intern, index) => (
             <div key={index} className="experience-entry">
               <div className="education-row">
                 <div className="education-column">
                   <input
                     type="text"
                     name={`internExp[${index}].title`}
                     placeholder="Job Title"
                     value={intern.title}
                     onChange={(e) =>
                       handleInternExperienceChange(index, "title", e.target.value)
                     }
                   />
                   <input
                     type="text"
                     name={`internExp[${index}].startYear`}
                     placeholder="Start Year"
                     value={intern.startYear}
                     onChange={(e) =>
                       handleInternExperienceChange(index, "startYear", e.target.value)
                     }
                   />
                 </div>
                 <div className="education-column">
                   <input
                     type="text"
                     name={`internExp[${index}].company`}
                     placeholder="Company"
                     value={intern.company}
                     onChange={(e) =>
                       handleInternExperienceChange(index, "company", e.target.value)
                     }
                   />
                   <input
                     type="text"
                     name={`internExp[${index}].endYear`}
                     placeholder="End Year"
                     value={intern.endYear}
                     onChange={(e) =>
                       handleInternExperienceChange(index, "endYear", e.target.value)
                     }
                   />
                 </div>
               </div>
               <textarea
                 name={`internExp[${index}].description`}
                 placeholder="Description"
                 value={intern.description}
                 onChange={(e) =>
                   handleInternExperienceChange(index, "description", e.target.value)
                 }
               />
             </div>
           ))}
           <button
             type="button"
             onClick={() =>
               setCandidateData((prevData) => ({
                 ...prevData,
                 experience: [
                   ...prevData.experience,
                   {
                     title: "",
                     company: "",
                     startYear: "",
                     endYear: "",
                     description: "",
                   },
                 ],
               }))
             }
           >
             Add Internship experience 
           </button>
         </div>
          */}
   
   

   <div className="form-group col-lg-12 col-md-12">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            value={candidateData.skills}
            onChange={handleInputChange}
       
            placeholder=""
            />
    

        <div className="spoken-languages-labels">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className={`tag-label ${
                  candidateData.skills.includes(skill) ? "selected" : ""
                }`}
                onClick={() => handleSkillsChange(skill)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

   

        {/* <!-- Search Select --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Categories </label>
          <Select
            defaultValue={[catOptions[1]]}
            isMulti
            name="colors"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            required
          />
        </div> */}

        {/* <!-- Input --> */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Allow In Search & Listing</label>
          <select className="chosen-single form-select" required>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div> */}

<div className="form-category col-lg-12" style={{ marginBottom: '20px' }}>
          <h2>Profile summary</h2>
          </div>  

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
           <textarea   name="profileSummary"
          value=""
         ></textarea>

         
        </div>


        <CvUploader resumeFile={resumeFile} handleResumeChange={handleResumeChange} />


        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
