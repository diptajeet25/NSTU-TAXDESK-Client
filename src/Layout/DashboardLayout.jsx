import React, { useContext } from 'react'
import { Calculator, Clock4, CreditCard, DollarSign, Download, Receipt, TrendingUp } from 'lucide-react'
import DashBoardNav from '../components/DashBoardNav'
import { DashBoardDrawer } from '../components/DashBoardDrawer'
import { AuthContext } from '../Context/AuthContext'
import { Outlet } from 'react-router'

const DashboardLayout = () => {
  const { toogle } = useContext(AuthContext)


  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <DashBoardNav></DashBoardNav>

      <div className="w-full flex-1 min-h-0 flex flex-col">
        <div className="flex items-stretch flex-1 min-h-0">
          <aside className={`shrink-0 h-full self-stretch transition-all duration-300 ${toogle ? 'w-72' : 'w-20'}`}>
            <DashBoardDrawer></DashBoardDrawer>
          </aside>
          <div className="flex-1 h-full">
            <Outlet></Outlet>
            </div>

        
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout