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
import PendingPayments from './Page/PendingPayments.jsx';
import PaymentPage from './Page/PaymentPage.jsx';
import PaymentHistory from './Page/PaymentHistory.jsx';
import AdminDashBoard from './Page/AdminDashBoard.jsx';
import Profile from './Page/Profile.jsx';
import { Toaster } from 'react-hot-toast';
import Receipt from './components/Receipt.jsx';

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
        path:'user',
        element:<DashBoard></DashBoard>
      },
      {
        path:'admin',
        element:<AdminDashBoard></AdminDashBoard>
      },
      {
        path:"tax-vatcalculator",
        element:<TaxVATCalculator></TaxVATCalculator>
      },
      {
        path:"pending-payments",
        element:<PendingPayments></PendingPayments>
      },
      {
        path:"payment-history",
        element:<PaymentHistory></PaymentHistory>
      },
      {
        path:"profile",
        element:<Profile></Profile>
      }
      
    ]
  },
  {
    path:"Receipt/:id",
    element:<Receipt></Receipt>
  },
  {
    path:"/tax-vat-rates",
    element:<TaxVatRate></TaxVatRate>
  },
  {
    path:`/payment/:paymentId`,
    element:<PaymentPage></PaymentPage>
  }
]);
const queryClient=new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
       <RouterProvider router={router} />
      <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: '#111827',
      color: '#fff',
      borderRadius: '10px',
      padding: '12px 16px',
      fontSize: '14px',
    },

    success: {
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff',
      },
    },

    error: {
      style: {
        border: '1px solid rgba(239,68,68,0.4)',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  }}
/>
    </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
