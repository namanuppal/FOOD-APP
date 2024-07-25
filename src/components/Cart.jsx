import React, { useState, useEffect } from 'react';
import { getCart, clearCart } from '../middleware/cart';
import paymentGateway from './paymentGateway';

function Cart({ id }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api-production-9183.up.railway.app/foodItemApi');
      const data = await response.json();
      const restaurant = data.find(item => item.id === parseInt(id));
      setSelectedRestaurant(restaurant);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price;
    });
    return total;
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    const totalAmount = calculateTotal();
    
    // Process payment through the payment gateway
    await paymentGateway(totalAmount);
    
    // Clear the cart items
    clearCart();
    setCartItems([]);
    
    setIsLoading(false);
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
            </div>
          ))}
          {cartItems.map((item, index) => (
            <div key={index} className='bg-white rounded-lg overflow-hidden shadow-lg p-4 mb-4'>
              <h3 className='text-lg font-bold mb-2'>{item.name}</h3>
              <p className='text-gray-700'>Price: ₹{item.price}</p>
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
