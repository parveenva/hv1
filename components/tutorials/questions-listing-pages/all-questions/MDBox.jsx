import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Row, Col } from "react-bootstrap";

const MDBox = () => {
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [markdownFiles, setMarkdownFiles] = useState([]);
  const [isIndexVisible, setIsIndexVisible] = useState(false);

  useEffect(() => {
    // Fetch the list of Markdown files from the API
    fetch("/api/markdown")
      .then((response) => response.json())
      .then((data) => {
        if (data.markdownFiles) {
          const sortedFiles = data.markdownFiles.slice().sort((a, b) => {
            const aNumber = Number(a.match(/^\d+/));
            const bNumber = Number(b.match(/^\d+/));
            return aNumber - bNumber;
          });

          setMarkdownFiles(sortedFiles);

          // Select the first file by default
          if (data.markdownFiles.length > 0) {
            handleFileClick(sortedFiles[0]);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching Markdown files:", error);
      });
  }, []);

  const handleFileClick = async (fileName) => {
    setSelectedFileName(fileName);

    try {
      const response = await fetch(`/api/markdown?fileName=${fileName}`);
      if (response.ok) {
        const data = await response.json();
        setMarkdownContent(data.content);
      } else {
        console.error(`Error fetching Markdown file: ${fileName}`);
        setMarkdownContent("Markdown content not found");
      }
    } catch (error) {
      console.error(`Error fetching Markdown file: ${fileName}`, error);
      setMarkdownContent("Markdown content not found");
    }
         toggleIndexVisibility();
  };

  const displayFileName = (fileName) => {
    // Remove the numbers before displaying the file name
    return fileName.replace(/^\d+\./, "");
  };

  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed


  const toggleIndexVisibility = () => {
    console.log("toggleIndexVisibility called");
    if(!(window.innerWidth <= 768)){

    setIsIndexVisible(true);
    return;

    }

    setIsIndexVisible(!isIndexVisible);
  };


  return (
    <Container fluid>
     {isMobile && (
  <div className="index-toggle" onClick={toggleIndexVisibility}>
    <i className={`fas fa-bars ${isIndexVisible ? "open" : "close"}`} />
  </div>
)}

      <Row
      >
        <Col md={3} className={`index-column ${isIndexVisible ? "visible" : "hidden"}`}>
          <div className="index-container">
          
            <ul className="list-group">
              {markdownFiles.map((fileName) => (
                <li key={fileName} className="list-group-item">
                  <button onClick={() => handleFileClick(fileName) }>
                    {displayFileName(fileName)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9} className="content-column">
          {selectedFileName && (
            <div>
              <h2>{displayFileName(selectedFileName)}</h2>
              <div className="markdown-content">
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MDBox;
