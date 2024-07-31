import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      console.log('Logging out with token:', token);

      const response = await axios.post('https://api-production-f5b0.up.railway.app/api/v1/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Logout response:', response);

      localStorage.removeItem('token'); // Remove token from localStorage
      setIsLoggedIn(false); // Update state to reflect logout
      navigate('/signin'); // Redirect to sign-in page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className='shadow-lg sticky z-50 top-0 bg-white'>
      <nav className='flex items-center justify-between px-6'>
        <div className='flex items-center'>
          <a href="/">
            <img 
              className='w-16 md:w-20' 
              src="https://static.vecteezy.com/system/resources/previews/008/687/818/non_2x/food-delivery-logo-free-vector.jpg" 
              alt="logo" 
            />
          </a>
        </div>
        <div className='flex items-center space-x-4'>
          {isLoggedIn ? (
            <>
              <a href="/profile" className="text-blue-500 hover:underline">Profile</a>
              <button onClick={handleLogout} className="text-red-500 hover:underline">Sign Out</button>
            </>
          ) : (
            <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
