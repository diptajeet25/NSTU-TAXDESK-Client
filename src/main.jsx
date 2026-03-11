import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Page/Home.jsx';
import Auth from './Page/Auth.jsx';
import AuthProvider from './Context/AuthProvider.jsx';

document.documentElement.setAttribute('data-theme', 'light');

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
   children:[
    {
      index: true,
      element: <div className='flex items-center justify-center h-screen'><h1 className='text-3xl font-bold'>Authentication Page</h1></div> 
    }

   ]

  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
