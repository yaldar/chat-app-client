import React from 'react';
import logo from '../images/logo.png';

const Logo = () => {
  return (
    <div className="logo-wrapper">
      <img src={logo} alt="Chat logo" className="logo" />
    </div>
  );
};

export default Logo;
