import React from 'react'
import Navbar from '../shared/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../homePage/Footer'

function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>

    
    </>
  )
}

export default Layout