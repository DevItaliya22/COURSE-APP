import BoughtCourses from "./components/BoughtCourses"
import Courses from "./components/Courses"
import Header from "./components/Header"
import AddCourses from "./components/AddCourses"
import BoughtCoursesId from "./components/BoughtCoursesId"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function Home() {
  return <h1>Welcome to the Home Page</h1>;
}

function App() {
  return (
    <>
      
      <Router>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/courses" element={<Courses />} />
          <Route path="/boughtCourses" element={<BoughtCourses />} />
          <Route path="/boughtCourses/:id" element={<BoughtCoursesId />} />
          <Route path="/addCourses" element={<AddCourses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
