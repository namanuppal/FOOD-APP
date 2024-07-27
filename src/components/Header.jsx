import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://api-production-f5b0.up.railway.app/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

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
        <div className='md:hidden'>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className='p-2 text-gray-600 focus:outline-none'>
            <svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className='hidden md:flex gap-10 items-center'>
          {user ? (
            <>
              <div className="flex items-center">
                <img 
                  src={`https://api-production-9183.up.railway.app/${user.avatar}`} 
                  alt="avatar" 
                  className="w-10 h-10 rounded-full mr-2" 
                />
                <span>{user.name}</span>
              </div>
              <Link to="/cart" className='hover:text-gray-700'>Cart</Link>
            </>
          ) : (
            <Link to="/signin">
              <button className='hover:text-gray-700'>Sign in</button>
            </Link>
          )}
        </div>
      </nav>
      {menuOpen && (
        <div className='flex flex-col items-center p-4 md:hidden bg-white shadow-lg'>
          {user ? (
            <>
              <div className="flex items-center py-2">
                <img 
                  src={`https://api-production-9183.up.railway.app/${user.avatar}`} 
                  alt="avatar" 
                  className="w-10 h-10 rounded-full mr-2" 
                />
                <span>{user.name}</span>
              </div>
              <Link to="/cart" className='w-full text-center py-2 hover:bg-gray-100' onClick={() => setMenuOpen(false)}>Cart</Link>
            </>
          ) : (
            <Link to="/signin" className='w-full text-center py-2 hover:bg-gray-100' onClick={() => setMenuOpen(false)}>Sign in</Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
