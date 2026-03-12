import React, { useContext, useEffect } from 'react'
import logo from '../assets/nstu-logo.png'
import { AuthContext } from '../Context/AuthContext'

const DashBoardNav = () => {
    const {user}=useContext(AuthContext)
    useEffect(()=>
    {
        console.log(user);

    },[user])
  return (
      <div className="max-w-7xl mx-auto flex justify-between items-center !px-2 !py-1 !mb-0.5 sticky z-40 top-0 shadow-sm bg-white backdrop-blur-sm rounded-lg">
  <div className="flex-1 flex items-center gap-1">
   
    <img src={logo} alt="NSTU Logo" className="w-12 lg:w-14  h-12 lg:w-14 " />
    <a className="font-bold text-primary text-lg lg:text-xl">NSTU TAXDESK</a>
  </div>
  <div className="flex items-center gap-2">
    <img src={user?.photoURL} alt={user?.displayName} className="w-10 h-10 rounded-full" />
    <h3>{user?.displayName}</h3>
  </div>

    </div>
  )
}

export default DashBoardNav