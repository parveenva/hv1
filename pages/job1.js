import { useState, useEffect } from "react";
import RestaurantHeader from "../components/header/RestaurantHeader";
import styles from "./JobDetails.module.css";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", resume: null });

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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formPayload.append(key, value);
    });
    formPayload.append("jobId", "67a0e78cf8a30e1d1955a19b");

    try {
      const response = await fetch("http://localhost:8080/application/applyForJob", {
        method: "POST",
        body: formPayload,
      });
      if (!response.ok) throw new Error("Application submission failed");
      setApplied(true);
      setMessage("Application Submitted Successfully. Check your Email for next Steps.");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (!jobDetails) return <div className={styles.loading}>Loading job details...</div>;

  return (
    <>
      <RestaurantHeader />
      <section className={styles.jobDetails}>
        <h1 className={styles.jobTitle}>{jobDetails.jobTitle}</h1>
        <p className={styles.companyName}>{jobDetails.companyName}</p>
        <p className={styles.jobLocation}>{jobDetails.location}</p>
        <p className={styles.salary}>Salary: {jobDetails.salary}</p>
        <p className={styles.about}>{jobDetails.about}</p>
        <p className={styles.jobSummary}>{jobDetails.jobSummary}</p>

        {[
          { title: "Key Responsibilities", data: jobDetails.keyResponsibilities },
          { title: "Requirements", data: jobDetails.requirements },
          { title: "Preferred Qualifications", data: jobDetails.preferredQualifications },
          { title: "Benefits", data: jobDetails.benefits },
        ].map((section, index) => (
          <div key={index}>
            <h3 className={styles.sectionTitle}>{section.title}:</h3>
            <ul className={styles.list}>
              {section.data.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <p className={styles.applicationDetails}>{jobDetails.applicationDetails}</p>
        <button className={styles.applyButton} onClick={() => setIsModalOpen(true)}>Apply</button>
      </section>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Apply for {jobDetails.jobTitle}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              {[
                { type: "text", name: "name", placeholder: "Your Name" },
                { type: "email", name: "email", placeholder: "Your Email" },
                { type: "text", name: "phone", placeholder: "Your Phone" },
              ].map(({ type, name, placeholder }) => (
                <input
                  key={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              ))}
              <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx,.txt" className={styles.input} />
              <button type="submit" className={styles.submitButton}>Submit Application</button>
            </form>
            {applied && <p className={styles.message}>{message}</p>}
            <button onClick={() => setIsModalOpen(false)} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetails;
