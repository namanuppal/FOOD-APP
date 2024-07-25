import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const location = useLocation();

  // Don't render the Search component on signin and signup pages
  if (location.pathname === '/signin' || location.pathname === '/signup') {
    return null;
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Fetch foods data
      const foodsResponse = await axios.get('https://api-production-9183.up.railway.app/foods');
      const foods = foodsResponse.data;

      // Fetch food items data
      const foodItemsResponse = await axios.get('https://api-production-9183.up.railway.app/foodItemApi');
      const foodItems = foodItemsResponse.data;

      // Filter foods based on search term
      const filteredFoods = foods.filter(food =>
        food.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Filter menu items based on search term
      const filteredMenuItems = foodItems.menu.flatMap(category =>
        category.items.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(item => ({
          type: 'menuItem',
          category: category.category,
          id: item.id,
          name: item.name,
          price: item.price
        }))
      );

      // Combine the filtered results
      const combinedResults = [
        ...filteredFoods.map(food => ({
          type: 'food',
          id: food.id,
          title: food.title,
          img: food.img,
          description: food.restaurants.map(restaurant => restaurant.name).join(', ')
        })),
        ...filteredMenuItems
      ];

      setResults(combinedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center mt-2 p-2">
      <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-3/4 lg:w-1/2">
        <input
          className="border border-gray-300 px-4 py-1 w-full md:w-[350px] rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for Foods and Menu Items"
          type="text"
          name="search"
          aria-label="Search for Foods"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 mt-1 md:mt-0 md:ml-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="mt-2 w-full md:w-3/4 lg:w-1/2">
        {results.length > 0 && (
          <ul className="bg-white shadow-md rounded-lg p-2">
            {results.map((result, index) => (
              <li key={index} className="py-2 border-b last:border-b-0 flex items-center">
                {result.type === 'food' ? (
                  <div className="flex items-center">
                    <img src={result.img} alt={result.title} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h3 className="font-bold">{result.title}</h3>
                      <p>{result.description}</p>
                    </div>
                  </div>
                ) : result.type === 'menuItem' ? (
                  <div className="flex items-center">
                    <div>
                      <h3 className="font-bold">{result.name}</h3>
                      <p>Category: {result.category}</p>
                      <p>Price: ₹{result.price}</p>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
