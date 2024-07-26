import React, { useState } from 'react';
import axios from 'axios'; // Axios for API requests
import { api } from './api'; // Ensure this path is correct
import { useLocation } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState(''); // Search query state
  const [results, setResults] = useState([]); // Search results state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const location = useLocation();
  const isSearchinAuthPage = location.pathname === '/signup' || location.pathname === '/signin';
  if(isSearchinAuthPage){
    return null;
  }

  // Function to handle the search
  const handleSearch = async () => {
    setLoading(true); // Set loading to true when starting search
    setError(null); // Clear any previous errors

    try {
      // Verify the API URL
      console.log("API URL:", api);
      console.log("Query:", query);

      const response = await axios.get(api);

      // Log API response data for debugging
      console.log("API Response Data:", response.data);

      // Filter restaurants based on the search query
      const filteredResults = response.data.filter(restaurant => {
        return restaurant.menu.some(category => 
          category.items.some(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
          )
        );
      });

      setResults(filteredResults);

    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(`An error occurred while fetching data: ${error.message}`);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Function to handle input change
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-200">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl flex">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for food or restaurants"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-lg shadow-md hover:bg-blue-700 transition duration-300">
          Search
        </button>
      </form>
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <div className="w-full max-w-4xl overflow-x-auto">
        <div className="flex flex-nowrap space-x-6 p-4">
          {results.length > 0 ? (
            results.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-64 bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-2">{item.location}</p>
                <p className="text-yellow-500 mb-2">Rating: {item.rating}</p>
                <p className="text-gray-600 mb-2">{item.reviews}</p>
                <img src={item.img} alt={item.name} className="w-full h-32 object-cover rounded-lg mt-2" />
              </div>
            ))
          ) : (
            <p className="text-gray-600">Please search for food</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
