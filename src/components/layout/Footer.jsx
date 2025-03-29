import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <h6 className='text-center'>All Rights Reserved &copy; Coaching Management App</h6>
      <p className='text-center mt-3'>
        <Link to=''>About</Link>
        |
        <Link to=''>Contact</Link>
        |
        <Link to=''>Privacy</Link>
      </p>
    </div>
  )
}

export default Footer;
