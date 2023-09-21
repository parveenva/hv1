import Link from "next/link";
import ListingShowing from "../components/ListingShowing";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../app/authContext";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const FilterTopBox = () => {
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

    const categories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
      // Add more category objects as needed
    ];
    

    const locations = [
      'Location 1',
      'Location 2',
      'Location 3',
      // Add more locations as needed
    ];
    
    const searchQuery = ''; // Initialize searchQuery with an empty string

    const handleSearch = ''; // Initialize searchQuery with an empty string



    const questions = [
      {
        id: 1,
        text: "What is the capital of France?",
        options: [
          { text: "Paris", isCorrect: true },
          { text: "Berlin", isCorrect: false },
          { text: "London", isCorrect: false },
          { text: "Madrid", isCorrect: false },
        ],
      },
      // Add more question objects as needed
    ];
    
  

// Now you can use the "searchQuery" variable in your code

    // Now you can use the "locations" variable in your code
    const destinations = [
      { id: 1, name: 'Destination 1' },
      { id: 2, name: 'Destination 2' },
      { id: 3, name: 'Destination 3' },
      // Add more destination objects as needed
    ];
    
    // Now you can use the "destinations" variable in your code
        
    // Now you can use the "categories" variable in your code
    

    const handleCategoryChange = (e) => {
      // Handle category filter change here
      const selectedCategory = e.target.value;
      // Update your filter state or dispatch an action
  };
  
  const handleLocationChange = (e) => {
      // Handle location filter change here
      const selectedLocation = e.target.value;
      // Update your filter state or dispatch an action
  };
  
  const handleDestinationChange = (e) => {
      // Handle destination filter change here
      const selectedDestination = e.target.value;
      // Update your filter state or dispatch an action
  };
  
    const {
        keyword,
        location,
        destination,
        category,
        // Other filter fields specific to questions...
    } = useSelector((state) => state.questionFilter) || {}; // Update this selector to match your question filter slice.

    // Your other state variables here...

    const dispatch = useDispatch();
    const { setToken, getToken, logout, setIsLoggedIn, setUserRole, setUserId, getIsLoggedIn, getUserRole, getUserId } = useAuth();

    // Your other functions and useEffects here...

    // Change references to candidate-related functions, variables, and schemas to question-related ones.

    const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

    const openAddQuestionDialog = () => {
        setIsAddQuestionModalOpen(true);
    };

    const closeAddQuestionDialog = () => {
        setIsAddQuestionModalOpen(false);
    };

    const [questionType, setQuestionType] = useState("Text");
    const [options, setOptions] = useState([]);
    const [correctOption, setCorrectOption] = useState("");

    const handleQuestionTypeChange = (e) => {
        setQuestionType(e.target.value);
        // Reset options and correctOption when the question type changes
        setOptions([]);
        setCorrectOption("");
    };

    const handleAddOption = () => {
        // Add a new option to the options array
        setOptions([...options, ""]);
    };

    const handleOptionChange = (e, index) => {
        // Update the option at the specified index
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };

    const handleCorrectOptionChange = (e) => {
        setCorrectOption(e.target.value);
    };

    const submitQuestionForm = (e) => {
        e.preventDefault();
        // Handle form submission here, including questionType, options, and correctOption.
        console.log("Question Type:", questionType);
        console.log("Options:", options);
        console.log("Correct Option:", correctOption);
        // Perform the submission to your API or state management.
    };

  
  
    return (

            




      <>
          <div className="d-flex align-items-center">
              {/* ...Other elements... */}
  


              <div className="d-flex align-items-center">
    {/* ...Other elements... */}
    
    {/* Add Question Button */}
    <button
        className="btn btn-success me-3"
        onClick={() => openAddQuestionDialog()}
    >
        Add Question
    </button>

    {/* ...Other filter elements... */}
</div>

              {/* Category Filter */}
              <div className="me-3">
                  <select
                      name="category"
                      onChange={handleCategoryChange}
                      className="form-select"
                  >
                      <option value="">Filter Category</option>
                      {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                              {category.name}
                          </option>
                      ))}
                  </select>
              </div>
  
              {/* Location Filter */}
              <div className="me-3">
                  <select
                      name="location"
                      onChange={handleLocationChange}
                      className="form-select"
                  >
                      <option value="">Filter Location</option>
                      {locations.map((location) => (
                          <option key={location._id} value={location._id}>
                              {location.name}
                          </option>
                      ))}
                  </select>
              </div>
  
              {/* Destination Filter */}
              <div className="me-3">
                  <select
                      name="destination"
                      onChange={handleDestinationChange}
                      className="form-select"
                  >
                      <option value="">Filter Destination</option>
                      {destinations.map((destination) => (
                          <option key={destination._id} value={destination._id}>
                              {destination.name}
                          </option>
                      ))}
                  </select>
              </div>
  
              {/* Other filter elements... */}
  
              <div className="d-flex">
                  <input
                      type="text"
                      placeholder="Search questions"
                      className="form-control"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  &nbsp;
                  <button className="btn btn-primary" onClick={handleSearch}>
                      Search
                  </button>
              </div>
          </div>
          <br />
  
          {/* ...Other JSX elements for displaying questions... */}
  
          <table className="table table-striped table-bordered">
              <thead>
                  <tr>
                      <th>Select</th>
                      <th>Question Text</th>
                      <th>Category</th>
                      <th>Difficulty</th>
                      {/* Other table headers... */}
                  </tr>
              </thead>
              <tbody>
                  {questions.map((question) => (
                      <tr key={question._id}>
                          <td>
                              <input
                                  type="checkbox"
                                  checked={selectedQuestions.includes(question._id)}
                                  onChange={() => toggleQuestionSelection(question._id)}
                              />
                          </td>
                          <td>{question.text}</td>
                          <td>{question.category}</td>
                          <td>{question.difficulty}</td>
                          {/* Other table data... */}
                      </tr>
                  ))}
              </tbody>
          </table>
  
          {/* ...Other JSX elements for pagination and bulk actions... */}


          {/* Add Question Modal */}
          <Modal  className="custom-modal"
                isOpen={isAddQuestionModalOpen}
                onRequestClose={closeAddQuestionDialog}
                // Add modal styles and settings here
            >
                {/* Modal Content */}
                &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div>
                    {/* Add Question Form */}<form onSubmit={submitQuestionForm}>
    {/* Question Text */}


    <div className="row mb-12">
      <div className="col-md-12">

         <label htmlFor="questionText" className="form-label">
            Question Text
        </label>
        <input
            type="text"
            className="form-control"
            id="questionText"
            name="questionText"
            // You can add required and value attributes if needed
        />
    </div>

    </div>



    <div className="mb-3">
                      <label htmlFor="questionType" className="form-label">
                          Question Type
                      </label>
                      <select
                          className="form-select"
                          id="questionType"
                          name="questionType"
                          value={questionType}
                          onChange={handleQuestionTypeChange}
                      >
                          <option value="Text">Text</option>
                          <option value="Textarea">Textarea</option>
                          <option value="Dropdown">Dropdown</option>
                          <option value="Radio">Radio</option>
                          <option value="Multicheckbox">Multicheckbox</option>
                      </select>
                  </div>
      
                  {/* Render options input fields based on questionType */}
                  {questionType === "Dropdown" || questionType === "Radio" || questionType === "Multicheckbox" ? (
                      <div className="mb-3">
                          <label htmlFor="options" className="form-label">
                              Options
                          </label>
                          {options.map((option, index) => (
                              <div key={index} className="mb-2">
                                  <input
                                      type="text"
                                      className="form-control"
                                      placeholder={`Option ${index + 1}`}
                                      value={option}
                                      onChange={(e) => handleOptionChange(e, index)}
                                  />
                                  {questionType === "Multicheckbox" && (
                                      <div className="form-check">
                                          <input
                                              type="checkbox"
                                              className="form-check-input"
                                              checked={correctOption === option}
                                              onChange={handleCorrectOptionChange}
                                              value={option}
                                          />
                                          <label className="form-check-label">Correct</label>
                                      </div>
                                  )}
                                  {questionType === "Dropdown" && (
                                      <div className="form-check">
                                          <input
                                              type="radio"
                                              className="form-check-input"
                                              checked={correctOption === option}
                                              onChange={handleCorrectOptionChange}
                                              value={option}
                                          />
                                          <label className="form-check-label">Correct</label>
                                      </div>
                                  )}
                              </div>
                          ))}
                          <button type="button" className="btn btn-primary" onClick={handleAddOption}>
                              Add Option
                          </button>
                      </div>
                  ) : null}
      





    
    <div className="row mb-12">

    {/* Options (Multiple Choice) */}
    <div className="col-md-6">
    {/* Category */}
    <div className="mb-3">
        <label htmlFor="category" className="form-label">
            Category
        </label>
        <select
            className="form-select"
            id="category"
            name="category"
            // You can add required and value attributes if needed
        >
            <option value="">Select Category</option>
            {/* Map over your categories and create option elements */}
            {categories.map((category) => (
                <option key={category.id} value={category.name}>
                    {category.name}
                </option>
            ))}
        </select>
    </div>
    </div>

    <div className="col-md-6">

    {/* Difficulty */}
    <div className="mb-3">
        <label htmlFor="difficulty" className="form-label">
            Difficulty
        </label>
        <select
            className="form-select"
            id="difficulty"
            name="difficulty"
            // You can add required and value attributes if needed
        >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>
    </div>
    </div>
    </div>

    {/* Tags */}
    <div className="mb-3">
        <label htmlFor="tags" className="form-label">
            Tags (comma-separated)
        </label>
        <input
            type="text"
            className="form-control"
            id="tags"
            name="tags"
            // You can add value attribute if needed
        />
    </div>

    {/* Explanation */}
    <div className="mb-3">
        <label htmlFor="explanation" className="form-label">
            Explanation
        </label>
        <textarea
            className="form-control"
            id="explanation"
            name="explanation"
            rows="4"
            // You can add value attribute if needed
        ></textarea>
    </div>

    {/* Image */}
    <div className="mb-3">
        <label htmlFor="image" className="form-label">
            Image URL
        </label>
        <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            // You can add value attribute if needed
        />
    </div>

    {/* Submit button */}
    <button type="submit" className="btn btn-primary">
        Submit
    </button>
</form>

                </div>
            </Modal>
      </>
  );
  
};

export default FilterTopBox;
