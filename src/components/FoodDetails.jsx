import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from './api';

function FoodDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const product = data.find(item => item.id === parseInt(id));

        if (product) {
          setProducts(product.restaurants || []);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h1 className='text-center text-2xl font-bold my-10 text-orange-500'>Loading...</h1>;
  if (error) return <h1 className='text-center text-2xl font-bold my-10 text-red-500'>Error: {error}</h1>;

  return (
    <div className='container mx-auto my-10 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Restaurant Details</h1>
      <div className='grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product, index) => (
          <Link to={`/restaurantInfoDetails/${product.id}`} key={index} className='bg-white rounded-lg overflow-hidden shadow-lg'>
            <img className='w-full h-48 object-cover' src={product.img || 'N/A'} alt={product.name} />
            <div className='p-4'>
              <h3 className='text-xl font-bold mb-2'>{product.name || 'N/A'}</h3>
              <p className='text-gray-700'>Location: {product.location || 'N/A'}</p>
              <p className='text-yellow-500'>Rating: {product.rating || 'N/A'}</p>
              <p className='text-gray-600'>Reviews: {product.reviews || 'N/A'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FoodDetails;