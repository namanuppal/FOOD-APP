import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';
import Cart from './components/Cart';
import Search from './components/Search';
import FoodDetails from './components/FoodDetails';
import RestaurantInfoDetails from './components/RestaurantInfoDetails';
import Verification from './components/Verification';
import Profile from './components/Profile';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="cart" element={<Cart />} />
        <Route path="search" element={<Search />} />
        <Route path="productDetails/:id" element={<FoodDetails />} />
        <Route path="restaurantInfoDetails/:id" element={<RestaurantInfoDetails />} />
        <Route path="verify/:token" element={<Verification />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
