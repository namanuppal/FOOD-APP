import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = "https://api-production-f5b0.up.railway.app/api/v1/user/me";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${api}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust this according to your auth method
          },
        });
        setUser(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [api]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <img src={user.avatar?.secure_url} alt="Avatar" style={{ width: '100px', height: '100px' }} />
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Profile;
