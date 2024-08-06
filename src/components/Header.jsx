import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Function to handle logout
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const res = await dispatch(logout());
      if (res?.payload) {
        navigate('/');
      }
    } catch (error) {
      console.error("Logout failed: ", error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <header className='flex flex-wrap justify-between items-center p-4'>
      <a href="/">
        <img 
          className='w-16 md:w-20' 
          src="https://static.vecteezy.com/system/resources/previews/008/687/818/non_2x/food-delivery-logo-free-vector.jpg" 
          alt="logo" 
        />
      </a>

      <nav className='flex items-center'>
        {!isLoggedIn ? (  // agar login nhi hai tab
          <>
            <Link to="/login">
              <button className="btn-primary px-4 py-1 font-semibold rounded-md">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn-secondary px-4 py-1 font-semibold rounded-md">Signup</button>
            </Link>
          </>
        ) : ( // agar login hai tab
          <>
            <Link to="/user/profile">
              <button className="btn-primary px-4 py-1 font-semibold rounded-md">Profile</button>
            </Link>
            <button 
              className="btn-secondary px-4 py-1 font-semibold rounded-md" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
