import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseCard = ({ title, price }) => (
  <div style={styles.courseCard}>
    <h3>{title}</h3>
    <p>{`Price: ${price}`}</p>
  </div>
);



function BoughtCourses() {
  const [courses, setCourses] = useState();

  useEffect(() => {
    const getcourses = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get('http://localhost:3000/boughtCourses', config);

        if(res.data.message==="User has no bought courses")setCourses(null)
        else setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    getcourses();
  }, []);

  return (
    <div style={styles.container}>
      { courses && courses.map((course) => (
        <CourseCard key={course._id} title={course.title} price={course.price} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor:"pink"
  },
  courseCard: {
    width: '300px',
    padding: '20px',
    margin: '10px',
    border: '2px solid black',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'pink',
    textAlign: 'center',
  },
  submitButton: {
    width: '100%',
    padding: '8px',
    border: '2px solid black',
    borderRadius: '5px',
    background: 'pink',
    cursor: 'pointer',
  }
};

export default BoughtCourses;
