import React, { useContext } from 'react'
import logo from '../assets/nstu-logo.png'
import { Link } from 'react-router'
import { AuthContext } from '../Context/AuthContext'
import useRole from '../hooks/useRole';

function Navbar() {
  const {userDetails}=useContext(AuthContext);
  const {role}=useRole();
  console.log(userDetails);
  return (

        <div className="max-w-7xl mx-auto flex justify-between items-center !px-2 !py-1 !mb-0.5 sticky z-40 top-0 shadow-sm bg-white backdrop-blur-sm rounded-lg">
  <div className="flex-1 flex items-center gap-1">
   
    <img src={logo} alt="NSTU Logo" className="w-12 lg:w-14  h-12 lg:w-14 " />
    <a className="font-bold text-primary text-lg lg:text-xl">NSTU TAXDESK</a>
  </div>
  <div className=" hidden lg:flex flex-1 justify-center">
    <ul className="flex items-center gap-4 px-1">
      <Link to="/" className=" cursor-pointer">Home</Link>
      <Link to="/about" className=" cursor-pointer">About</Link>
      { role==="admin" ?
       <Link to="/dashboard/admin" className=" cursor-pointer">DashBoard</Link> :
       <Link to="/dashboard/user" className=" cursor-pointer">DashBoard</Link>
      }
    </ul>
  </div>
  <div className="flex flex-1 gap-2 justify-end pr-4">
    <div  className="hidden lg:flex gap-3" >
         <Link to="/auth" className="btn btn-outline btn-primary !px-5 !py-0">Sign Up</Link>
<Link to="/signin" className="btn btn-primary !px-5 !py-0">Sign In</Link>
    </div>
  
<div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </div>

  <div
    tabIndex={0}
    className="dropdown-content right-0 mt-3 w-78 bg-white rounded-xl shadow-lg border !p-4"
  >

    <ul className="flex flex-col gap-4 text-lg font-medium">
      <li>
        <Link to="/" className="hover:text-primary">Home</Link>
      </li>

      <li><Link to="/about" className="hover:text-primary">About</Link></li>
       <Link to="/dashboard" className=" cursor-pointer">DashBoard</Link>
       <li><Link to="/about" className="hover:text-primary">Terms and Conditions</Link></li>
    </ul>

    <div className="border-t !my-3"></div>

    <div className="flex flex-col gap-3">
      <Link
        to="/signin"
        className="w-full border border-primary text-primary !py-2 rounded-lg text-center font-medium hover:bg-primary hover:text-white transition"
      >
        Sign Up
      </Link>

      <Link
        to="/signup"
        className="w-full bg-primary text-white !py-2 rounded-lg text-center font-medium hover:opacity-90 transition"
      >
       Sign In
      </Link>
    </div>

  </div>
</div>
  </div>
</div>
      
  )
}

export default Navbar