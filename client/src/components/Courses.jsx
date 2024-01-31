import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const CourseCard = ({ title, price }) => {
  const handleBuyCourse = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        title: title,
        price: price,
      };

      const res = await axios.post("http://localhost:3000/buyCourse", data, config);

      console.log(res.data);

    } catch (error) {
      console.error('Error buying course:', error);
    }
  };

  return (
    <div style={styles.courseCard}>
      <h3>{title}</h3>
      <p>{`Price: $${price}`}</p>
      <input
        style={styles.submitButton}
        type="submit"
        value="Buy"
        onClick={handleBuyCourse}
      />
    </div>
  );
};


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const {isLoggedIn} = useAuth();

  useEffect(() => {
    const getcourses = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get('http://localhost:3000/courses', config);
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    getcourses();
  }, []);
  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        courses.length ? (
          courses.map((course) => (
            <CourseCard title={course.title} price={course.price} key={course.id} />
          ))
        ) : (
          <div>No courses available</div>
        )
      ) : (
        <div>Please log in to view courses</div>
      )}
    </div>
  );
      }

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'lavender',
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
  },
};

export default Courses;