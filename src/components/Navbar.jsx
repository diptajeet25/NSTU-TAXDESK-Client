import React from 'react'
import logo from '../assets/nstu-logo.png'
import { Link } from 'react-router'
import useRole from '../hooks/useRole';
import { Menu } from 'lucide-react';

function Navbar() {
  const {role}=useRole();
  const dashboardPath = role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto !px-3 sm:!px-4">
        <div className="h-16 lg:h-[74px] flex items-center justify-between gap-3">
          <Link to="/" className="inline-flex items-center gap-1">
            <img src={logo} alt="NSTU Logo" className="block h-10 w-10 sm:h-11 sm:w-11 lg:h-14 lg:w-14 shrink-0 object-contain" />
            <span className="font-bold leading-none text-primary text-sm sm:text-lg lg:text-xl whitespace-nowrap">
              NSTU TAXDESK
            </span>
          </Link>

          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-6 text-[0.98rem] font-medium text-gray-700">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/tax-vat-rates" className="hover:text-primary transition-colors">Tax & VAT Rates</Link></li>
              <li><Link to={dashboardPath} className="hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <Link to="/auth" className="btn btn-outline btn-primary !px-5 !py-0">Sign Up</Link>
            <Link to="/auth/login" className="btn btn-primary !px-5 !py-0">Sign In</Link>
          </div>

          <div className="dropdown dropdown-end lg:hidden">
            <button tabIndex={0} type="button" className="btn btn-ghost btn-sm" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>

            <div tabIndex={0} className="dropdown-content right-0 !mt-3 w-72 bg-white rounded-xl shadow-lg border border-gray-200 !p-4">
              <ul className="flex flex-col gap-3 text-base font-medium text-gray-700">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/tax-vat-rates" className="hover:text-primary transition-colors">Tax & VAT Rates</Link></li>
                <li><Link to={dashboardPath} className="hover:text-primary transition-colors">Dashboard</Link></li>
              </ul>

              <div className="border-t border-gray-200 !my-2"></div>

              <div className="grid grid-cols-1 gap-2.5">
                <Link to="/auth" className="w-full border border-primary text-primary !py-2 rounded-lg text-center font-medium hover:bg-primary hover:text-white transition">
                  Sign Up
                </Link>
                <Link to="/auth/login" className="w-full bg-primary text-white !py-2 rounded-lg text-center font-medium hover:opacity-90 transition">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar