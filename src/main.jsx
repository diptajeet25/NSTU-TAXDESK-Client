import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Page/Home.jsx';
import Auth from './Page/Auth.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { VerifyEmail } from './Page/VerifyEmail.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';

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
      element:<RegisterForm></RegisterForm>
    },
    {
      path:"login",
      element:<LoginForm></LoginForm>
    }
   ]

  },
  {
    path:"/verify-email",
    element:<VerifyEmail></VerifyEmail>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
