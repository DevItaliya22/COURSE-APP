import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        email: email,
        password: password
      });

      let data = response.data;

      if (data.message === "Admin already exists") {
        setErrorMessage('User already exists.');
      } else {
        localStorage.setItem("token", data.token);
        console.log(data.token);
        navigate("/courses");
        login();
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage('Error during signup. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'lavender' }}>
      <div style={{ width: '300px', padding: '20px', border: '2px solid black', borderRadius: '10px', background: 'white' }}>
        <h2>Sign Up</h2>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter your email"
            style={{ width: '100%', padding: '5px', border: '1px solid black', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter your password"
            style={{ width: '100%', padding: '5px', border: '1px solid black', borderRadius: '5px' }}
          />
        </div>
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>
        )}
        <div>
          <input
            onClick={handleSignUp}
            type="submit"
            value="Sign Up"
            style={{ width: '100%', padding: '8px', border: '2px solid black', borderRadius: '5px', background: 'lavender', cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
