import React, { useContext, useEffect } from 'react'
import logo from '../assets/nstu-logo.png'
import { AuthContext } from '../Context/AuthContext'
import { Menu } from 'lucide-react'
import { Link } from 'react-router'

const DashBoardNav = () => {
    const {user,toogle,setToogle}=useContext(AuthContext);
    
    useEffect(()=>
    {
    },[user])
  return (
      <div className="max-w-7xl mx-auto flex justify-between items-center !px-4 !py-1 !mb-0.5 sticky z-40 top-0 shadow-sm bg-white backdrop-blur-sm rounded-lg">
  <div className="flex-1 flex items-center gap-1 ">
    <Menu size={28} className="cursor-pointer" onClick={()=>setToogle(!toogle)} />
 
   
    <Link to="/" className="inline-flex items-center gap-1">
      <img src={logo} alt="NSTU Logo" className="block h-11 w-11 shrink-0 object-contain lg:h-14 lg:w-14" />
      <span className="font-bold leading-none text-primary text-base sm:text-lg lg:text-xl whitespace-nowrap">
        NSTU TAXDESK
      </span>
    </Link>
  </div>
  <Link to="/" className="flex items-center gap-3 cursor-pointer">
    <img src={user?.photoURL} alt={user?.displayName} className="w-10 h-10 rounded-full" />
    <div className='flex flex-col '>
          <h3 className='text-sm font-bold'>{user?.displayName}</h3>
          <h5 className='text-xs text-primary font-bold'>Teacher</h5>

    </div>

  </Link>

    </div>
  )
}

export default DashBoardNav