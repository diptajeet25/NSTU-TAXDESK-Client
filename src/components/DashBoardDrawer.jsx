import { Calculator, Clock4, FileChartColumnIncreasing, FileText, History, LayoutDashboard, LogOut, Receipt, SettingsIcon, User, Users } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { NavLink, useNavigate } from 'react-router'
import useRole from '../hooks/useRole'
import toast from 'react-hot-toast'

export const DashBoardDrawer = () => {
  const { toogle, setToogle, logoutUser } = useContext(AuthContext)
  const {role}=useRole();
  const navigate = useNavigate();
  const [isLoggingOut,setIsLoggingOut]=useState(false);

  const closeDrawerOnMobile = () => {
    if (window.innerWidth < 1024) {
      setToogle(false)
    }
  }

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutUser();
      toast.success('Logged out successfully.');
      closeDrawerOnMobile();
      navigate('/auth/login');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  }


  return (
  <aside className="h-full min-h-full flex flex-col border-r border-gray-200 bg-white !py-3 !px-4">
    <div className={`!mb-3 !px-2 ${toogle ? 'block' : 'hidden'}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Main Menu</p>
    </div>   
    {
      role === 'admin' ?  <nav className="flex flex-col gap-1.5 overflow-auto hide-scrollbar">
      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/admin" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><LayoutDashboard size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >DashBoard</span>
      </NavLink>
      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/profile" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><Users size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Manage Users</span>
      </NavLink>
      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/tax-vatCalculator" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><SettingsIcon size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Tax & VAT Config</span>
      </NavLink>
        <NavLink onClick={closeDrawerOnMobile} to="/dashboard/pending-payments" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><Receipt size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Transactions</span>
      </NavLink>


      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/pending-payments" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><Clock4 size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Pending Payments</span>
      </NavLink>
      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/payment-history" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><FileChartColumnIncreasing size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Financial Reports</span>
      </NavLink>
  

      <button type="button" onClick={handleLogout} disabled={isLoggingOut} className={`group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} text-red-600 hover:bg-red-50 disabled:opacity-70`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><LogOut size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
      </button>


      </nav> :  <nav className="flex flex-col gap-1.5 overflow-auto hide-scrollbar">
      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/user" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><LayoutDashboard size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >DashBoard</span>
      </NavLink>
      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/profile" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><User size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Profile</span>
      </NavLink>
      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/tax-vatCalculator" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><Calculator size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Tax Calculator</span>
      </NavLink>
      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/pending-payments" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><Clock4 size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Pending Payments</span>
      </NavLink>
      <NavLink onClick={closeDrawerOnMobile} to="/dashboard/payment-history" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><History size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Payment History</span>
      </NavLink>
      <NavLink onClick={closeDrawerOnMobile} to="/tax-vat-rates" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><FileText size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Tax & VAT Rates</span>
      </NavLink>

      <button type="button" onClick={handleLogout} disabled={isLoggingOut} className={`group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} text-red-600 hover:bg-red-50 disabled:opacity-70`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><LogOut size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-base lg:text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
      </button>

      </nav>
    } 
   
  </aside>
  )
}
