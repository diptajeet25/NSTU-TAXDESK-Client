import React, { useContext } from 'react'
import DashBoardNav from '../components/DashBoardNav'
import { DashBoardDrawer } from '../components/DashBoardDrawer'
import { AuthContext } from '../Context/AuthContext'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  const { toogle, setToogle } = useContext(AuthContext)


  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <DashBoardNav></DashBoardNav>

      <div className="relative w-full flex-1 min-h-0 flex flex-col lg:flex-row">
        <div className="flex items-stretch flex-1 min-h-0">
          <aside className={`hidden lg:block shrink-0 h-full self-stretch transition-all duration-300 ${toogle ? 'w-72' : 'w-20'}`}>
            <DashBoardDrawer></DashBoardDrawer>
          </aside>

          <div
            className={`fixed left-0 right-0 bottom-0 top-14 z-20 bg-black/30 transition-opacity duration-300 lg:hidden ${toogle ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            onClick={() => setToogle(false)}
          />
          <aside className={`fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-72 max-w-[86vw] transform bg-white shadow-xl transition-transform duration-300 lg:hidden ${toogle ? 'translate-x-0' : '-translate-x-full'}`}>
            <DashBoardDrawer></DashBoardDrawer>
          </aside>

          <div className="flex-1 min-w-0 h-full">
            <Outlet></Outlet>
            </div>

        
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout