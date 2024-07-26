import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from './api';

function FoodDetails() {
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [foodName, setFoodName] = useState('');
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

        // Find the food item by ID and get its associated restaurants
        const foodItem = data.flatMap((restaurant) =>
          restaurant.menu
        ).find((item) => item.items.some((food) => food.id === parseInt(id)));

        if (foodItem) {
          setRestaurants(data.filter((restaurant) =>
            restaurant.menu.some((menu) => menu.id === foodItem.id)
          ));
          setFoodName(foodItem.category || ''); // Assuming foodItem has a 'category' field
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h1 className="text-center text-2xl font-bold text-orange-500">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-center text-2xl font-bold text-red-500">
          Error: {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-extrabold my-8 text-gray-800">
        Cafe and Restaurants
      </h1>
      {restaurants.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <Link
                to={`/restaurantInfoDetails/${restaurant.id}`}
                className="block overflow-hidden"
              >
                <img
                  src={restaurant.img}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-200"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  {restaurant.name}
                </h2>
                <p className="text-gray-600">{restaurant.location}</p>
                <p className="text-gray-600">
                  Rating: {restaurant.rating} - {restaurant.reviews} reviews
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-600">
          No restaurants found for this food item.
        </p>
      )}
    </div>
  );
}

export default FoodDetails;
