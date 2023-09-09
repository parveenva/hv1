import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [submitted, setSubmitted] = useState(false); // Track form submission


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make API call to create a lead using fetch
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}lead` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Lead created:", responseData);


        // Close the modal or show a success message
        // (You can implement this based on your UI/UX)
      } else {
        console.error("Error creating lead");
        // Handle error (e.g., show an error message to the user)
      }
        setSubmitted(true);

 // Reset form fields after successful submission
 setFormData({
   name: "",
   email: "",
   phone: "",
 });


    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="modal fade" id="contactUsModal" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Request a Callback!</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            
          {submitted ? (
              // Show thank-you message if form is submitted
              <div>
                <p>Thank you for your submission!</p>
                {/* You can customize this message */}
              </div>
            ) : (
            
            
            <div id="contact-us-form">
              <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleChange} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={handleChange} 

                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    onChange={handleChange} 

                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
                        )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
