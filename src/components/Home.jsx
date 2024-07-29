import React, { useEffect, useState } from 'react';
import { api } from './api';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();

        // Create a Set to track unique categories
        const uniqueCategories = new Set();
        const filteredFoods = [];

        // Loop through each restaurant and its menu
        data.forEach((restaurant) => {
          restaurant.menu.forEach((item) => {
            if (!uniqueCategories.has(item.category)) {
              uniqueCategories.add(item.category);
              filteredFoods.push({
                id: item.id,
                category: item.category,
                img: item.img,
              });
            }
          });
        });

        setFoods(filteredFoods);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        The Delicious Foods
      </h1>
      {/* Wrapper for horizontal scrolling */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-6">
          {foods.map((food, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
              style={{ minWidth: '200px' }} // Ensures each card has a minimum width
            >
              <Link to={`/productDetails/${food.id}`} className="block overflow-hidden rounded-t-lg">
                <img
                  src={food.img}
                  alt={food.category}
                  className="w-full h-48 object-cover transition-transform duration-200 ease-in-out hover:scale-105"
                />
              </Link>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-700">{food.category}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
