import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const BottomNavigation = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const tabStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    padding: "5px",
  };

  const selectedStyle = {
    color: "#007bff", // Change to your desired selected color
  };

  const notSelectedStyle = {
    color: "black", // Change to your desired not selected color
  };

  const isSelected = (path) => {
    return currentPath === path;
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="fixed-bottom-section">
      <div style={tabStyle} onClick={() => handleNavigation("/jobs")}>
        <span
          className={`flaticon-briefcase`}
          style={{
            ...(isSelected("/jobs") ? selectedStyle : notSelectedStyle),
          }}
        ></span>
        <span
          style={{
            ...{ fontSize: "14px", fontWeight: "bold", marginTop: "2px" },
            ...(isSelected("/jobs") ? selectedStyle : notSelectedStyle),
          }}
        >
          Jobs
        </span>
      </div>

      <div style={tabStyle} onClick={() => handleNavigation("/internships")}>
        <span
          className={`flaticon-certificate`}
          style={{
            ...(isSelected("/internships") ? selectedStyle : notSelectedStyle),
          }}
        ></span>
        <span
          style={{
            ...{ fontSize: "14px", fontWeight: "bold", marginTop: "2px" },
            ...(isSelected("/internships") ? selectedStyle : notSelectedStyle),
          }}
        >
          Internships
        </span>
      </div>

      <div style={tabStyle} onClick={() => handleNavigation("/courses")}>
        <span
          className={`flaticon-web-programming`}
          style={{
            ...(isSelected("/courses") ? selectedStyle : notSelectedStyle),
          }}
        ></span>
        <span
          style={{
            ...{ fontSize: "14px", fontWeight: "bold", marginTop: "2px" },
            ...(isSelected("/courses") ? selectedStyle : notSelectedStyle),
          }}
        >
          Courses
        </span>
      </div>
    </div>
  );
};

export default BottomNavigation;
