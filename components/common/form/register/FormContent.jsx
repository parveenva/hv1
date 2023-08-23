import { useState } from "react";
import { useAuth } from "../../../../app/authContext";
import { useRouter } from "next/router";


const FormContent = ({ role }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const [fullNameError, setFullNameError] = useState("");


  const { setIsLoggedIn,setUserRole } = useAuth();
  const router = useRouter();
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const endpoint = "user/register"; // Replace with the specific API's endpoint

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

// Validate Full Name
if (!formData.name.trim()) {
  setFullNameError("Full Name is required");
  return;
}

const nameParts = formData.name.trim().split(" ");
if (nameParts.length < 2) {
  setFullNameError("Please enter your First Name and Last Name");
  return;
}

    try {
      // Add the role to the form data
      const dataWithRole = { ...formData, role };

      // Make API request to handle form submission
      const response = await fetch(`/api/apicall?endpoint=${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithRole),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Handle the API response if needed
      console.log("Form submitted successfully:", data);

      const userId =  data.userId;
//start candidate


if (userId) {
  // Prepare candidate data
  const candidateData = {
    // Fill in the candidate data fields accordingly
  firstName: nameParts[0],
   lastName:  nameParts.slice(1).join(' '),
    email: formData.email,
    //phone: '123-456-7890',
    // ... other candidate data ...
    // Use the extracted userId
    user: userId,
  };

  // Make the API call to create a new candidate
  const createCandidateResponse = await fetch(`/api/apicall?endpoint=candidate`, {

     method: 'POST',
    body: JSON.stringify(candidateData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!createCandidateResponse.ok) {
    throw new Error('Error creating candidate');
  }

  // Candidate created successfully
  const { message } = await createCandidateResponse.json();
  console.log(message); // Log the success message
}

// candidate end


// login start


 

    try {
       const response = await fetch(`/api/apicall?endpoint=user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if(data.error){
        throw new Error("Invalid Credentials");
      }
      // Handle the API response if needed
      console.log("Login successful:", data);

      // Decode the JWT token to get the user's role
      //const decodedToken = jwtDecode(data.token);

      const decodedToken = JSON.parse(atob(data.token.split(".")[1]));


      // Get the role from the decoded token
      const userRole = decodedToken.role;

      setIsLoggedIn(true); // Set isLoggedIn to true on successful login

      
      setUserRole(userRole); 
      //setIsPopupOpen(false); // Close the popup after successful login

// Redirect based on user's role
if (userRole === "candidate") {
  router.push("/candidates-dashboard/my-profile"); // Redirect to the candidate dashboard
} else if (userRole === "employer") {
  router.push("/employers-dashboard/manage-jobs"); // Redirect to the employer dashboard
} else {
  // Handle other roles or default case
  // For example, if there are other roles, you can redirect them to their respective dashboards
  // Otherwise, you can redirect to a default dashboard or homepage
 // router.push("/-dashboard/dashboard"); // Redirect to the default dashboard
}
} catch (error) {
  console.error("Error sending to Login:", error);
}


//login end

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
                {fullNameError && <p className="error-message">{fullNameError}</p>}

      </div>


      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      {/* name */}

      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      {/* password */}

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit">
          Register
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent;
