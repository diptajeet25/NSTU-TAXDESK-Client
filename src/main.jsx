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
import ForgetPassForm from './components/ForgetPassForm.jsx';
import ForgetPass from './Page/ForgetPass.jsx';
import DashboardLayout from './Layout/DashboardLayout.jsx';
import TaxVatRate from './Page/TaxVatRate.jsx';
import DashBoard from './Page/DashBoard.jsx';
import TaxVATCalculator from './Page/TaxVATCalculator.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
    },
    {
      path:"forget-password",
      element:<ForgetPass></ForgetPass>
    }
   ]

  },
  {
    path:"/verify-email",
    element:<VerifyEmail></VerifyEmail>
  },
  {
    path:"/dashboard",
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        index:true,
        element:<DashBoard></DashBoard>
      },
      {
        path:"tax-vatcalculator",
        element:<TaxVATCalculator></TaxVATCalculator>
      }
      
    ]
  },
  {
    path:"/tax-vat-rates",
    element:<TaxVatRate></TaxVatRate>
  }
]);
const queryClient=new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
       <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
