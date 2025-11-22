import React ,{useEffect} from 'react'
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import AdminPanel from './Pages/Admin';

import Login from './Pages/Login';
import AddProductForm from './components/Features/AddProducts.jsx'
import EditProduct from './components/Features/edit.jsx';



const Layout = () => {
  return (
    <>
   
      <Outlet />
    
    </>
  );
};

export default function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [

        { path: "/admin", element: <AdminPanel /> },
   //  { path: "*", element: <Home /> },
        { path: "/", element: <Login /> },
        {path:"/add-product", element:<AddProductForm/>},
        {path:"/edit-product/:id", element:<EditProduct/>},
      

      ]
    }
  ]);

  return <RouterProvider router={route} />;
}
