import { useState } from "react";
import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import { useAuth } from "../../../../app/authContext";
import { useRouter } from "next/router";


const FormContent = ({ isPopupOpen, setIsPopupOpen, closeButtonRef }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // State to store login errors



  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const endpoint = "user/login"; // Replace with the specific API's endpoint

  const { setToken,getToken,logout , setIsLoggedIn,setUserRole,setUserId,getIsLoggedIn,getUserRole,getUserId} = useAuth();
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request to handle form submission
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
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

      setUserId(decodedToken.userId); 

      setToken(data.token);
      //setIsPopupOpen(false); // Close the popup after successful login

// Redirect based on user's role
if (userRole === "candidate") {
  router.push("/candidates-dashboard/my-profile"); // Redirect to the candidate dashboard
} else if (userRole === "employer") {
  router.push("/admin-dash/all-applications"); // Redirect to the employer dashboard
} else if (userRole === "admin") {
  router.push("/admin-dash/all-applications"); // Redirect to the employer dashboard
} else {
  // Handle other roles or default case
  // For example, if there are other roles, you can redirect them to their respective dashboards
  // Otherwise, you can redirect to a default dashboard or homepage
 // router.push("/-dashboard/dashboard"); // Redirect to the default dashboard
}

 closeButtonRef.current.click();

 closeButtonRef.current.classList.remove("show");

 closeButtonRef.current.style.display = "none"; // Hide the modal


 const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
    document.body.classList.remove("modal-open"); // Restore body scroll
    document.body.style.overflow = "auto";

    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Incorrect email or password. Please try again."); // Set error message for incorrect credentials
    }
  };

  return (
    <div className="form-inner">
      <h3>Login</h3>

      {/* <!--Login Form--> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        {/* name */}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        {/* password */}

        {error && <p className="error-message">{error}</p>} {/* Display error message if there is an error */}

        {/* <div className="form-group"> */}
          {/* <div className="field-outer"> */}
            {/* <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div> */}
            {/* <a href="#" className="pwd">
              Forgot password?
            </a> */}
          {/* </div>
        </div> */}
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one" 
            type="submit"
            name="log-in"
          >
            Log In
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>

      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
