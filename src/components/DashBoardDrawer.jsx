import { Calculator, Clock4, CreditCard, FileText, History, LayoutDashboard, Receipt, Settings, User } from 'lucide-react'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Link, NavLink } from 'react-router'

export const DashBoardDrawer = () => {
  const { toogle } = useContext(AuthContext)


  return (
  <aside className="h-full min-h-full flex flex-col border-r border-gray-200 bg-white !py-3 !px-4">
    <div className={`!mb-3 !px-2 ${toogle ? 'block' : 'hidden'}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">Main Menu</p>
    </div>    
    <nav className="flex flex-col gap-1.5 overflow-auto hide-scrollbar">
      <NavLink to="/dashboard" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><LayoutDashboard size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >DashBoard</span>
      </NavLink>
      <NavLink to="/dashboard/profile" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><User size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Profile</span>
      </NavLink>
      <NavLink to="/dashboard/tax-vatCalculator" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><Calculator size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Tax Calculator</span>
      </NavLink>
      <NavLink to="/dashboard/make-payment" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><CreditCard size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Make Payment</span>
      </NavLink>
      <NavLink to="/dashboard/pending-payments" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><Clock4 size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Pending Payments</span>
      </NavLink>
      <NavLink to="/dashboard/payment-history" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><History size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Payment History</span>
      </NavLink>
      <NavLink to="/tax-vat-rates" className={ ({ isActive }) => `group flex w-full items-center rounded-xl !px-2 !py-2 text-left transition-all duration-200 ${toogle ? 'justify-start gap-2.5' : 'justify-center'} ${isActive ? "bg-primary !text-white" : "text-gray-700"}`}>
      <span className={`flex h-5 w-5 items-center justify-center transition-colors duration-200 `}><FileText size={19} strokeWidth={2.15} /></span>
       <span
            className={`whitespace-nowrap text-[1.12rem] font-medium leading-none transition-opacity duration-200 ${toogle ? 'opacity-100' : 'hidden opacity-0'}`}
          >Tax & VAT Rates</span>
      </NavLink>

      </nav>
  </aside>
  )
}
