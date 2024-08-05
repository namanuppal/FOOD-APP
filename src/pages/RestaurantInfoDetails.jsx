import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../middleware/cart";
import { useParams } from "react-router-dom";
import { api } from "../middleware/api";

function RestaurantInfoDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Find the selected restaurant based on the ID from params
        const selectedRestaurant = data.find(
          (item) => item.id === parseInt(id) // Ensure ID is an integer
        );

        if (selectedRestaurant) {
          setRestaurant(selectedRestaurant);
        } else {
          throw new Error("Restaurant not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchApi();
  }, [id]);

  const handleAddToCart = (item, size, price) => {
    const cartItem = {
      ...item,
      size,
      price,
    };
    addToCart(cartItem);
    toast.success(`Added ${item.name} (${price}) to cart!`);
  };

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

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-center text-2xl font-bold text-red-500">
          Restaurant not found
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 style={{
            letterSpacing: '3px'
          }} className="text-center text-4xl font-extrabold my-8 text-gray-800">
        {restaurant.name}
      </h1>
      <div className="flex justify-center mb-8">
        <img
          src={restaurant.img}
          alt={restaurant.name}
          className="w-full max-w-4xl h-72 object-cover rounded-lg shadow-lg"
        />
      </div>
      <h2 className="text-center bg-orange-500 text-white rounded-3xl text-2xl font-semibold mb-6 py-2" style={{
            letterSpacing: '5px'
          }}>Menu</h2>

      {restaurant.menu.map((category) => (
        <div key={category.id} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-600">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white"
              >
                <h4 className="font-medium text-lg mb-2 text-gray-800">
                  {item.name}
                </h4>
                {item.prices ? (
                  <div>
                    {Object.entries(item.prices).map(([size, price]) => (
                      <div key={size} className="mb-2">
                        <p className="text-gray-600">
                          {size} Size: ₹{price}
                        </p>
                        <button
                          onClick={() => handleAddToCart(item, size, price)}
                          className="mt-2 flex items-center justify-center w-full text-white bg-orange-500 hover:bg-orange-600 p-2 rounded-lg transition-colors duration-200 ease-in-out"
                        >
                          <FaCartPlus className="mr-2" />
                          Add {size} to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">Price: ₹{item.price}</p>
                    <button
                      onClick={() => handleAddToCart(item, null, item.price)}
                      className="mt-2 flex items-center justify-center w-full text-white bg-orange-500 hover:bg-orange-600 p-2 rounded-lg transition-colors duration-200 ease-in-out"
                    >
                      <FaCartPlus className="mr-2" />
                      Add to Cart
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default RestaurantInfoDetails;
