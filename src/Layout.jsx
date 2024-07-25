import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Search from './components/Search'
import FloatingCart from './components/FloatingCart'

function Layout() {
  return (
    <div>
        <Header />
        <Search />
        <Outlet />
        <Footer />
        <FloatingCart />
    </div>
  )
}

export default Layout;
