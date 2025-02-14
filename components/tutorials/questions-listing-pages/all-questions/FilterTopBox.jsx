import React, { useState } from "react";
import sampleBlogContent from "./sampleBlogContent";
import { Container, Row, Col, Card } from "react-bootstrap";

const FilterTopBox = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <Container fluid className="my-5">
      {/* <h1 className="text-center mb-4">Welcome to Our Blog</h1> */}
      <Row>
        {/* Blog List (Left-aligned) */}
        <Col md={3}>
          {/* <h2 className="mb-3">Blog Posts</h2> */}
          <ul className="list-group">
            {sampleBlogContent.map((blog) => (
              <li
                key={blog.id}
                className={`list-group-item ${
                  selectedBlog === blog ? "active" : ""
                }`}
                onClick={() => handleBlogClick(blog)}
              >
                {blog.title}
              </li>
            ))}
          </ul>
        </Col>
        {/* Selected Blog (Centered) */}
        <Col md={9} className="d-flex align-items-center justify-content-center">
          {selectedBlog ? (
            <Card>
              <Card.Body>
                <Card.Title>{selectedBlog.title}</Card.Title>
                <Card.Text>{selectedBlog.content}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-center">
              <p>Select a blog post to read</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FilterTopBox;
