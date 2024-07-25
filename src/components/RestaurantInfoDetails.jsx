import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../middleware/cart';

function RestaurantInfoDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch('https://api-production-9183.up.railway.app/foodItemApi');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const selectedRestaurant = data.find(item => item.id === parseInt(id));

        if (selectedRestaurant) {
          setRestaurant(selectedRestaurant);
        } else {
          throw new Error('Restaurant not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchApi();
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`Added ${item.name} to cart!`);
  };

  if (loading) return <h1 className='text-center text-2xl font-bold my-10 text-orange-500'>Loading...</h1>;
  if (error) return <h1 className='text-center text-2xl font-bold my-10 text-red-500'>Error: {error}</h1>;
  if (!restaurant) return <h1 className='text-center text-2xl font-bold my-10 text-red-500'>Restaurant not found</h1>;

  return (
    <div className='container mx-auto my-10 px-4'>
      <ToastContainer autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h1 className='text-3xl font-bold text-center mb-8'>{restaurant.name}</h1>
      {restaurant.menu && restaurant.menu.map((category) => (
        <div key={category.id} className='mb-8'>
          <h2 className='text-xl font-bold mb-4'>{category.category}</h2>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            {category.items.map((item) => (
              <div key={item.id} className='bg-white rounded-lg overflow-hidden shadow-lg p-4'>
                <h3 className='text-lg font-bold mb-2'>{item.name}</h3>
                <p className='text-gray-700'>Price: ₹{item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 flex items-center'
                >
                  <FaCartPlus className='inline-block mr-2' /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RestaurantInfoDetails;
