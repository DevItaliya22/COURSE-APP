import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div style={{ width: '100%', height: '65px', background: 'pink' }}>
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
        </>
      )}
    </div>
  );
}

export default Header;
