// components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Route
      {...rest}
      element={user ? Component : <Navigate to="/signin" />}
    />
  );
};

export default PrivateRoute;
