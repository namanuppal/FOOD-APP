import React, { useState, useEffect } from 'react';
import { getCart, clearCart } from '../middleware/cart'; // Ensure these functions handle cart state and operations correctly
import paymentGateway from './paymentGateway'; // Ensure this function integrates with your payment system
import { api } from './api';
import axios from 'axios';

function Cart({ id }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const response = await fetch(api);
        const data = await response.json();
        const restaurant = data.find(item => item.id === parseInt(id));
        setSelectedRestaurant(restaurant);
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
      }
    }

    fetchRestaurant();
  }, [id]);

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    const totalAmount = calculateTotal();
    
    try {
      await paymentGateway(totalAmount);
      await placeOrder(totalAmount); // Place order after payment
      clearCart();
      setCartItems([]);
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle errors (e.g., show a message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity) => {
    try {
      await axios.post('https://api-production-f5b0.up.railway.app/cart', { productId, quantity }, { withCredentials: true });
      // Optionally update the cart items
      const updatedItems = getCart(); // Refresh cart items
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete('https://api-production-f5b0.up.railway.app/cart', { data: { productId } }, { withCredentials: true });
      // Optionally update the cart items
      const updatedItems = getCart(); // Refresh cart items
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // Place order
  const placeOrder = async (totalAmount) => {
    try {
      await axios.post('https://api-production-f5b0.up.railway.app/order', { totalAmount }, { withCredentials: true });
      // Optionally handle order success (e.g., redirect or show a confirmation message)
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className='container mx-auto my-10 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Your Added Stuff is Here!</h1>
      {cartItems.length === 0 ? (
        <p className='text-center text-xl'>Your cart is empty.</p>
      ) : (
        <div>
          {selectedRestaurant?.menu && selectedRestaurant.menu.map((category) => (
            <div key={category.id}>
              <h2 className='text-xl font-bold mb-4'>{category.category}</h2>
              {/* Render items from each category if needed */}
            </div>
          ))}
          {cartItems.map((item, index) => (
            <div key={index} className='bg-white rounded-lg overflow-hidden shadow-lg p-4 mb-4'>
              <h3 className='text-lg font-bold mb-2'>{item.name}</h3>
              <p className='text-gray-700'>Price: ₹{item.price}</p>
              <p className='text-gray-700'>Quantity: {item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2'
              >
                Remove
              </button>
            </div>
          ))}
          <div className='text-right'>
            <p className='text-xl font-bold mb-4'>Total Amount: ₹{calculateTotal()}</p>
            <button 
              onClick={handleCheckout}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
