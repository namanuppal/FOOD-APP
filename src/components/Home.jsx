import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from './api';

function Home() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMeals(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) return <h1 className='text-center text-2xl font-bold my-10 text-orange-500'>Loading...</h1>;
  if (error) return <h1 className='text-center text-2xl font-bold my-10 text-red-500'>Error: {error}</h1>;

  return (
    <div className='container mx-auto my-10 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Welcome to Our Meal Gallery</h1>
      <div className='grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {meals.map((joke) => (
          <div key={joke.id} className='bg-white rounded-lg overflow-hidden shadow-lg'>
            <Link to={`/productDetails/${joke.id}`}>
              <img src={joke.img} alt={joke.title} className='w-full h-48 object-cover' />
            </Link>
            <div className='p-4'>
              <h3 className='text-xl font-bold mb-2'>{joke.title}</h3>
              <p className='text-gray-700'>{joke.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
