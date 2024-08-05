// App.js
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Cart from "./pages/Cart.jsx";
import Homepage from "./pages/Home.jsx";
import Search from "./components/Search.jsx";
import FoodDetails from "./pages/FoodDetails.jsx";
import RestaurantInfoDetails from "./pages/RestaurantInfoDetails.jsx";
import Denied from "./pages/Denied.jsx";
import ForgetPassword from "./pages/password/ForgetPassword.jsx";
import ResetPassword from "./pages/password/ResetPassword.jsx";
import NotRequiedAuth from './components/Auth/NotRequiedAuth.jsx'
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ChangePassword from "./pages/password/ChangePassword.jsx";
import Profile from "./pages/User/Profile.jsx";
import EditProfile from "./pages/User/EditProfile.jsx";
import RequiedAuth from './components/Auth/RequiedAuth.jsx'
import NotFound from './pages/NotFound.jsx'

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
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route element={<NotRequiedAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<RequiedAuth allowedRoles={["USER", "ADMIN"]} />}>
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
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
