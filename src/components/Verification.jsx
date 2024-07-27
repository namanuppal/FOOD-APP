import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Verification() {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        console.log('Verification token:', token); // Log token for debugging
        const response = await fetch(`https://api-production-f5b0.up.railway.app/verify/${token}`, {
          method: 'GET',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server response error:', errorData); // Log server error
          throw new Error(errorData.message || 'An error occurred');
        }

        setMessage('Account verified successfully!');
        
        setTimeout(() => {
          navigate('/signin'); // Redirect to the sign-in page after verification
        }, 3000); // Redirect after 3 seconds
      } catch (error) {
        console.error('Error during verification:', error);
        setError(error.message);
      }
    };

    verifyUser();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Account Verification</h2>
        {message && <div className="mb-4 text-green-600">{message}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
      </div>
    </div>
  );
}

export default Verification;
