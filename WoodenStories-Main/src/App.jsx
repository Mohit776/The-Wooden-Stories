import React from 'react'
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import About from './Pages/about';
import Home from './Pages/home';
import Products from './Pages/products';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './Pages/contact';
import Cart from './Pages/cart';
import Wishlist from './Pages/wishlist';
import Profile from './Pages/account';
import AdminPanel from './Pages/admin';



// Layout component that wraps all pages
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This renders the current page */}
      <Footer />
    </>
  );
};

export default function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
 
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/products", element: <Products /> }, // Fixed: was /product
        { path: "/contact", element: <Contact /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/account", element: <Profile /> },
        { path: "/admin", element: <AdminPanel /> },
        { path: "*", element: <Home /> },
      
      ]
    }
  ]);

  return <RouterProvider router={route} />;
}