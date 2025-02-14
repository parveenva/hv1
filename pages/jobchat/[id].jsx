"use client"; // Ensures this runs only on the client side

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import logo from "../../images/logo_r1.webp"; // Import logo

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState(""); // 

  const messagesDivRef = useRef(null);

  const [user_id, setId] = useState(null);
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParts = window.location.pathname.split("/");

      const lastPart = urlParts.pop();

      const timestamp = Date.now();

      if (lastPart === "jobchat") {
        setId(`${btoa("679f35f60c8d34dbac027b71_")}${timestamp}`); // Default value for "jobchat" with timestamp
      } else {
          setId(`${lastPart}_${timestamp}`); // Append timestamp to lastPart
      }
      
    }
  }, []);

 
  useEffect(() => {
    // Fetch job details from local file (assuming API or data source)
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

  useEffect(() => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }
  }, [messages,isTyping])

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setTypingDots((prev) => (prev === "..." ? "" : prev + "."));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isTyping]);


    const sendMessage = async (option = null) => {
      let msg = option || userInput.trim();
      if (!msg) return; // Don't send empty messages


    // let  = sessionStorage.getItem("user_id");
    // if (!user_id) {
    //     user_id = "user_" + Date.now(); // Generate a new ID
    //     sessionStorage.setItem("user_id", user_id); // Store in session
    // }

    // Append user's message
    setMessages((prev) => [...prev, { text: msg, sender: "user" }]);
    

    // Store message and clear input field
    const message = msg;
    setUserInput("");

    setIsTyping(true);


    try {
      // Send request to backend
      const response = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, message }) // Use retrieved or new user_id
    });

      const contentType = response.headers.get("Content-Type");
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

        setIsTyping(false);

      if (data.options && Array.isArray(data.options)) {
        setMessages((prev) => [
          ...prev,
          { text: data.message, sender: "bot", options: data.options },
        ]);
      } else {
        setMessages((prev) => [...prev, { text: data.message || data, sender: "bot" }]);
      }

      // Auto-scroll to the bottom of messages
      if (messagesDivRef.current) {
        messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Server error. Try again later.", sender: "bot" }]);
    }
  };

  if (!jobDetails) return <div>Loading job details...</div>;

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 my-6">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}

        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4"> {/* Adjusted column width distribution and reduced gap */}

          


          {/* Left Side - Job Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full"> {/* Ensured full width usage */}
          {/* <div className="flex flex-col items-center space-y-4 mb-8">
              <Image src={logo} alt="Gourmet Jobs Logo" width={100} height={100} className="rounded-full" />
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900">TheGoodPizza</h1>
                <p className="text-sm text-gray-600 italic">"Savor the Flavor, One Slice at a Time"</p>
              </div>
            </div> */}

            <h1 className="text-3xl font-bold text-gray-800">{jobDetails.jobTitle}</h1>
            <p className="text-lg text-gray-600 mt-2">Location: {jobDetails.location}</p>
            <p className="text-lg text-gray-600 mt-2">Industry: {jobDetails.industry}</p>
            <p className="text-lg text-gray-600 mt-2">Employment Type: {jobDetails.employmentType}</p>
            <p className="text-lg text-gray-600 mt-2">Salary: {jobDetails.salary}</p>
            <p className="text-lg text-gray-600 mt-2">Company: {jobDetails.companyName}</p>


            
            {/* <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800">About {jobDetails.companyName}</h2>
              <p className="text-lg text-gray-600 mt-2">
              {jobDetails.about}
              </p>
            </div> */}

            
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

          {/* Right Side - Chat Box */}
          <div className="w-full bg-white shadow-lg rounded-lg p-4">
          {/* Header with Avatar and Name */}
  <div className="bg-gray-700 text-gray-200 p-3 rounded-t-lg text-center shadow-md flex items-center gap-2">
    <img
      src="/avatar/alice.webp" // Replace with your agent's avatar image
      alt="Alice Avatar"
      className="w-7 h-6 rounded-full"
    />
    <h5 className="text-lg font-bold tracking-wide">Alice</h5>
  </div>

  {/* Chat Messages */}
  <div
    ref={messagesDivRef}
    className="h-60 overflow-y-auto p-3 border rounded-b-lg bg-gray-100 text-gray-800 flex flex-col gap-2"
  >
    {messages.map((msg, index) => (
      <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-center`}>
        {msg.sender !== "user" && (
          <img
            src="/avatar/alice.webp" // Replace with your agent's avatar image
            alt="Alice Avatar"
            className="w-6 h-6 rounded-full mr-2"
          />
        )}
        <div
          className={`p-2 rounded-lg inline-block max-w-[75%] ${
            msg.sender === "user"
              ? "bg-gray-300 text-black ml-auto text-right shadow-md"
              : "bg-white text-black border border-gray-300 mr-auto shadow-sm"
          }`}
        >
          {msg.text}

          {msg.options && (
          <div className="mt-2 space-y-2">
            {msg.options.map((option, i) => (
             
             <button
  key={i}
  onClick={() => sendMessage(option)} // Send selected option
  style={{
    display: "block",
    width: "100%",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "white",
    border: "1px solid gray",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = "#1f2937"; // Dark Gray (Same as Tailwind 'gray-800')
    e.target.style.color = "white"; // Light Blue (Same as Tailwind 'blue-300')
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = "white";
    e.target.style.color = "black";
  }}
>
  {option}
</button>

             
             ))}
          </div>
        )}
        </div>
      </div>
    ))}

{isTyping && (
              <div className="flex items-center">
                <img src="/avatar/alice.webp" alt="Alice Avatar" className="w-6 h-6 rounded-full mr-2" />
                <div 
                
                className="p-2 rounded-lg inline-block max-w-[75%] bg-white text-black border border-gray-300 mr-auto shadow-sm"
              
               >typing {typingDots}</div>
              </div>
            )}
  </div>

  {/* Input Field */}
  <div className="flex mt-3 items-center">
    <input
      type="text"
      className="flex-grow p-3 border border-gray-400 rounded-lg text-lg text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
      placeholder="Type a message..."
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      }}
    />
  </div>
</div>
  </div>
      </div>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
    </>
  );
};

export default JobDetails;
