import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div style={{ width: '100%', height: '65px', background: 'lavender' }}>
      {!isLoggedIn ? (
        <>
          <button
            style={{
              border: 'solid black 2px',
              borderRadius: '10%',
              padding: '3px',
              marginRight: '20px',
              marginTop: '15px',
            }}
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
          <button
            style={{
              border: 'solid black 2px',
              borderRadius: '10%',
              padding: '3px',
              marginLeft: '20px',
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </>
      ) : (
        <>

          <button
            style={{
              border: 'solid black 2px',
              borderRadius: '10%',
              padding: '3px',
              marginLeft: '20px',
            }}
            onClick={() => navigate('/')}
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate('/addCourses');
            }}
            style={{
              border: 'solid black 2px',
              borderRadius: '10%',
              padding: '3px',
              marginLeft: '20px',
              marginTop: '15px',
            }}
          >
            Add Courses
          </button>

          <button
            onClick={() => {
              navigate('/courses');
            }}
            style={{
              border: 'solid black 2px',
              borderRadius: '10%',
              padding: '3px',
              marginLeft: '20px',
              marginTop: '15px',
            }}
          >
            Courses
          </button>

          <button
            onClick={() => {
              navigate('/boughtCourses');
            }}
            style={{
              border: 'solid black 2px',
              borderRadius: '10%',
              padding: '3px',
              marginLeft: '20px',
              marginTop: '15px',
            }}
          >
            Bought Course
          </button>

          <button
            onClick={() => {
              navigate('/soldCourses');
            }}
            style={{
              border: 'solid black 2px',
              borderRadius: '10%',
              padding: '3px',
              marginLeft: '20px',
              marginTop: '15px',
            }}
          >
            Sold Course
          </button>


          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            style={{
              border: 'solid black 2px',
              borderRadius: '10%',
              padding: '3px',
              marginLeft: '20px',
              marginTop: '15px',
            }}
          >
            Log out
          </button>
          
        </>
      )}
    </div>
  );
}

export default Header;
