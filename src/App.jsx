// App.js
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from './Layout.jsx';
import Home from './components/Home.jsx';
import Cart from './components/Cart.jsx';
import Search from './components/Search.jsx';
import FoodDetails from './components/FoodDetails.jsx';
import RestaurantInfoDetails from './components/RestaurantInfoDetails.jsx';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/productDetails/:id" element={<FoodDetails />} />
          <Route path="/restaurantInfoDetails/:id" element={<RestaurantInfoDetails />}
          />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;



// side bar on home and header