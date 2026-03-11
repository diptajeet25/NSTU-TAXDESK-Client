import React from 'react'
import logo from '../assets/nstu-logo.png'

const AuthNavbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full  backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
            <img src={logo} alt="NSTU Logo" className="h-10 w-10 sm:h-11 sm:w-11" />
          </div>

          <div className="leading-tight">
            <p className=" font-semibold text-primary tracking-wide  sm:text-xl">
              NSTU TAXDESK
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Secure Authentication Portal
            </p>
          </div>
        </div>

       
      </div>
    </header>
  )
}

export default AuthNavbar