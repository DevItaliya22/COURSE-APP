import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function AddCourse() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [instructor, setInstructor] = useState('');
  const navigate=useNavigate();

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
  };

  const handleCourseCodeChange = (e) => {
    setCourseCode(e.target.value);
  };

  const handleInstructorChange = (e) => {
    setInstructor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/courses')
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input type="text" value={courseName} onChange={handleCourseNameChange} />
        </label>
        <br />
        <label>
          Course Code:
          <input type="text" value={courseCode} onChange={handleCourseCodeChange} />
        </label>
        <br />
        <label>
          Instructor:
          <input type="text" value={instructor} onChange={handleInstructorChange} />
        </label>
        <br />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}

export default AddCourse;
