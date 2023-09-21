import { useState } from "react";
import { useAuth } from "../../../../app/authContext";
import { useRouter } from "next/router";


const FormContent = ({ role }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone :"",
    name :"",
    fromRegister:true,
  });


  const [nameError, setnameError] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  const { logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();
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
  setnameError("Full Name is required");
  return;
}

const nameParts = formData.name.trim().split(" ");
if (nameParts.length < 2) {
  setnameError("Please enter your First Name and Last Name");
  return;
}

    try {
      // Add the role to the form data
      const dataWithRole = { ...formData, role };

      // Make API request to handle form submission
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithRole),
      });

      if (!response.ok) {
        const responseBody = await response.json();


        console.log("response.status--",response.status);
        console.log("error.response.data.responseBody.error --",responseBody.error );

        if (response.status === 409 && responseBody.error==='email' ) {
          setErrorMessage("User with this email already exists. Please go to the login screen and log in with your email and password or create a new user with a different email.");
       return;
        } else if (response.status === 409 && responseBody.error==='phone') {
          setErrorMessage("User with this phone numer already exists. Please go to the login screen and log in with your email and password or create a new user with a different phone.");
       return;
        } else  {
          throw new Error("Network response was not ok");
        }
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
   name: formData.name,
    email: formData.email,
    phone: formData.phone,
    // ... other candidate data ...
    // Use the extracted userId
    user: userId,
    fromRegister :true,
  };

  // Make the API call to create a new candidate
  const createCandidateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}candidate`, {

     method: 'POST',
    body: JSON.stringify(candidateData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!createCandidateResponse.ok) {
   // throw new Error('Error creating candidate');
  }

  // Candidate created successfully
  const { message } = await createCandidateResponse.json();
  console.log(message); // Log the success message
}

// candidate end


// login start


 

    try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/login`, {
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

      setIsLoggedIn(true); // Set getIsLoggedIn() to true on successful login

      
      setUserRole(userRole); 
      //setIsPopupOpen(false); // Close the popup after successful login


      setUserId(decodedToken.userId); 

       
      const backdrop = document.querySelector(".modal-backdrop");
         if (backdrop) {
           backdrop.remove();
         }
         document.body.classList.remove("modal-open"); // Restore body scroll
         document.body.style.overflow = "auto";

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
                {nameError && <p className="error-message">{nameError}</p>}

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
          required
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      {/* password */}


      <div className="form-group">
        <label>Phone number</label>
        <input
          type="text"
          name="phone"
          required
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        
        {errorMessage && (
                  <div>

        <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
      )}
<button className="theme-btn btn-style-one" type="submit">
          Register
        </button>

      </div>
      {/* login */}
    </form>
  );
};

export default FormContent;
