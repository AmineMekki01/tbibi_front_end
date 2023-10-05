import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='pt-6 space-y-4'>
      <h1>Welcome to the Healthcare Management System</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default HomePage;
