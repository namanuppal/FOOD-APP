import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Verification() {
  const { token } = useParams(); // Extract token from URL parameters
  const [status, setStatus] = useState(''); // Verification status
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`https://api-production-9110.up.railway.app/verify/${token}`);
        if (response.status === 200) {
          setStatus('Your account has been successfully verified!');
        } else {
          setStatus('Verification failed. Please try again.');
        }
      } catch (error) {
        setStatus('Verification failed. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className='container mx-auto my-10 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Verification Status</h1>
      {loading ? (
        <p className='text-center text-xl'>Verifying...</p>
      ) : (
        <p className='text-center text-xl'>{status}</p>
      )}
    </div>
  );
}

export default Verification;
