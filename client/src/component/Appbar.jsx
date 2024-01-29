import React from 'react';
import { Link } from 'react-router-dom';
function Appbar() {
  const appbarStyles = {
    backgroundColor: 'pink', 
    color: 'white',          
    padding: '10px', 
    width:'100%' ,
    height:'30px' ,
    display:'flex',
  };
  const button={
    marginRight:'10px',
    borderRadius:"10%" ,
    
  }
  const link={
    textDecoration:"none",
    color:"black"
  }

    // if(!user)
  return (
    <div style={appbarStyles}>
      <button style={button}><Link style={link} to='/signin'>SignIn</Link></button>
    
      <button style={button}><Link to='/signup'>Signup</Link></button>
    </div>
  );
  // else 
  // return 
}

export default Appbar;
