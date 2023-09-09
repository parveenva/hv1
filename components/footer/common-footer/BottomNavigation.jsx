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
      <div style={tabStyle} onClick={() => handleNavigation("/job-list-v1")}>
        <span
          className={`flaticon-briefcase`}
          style={{
            ...(isSelected("/job-list-v1") ? selectedStyle : notSelectedStyle),
          }}
        ></span>
        <span
          style={{
            ...{ fontSize: "14px", fontWeight: "bold", marginTop: "2px" },
            ...(isSelected("/job-list-v1") ? selectedStyle : notSelectedStyle),
          }}
        >
          Jobs
        </span>
      </div>

      <div style={tabStyle} onClick={() => handleNavigation("/ilist")}>
        <span
          className={`flaticon-certificate`}
          style={{
            ...(isSelected("/ilist") ? selectedStyle : notSelectedStyle),
          }}
        ></span>
        <span
          style={{
            ...{ fontSize: "14px", fontWeight: "bold", marginTop: "2px" },
            ...(isSelected("/ilist") ? selectedStyle : notSelectedStyle),
          }}
        >
          Internships
        </span>
      </div>

      <div style={tabStyle} onClick={() => handleNavigation("/blog-list-v1")}>
        <span
          className={`flaticon-web-programming`}
          style={{
            ...(isSelected("/blog-list-v1") ? selectedStyle : notSelectedStyle),
          }}
        ></span>
        <span
          style={{
            ...{ fontSize: "14px", fontWeight: "bold", marginTop: "2px" },
            ...(isSelected("/blog-list-v1") ? selectedStyle : notSelectedStyle),
          }}
        >
          Courses
        </span>
      </div>
    </div>
  );
};

export default BottomNavigation;
