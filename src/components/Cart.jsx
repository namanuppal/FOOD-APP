import React, { useState, useEffect } from 'react';
import { getCart, clearCart } from '../middleware/cart.js'; // Ensure these functions handle cart state and operations correctly
import paymentGateway from './paymentGateway.js'; // Ensure this function integrates with your payment system
import { api } from './api.js';

function Cart({ id }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the restaurant details
  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const response = await fetch(api);
        const data = await response.json();
        const restaurant = data.find((item) => item.id === parseInt(id));
        setSelectedRestaurant(restaurant);
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
      }
    }

    fetchRestaurant();
  }, [id]);

  // Initialize cart items with default quantity of 1
  useEffect(() => {
    const items = getCart().map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(items);
  }, []);

  // Calculate total amount
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  };

  // Handle checkout
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

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);
    // Optionally, update the cart in local storage or state
  };

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Place order
  const placeOrder = async (totalAmount) => {
    try {
      console.log(`Order placed with total amount: ₹${totalAmount}`);
      // Add any additional logic for order placement here
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className='container mx-auto my-10 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>
        Your Added Stuff is Here!
      </h1>
      {cartItems.length === 0 ? (
        <p className='text-center text-xl'>Your cart is empty.</p>
      ) : (
        <div>
          {selectedRestaurant?.menu &&
            selectedRestaurant.menu.map((category) => (
              <div key={category.id}>
                <h2 className='text-xl font-bold mb-4'>{category.category}</h2>
                {/* Render items from each category if needed */}
              </div>
            ))}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='bg-white rounded-lg overflow-hidden shadow-lg p-4 mb-4'
            >
              <h3 className='text-lg font-bold mb-2'>{item.name}</h3>
              <p className='text-gray-700'>Price: ₹{item.price}</p>
              <div className='flex items-center'>
                <p className='text-gray-700 mr-2'>Quantity:</p>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  className='w-16 p-1 border rounded'
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2'
              >
                Remove
              </button>
            </div>
          ))}
          <div className='text-right'>
            <p className='text-xl font-bold mb-4'>
              Total Amount: ₹{calculateTotal()}
            </p>
            <button
              onClick={handleCheckout}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 motion-reduce:hidden'
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
