import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AddCourses = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post(
        'http://localhost:3000/addCourses',
        { title, price }, 
        config
      );

      if (!res) {
        console.log('There is some problem adding the course');
      } else {
        navigate('/soldCourses');
      }
    } catch (error) {
      console.error('Error during course addition:', error);
    }
  };

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <div style={styles.formContainer}>
          <label htmlFor="password">Title:</label>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <br />
          <label htmlFor="password">Price:</label>
          <input
            type="text"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            style={styles.submitButton}
            type="submit"
            value="Add"
            onClick={handleSubmit}
          />
        </div>
      ) : (
        <div>login first</div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'lavender',
  },
  formContainer: {
    width: '300px',
    padding: '20px',
    border: '2px solid black',
    borderRadius: '10px',
    background: 'white',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '2px solid black',
    borderRadius: '5px',
    marginBottom: '15px',
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

export default AddCourses;
