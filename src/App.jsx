// App.js
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from './Layout.jsx';
import Cart from './pages/Cart.jsx';
import Search from './components/Search.jsx';
import FoodDetails from './pages/FoodDetails.jsx';
import RestaurantInfoDetails from './pages/RestaurantInfoDetails.jsx';
import Denied from './pages/Denied.jsx';
import NotFound from './pages/NotFound.jsx';
import Signup from "./pages/Signup.jsx";
import Homepage from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/productDetails/:id" element={<FoodDetails />} />
          <Route
            path="/restaurantInfoDetails/:id"
            element={<RestaurantInfoDetails />}
          />
        </Route>
        <Route path="/denied" element={<Denied />} />

        <Route path="*" element={<NotFound />} />



        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />

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
