import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';

const FloatingCart = () => {
  const location = useLocation();
  const isCartOrAuthPage = location.pathname === '/cart' || location.pathname === '/signup' || location.pathname === '/signin';

  if (isCartOrAuthPage) {
    return null; // Don't render the FloatingCart component on /cart or /auth pages
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link to="/cart">
        <button className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <ShoppingCart size={24} />
        </button>
      </Link>
    </div>
  );
}

export default FloatingCart;
