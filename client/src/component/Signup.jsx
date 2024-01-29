import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const mainDivStyles = {
    backgroundColor: 'lightblue', 
    width: '100%',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const inputStyles = {
    margin: '5px',
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/courses');
  };

  return (
    <div style={mainDivStyles}>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          style={inputStyles}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          style={inputStyles}
        />
        <br />
        <input type="submit" value="Sign Up" style={inputStyles} />
      </form>
    </div>
  );
}

export default Signup;
