import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      Fenix Registration System &copy; Fenix BJJ Academy - year{' '}
      {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
