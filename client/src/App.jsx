// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Appbar from './component/Appbar';
import AddCourse from './component/AddCourse';
import Course from './component/Course';
import Courses from './component/Courses';
import Signin from './component/Signin';
import Signup from './component/Signup';
import Home from './component/Home'

function App() {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/course/:courseid" element={<Course />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}


export default App;
