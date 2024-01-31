import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx';



const CourseCard = ({ title, price }) => (
  <div style={styles.courseCard}>
    <h3>{title}</h3>
    <p>{`Price: ${price}`}</p>
  </div>
);


function SoldCourses() {

  const [courses,setCourses]  =useState([]);
  const { isLoggedIn, logout } = useAuth();


  useEffect(() => {
    const getcourses = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get('http://localhost:3000/soldCourses', config);

        if(res.data.message==="User has no bought courses")setCourses(null)
        else setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    getcourses();
  }, []); 

  return (
    
   < div style={styles.container}>
    { 
      courses.length && isLoggedIn ? 
      (courses.map((course) => (
        <CourseCard title={course.title} price={course.price} key={course.id}> </CourseCard>
      ))
      ) : (
        <div>no course sold yet</div>
      )
    }
   </div>
  )
}


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor:"lavender"
  },
  courseCard: {
    width: '300px',
    padding: '20px',
    margin: '10px',
    border: '2px solid black',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'lavender',
    textAlign: 'center',
  },
  submitButton: {
    width: '100%',
    padding: '8px',
    border: '2px solid black',
    borderRadius: '5px',
    background: 'lavender',
    cursor: 'pointer',
  }
};


export default SoldCourses