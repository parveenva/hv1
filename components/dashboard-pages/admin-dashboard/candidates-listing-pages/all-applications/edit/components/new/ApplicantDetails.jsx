import { useState, useEffect } from 'react';
import styles from './ApplicantDetails.module.css';

const ApplicantDetails = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({});
    const [editFlag, setEditFlag] = useState(false);
    const [formErrors, setFormErrors] = useState({});


    const [isCssLoaded, setIsCssLoaded] = useState(false);
    
    useEffect(() => {
        if (styles?.container) {
            console.log("css loaded is true now",styles)
            setIsCssLoaded(true);
        }
      }, [styles?.button]);

    // Fetch application data from API
    const fetchApplicationData = async () => {
        try {
            const currentPath = window.location.pathname;
            const parts1 = currentPath.split('/');
            const id = parts1[parts1.length - 1];

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate/byId/${id}`);
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error("Error fetching job data:", error);
        }
    };

    // Call fetchApplicationData when component mounts
    useEffect(() => {
        fetchApplicationData();
    }, []);

    const switchTab = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    const handleEditModeToggle = () => {
        setEditFlag(!editFlag);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        let hasErrors = false;

        // You can define mandatory fields here
        const mandatoryFields = ["name", "email", "phone", "status"];
        mandatoryFields.forEach((field) => {
            if (!formData[field]) {
                errors[field] = "This field is mandatory";
                hasErrors = true;
            }
        });

        if (hasErrors) {
            setFormErrors(errors);
            const errorElement = document.querySelector(".error-message");
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return;
        }

        try {
            const currentPath = window.location.pathname;
            const parts1 = currentPath.split('/');
            const id = parts1[parts1.length - 1];

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

            const data = await response.json();
            console.log("Job submission successful:", data);

            handleEditModeToggle();
            fetchApplicationData(); // Refresh the form data after submission

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Check if formData is available and render accordingly
    if (!formData || Object.keys(formData).length === 0 || !isCssLoaded) {
        return <div>Loading...</div>;
    } else{

    
    
    return (
        <div className={styles.container}>
    <div className={styles.header}>
        <h2>Applicant Details</h2>
        <div className={styles.actions}>
            <button className={`${styles.schedule} ${styles.button}`} onClick={handleEditModeToggle}>
                {editFlag ? 'Cancel Edit' : 'Edit'}
            </button>
            <button
                className={`${styles.schedule} ${styles.button}`}
                disabled={editFlag}
            >
                Schedule Interview
            </button>
            <button
                className={`${styles.shortlist} ${styles.button}`}
                disabled={editFlag}
            >
                Shortlist
            </button>
            <button
                className={`${styles.reject} ${styles.button}`}
                disabled={editFlag}
            >
                Reject
            </button>
        </div>
    </div>

    <div className={styles.tabs}>
        <div
            className={`${styles.tab} ${activeTab === 0 ? styles.active : ''}`}
            onClick={() => switchTab(0)}
        >
            Primary Info
        </div>
        <div
            className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`}
            onClick={() => switchTab(1)}
        >
            Resume
        </div>
    </div>

    {/* Primary Info Section */}
    <div className={`${styles.tabContent} ${activeTab === 0 ? styles.active : ''}`}>
        <div className={styles.infoContainer}>
            {/* 2-column layout */}
            <div className={styles.infoColumn}>
                <div className={styles.info}>
                    <strong>Name: </strong>
                    {editFlag ? (
                        <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    ) : (
                        formData.name
                    )}
                </div>
                <div className={styles.info}>
                    <strong>Mobile: </strong>
                    {editFlag ? (
                        <input
                            type="text"
                            value={formData.phone || ''}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    ) : (
                        formData.phone
                    )}
                </div>
                <div className={styles.info}>
                    <strong>Email: </strong>
                    {editFlag ? (
                        <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    ) : (
                        formData.email
                    )}
                </div>
                
                <div className={styles.info}>
        <strong>City: </strong>
        {editFlag ? (
            <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
        ) : (
            formData.city
        )}
    </div>

    <div className={styles.info}>
        <strong>Current Employer: </strong>
        {editFlag ? (
            <input
                type="text"
                value={formData.currentEmployer || ''}
                onChange={(e) => setFormData({ ...formData, currentEmployer: e.target.value })}
            />
        ) : (
            formData.currentEmployer
        )}
    </div>

    <div className={styles.info}>
        <strong>Experience: </strong>
       {editFlag ? (
            <input
                type="number"
                value={formData.experience || ''}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
        ) : (
            formData.experience
        )} 
    </div>
   
   
    <div className={styles.info}>
                    <strong>Expected Salary: </strong>
                    {editFlag ? (
                        <input
                            type="number"
                            value={formData.expectedSalary || ''}
                            onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                        />
                    ) : (
                        formData.expectedSalary
                    )}
                </div>
                <div className={styles.info}>
                    <strong>Current Salary: </strong>
                    {editFlag ? (
                        <input
                            type="number"
                            value={formData.currentSalary || ''}
                            onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                        />
                    ) : (
                        formData.currentSalary
                    )}
                </div>
  
            </div>

            {/* Second Column */}
            <div className={styles.infoColumn}>

            <div className={styles.info}>
                    <strong>Application Status: </strong>
                    {editFlag ? (
                        <select
                            value={formData.status || ''}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Under Review">Under Review</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    ) : (
                        formData.status
                    )}
                </div>



            <div className={styles.info}>
        <strong>Interview Slot: </strong>
        {editFlag ? (
            <input
                type="text"
                value={formData.interviewSlot || ''}
                onChange={(e) => setFormData({ ...formData, interviewSlot: e.target.value })}
            />
        ) : (
            formData.interviewSlot
        )}
    </div>

    <div className={styles.info}>
        <strong>Recruiter: </strong>
        {editFlag ? (
            <input
                type="text"
                value={formData.recruiter || ''}
                onChange={(e) => setFormData({ ...formData, recruiter: e.target.value })}
            />
        ) : (
            formData.recruiter
        )}
    </div>
   
    
                <div className={styles.info}>
                    <strong>Notice Period: </strong>
                    {editFlag ? (
                        <input
                            type="text"
                            value={formData.noticePeriod || ''}
                            onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                        />
                    ) : (
                        formData.noticePeriod
                    )}
                </div>
                {/* <div className={styles.info}>
                    <strong>Availability: </strong>
                    {editFlag ? (
                        <input
                            type="text"
                            value={formData.availability || ''}
                            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        />
                    ) : (
                        formData.availability
                    )}
                </div> */}


                <div className={styles.infoColumn}>
    {/* <div className={styles.info}>
        <strong>Preferred Location: </strong>
        {editFlag ? (
            <input
                type="text"
                value={formData.preferredLocation || ''}
                onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
            />
        ) : (
            formData.preferredLocation
        )}
    </div> */}
    <div className={styles.info}>
        <strong>Source: </strong>
        {editFlag ? (
            <input
                type="text"
                value={formData.source || ''}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            />
        ) : (
            formData.source
        )}
    </div>
   
</div>

<div className={styles.infoColumn}>
    <div className={styles.info}>
        <strong>Education: </strong>
        {/* {editFlag ? (
            <input
                type="text"
                value={formData.education || ''}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            />
        ) : (
            formData.education
        )} */}
    </div>
    <div className={styles.info}>
        <strong>Languages Known: </strong>
        {editFlag ? (
            <input
                type="text"
                value={formData.languagesKnown || ''}
                onChange={(e) => setFormData({ ...formData, languagesKnown: e.target.value })}
            />
        ) : (
            formData.languagesKnown
        )}
    </div>
</div>

            </div>
        </div>
        <div className="error-message">{formErrors.name || formErrors.email || formErrors.phone || formErrors.status}</div>
        <div >
            {editFlag && (
                <button className={`${styles.schedule} ${styles.button}`} onClick={handleSubmit}>
                    Save Changes
                </button>
            )}
        </div>
    </div>
</div>

    );

}
};

export default ApplicantDetails;
