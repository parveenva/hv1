import FormInfoBox from "./FormInfoBox";
import ViewCandidateInfo   from "./ViewCandidateInfo";
import dynamic from "next/dynamic";
import React, { useState } from "react";




// import LogoUpload from "./LogoUpload";

const index = () => {
  const [editMode, setEditMode] = useState(true);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAfterSave = () => {
    setEditMode(false);
    setShowConfirmation(true);
    // You can optionally reset the confirmation message after a few seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 10000); // Hide the message after 3 seconds
  };

  return (
    <div className="widget-content">
      {/* End logo and cover photo components */}
      <div className="button-container"  style={{ textAlign: "center", marginRight: "10px" }}>

      {!editMode && (
             <button className="theme-btn btn-style-one"
              onClick={() => setEditMode(true)}
           >
             Edit
           </button>
        )}
{/* 
      <button onClick={() => setEditMode(!editMode)}  className="theme-btn btn-style-one"> 
        {editMode ? "Cancel Edit" : "Edit"}
      </button> */}
      </div>

      {showConfirmation && (
        <div style={{ color: "green" }}>Changes saved successfully.</div>
      )}


      {editMode ? (
        <FormInfoBox afterSave={handleAfterSave} />
      ) : (
        <ViewCandidateInfo />
      )}
       

      {/* compnay info box */}
    </div>
  );
};

export default index;
