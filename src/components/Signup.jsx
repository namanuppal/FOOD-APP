import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSuccessModal from './CustomSuccessModal';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'https://api-production-f5b0.up.railway.app/signup';

    setError('');
    setMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (formData.avatar) {
      data.append('avatar', formData.avatar);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }

      setMessage('Sign up successful! Please check your email for verification.');
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate('/signin');
      }, 2000);
    } catch (error) {
      console.error('Error during request:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="avatar">
              Avatar
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="file"
              id="avatar"
              onChange={handleChange}
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
        {message && (
          <div className="mt-4 text-green-500">
            {message}
          </div>
        )}
        {showModal && <CustomSuccessModal message={message} />}
      </div>
    </div>
  );
};

export default SignUp;
