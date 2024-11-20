import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatOverlay from '../components/AIChatOverlay';


function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <AIChatOverlay />
    </>
  );
}

export default Layout;