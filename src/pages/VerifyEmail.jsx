import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { verifyEmail } from '../redux/authSlice';

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate('/'); // Redirect to home or any other route on error
    }
  }, [error, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 bg-white shadow-md rounded">
        <h2 className="text-lg font-semibold">Verifying Email...</h2>
        {/* You can show a loading spinner here if needed */}
      </div>
    </div>
  );
};

export default VerifyEmail;
