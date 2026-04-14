import { Calculator, Clock, FileText } from 'lucide-react'
import React from 'react'

const ProfileStatsCards = ({ profileInfo }) => {
  return (
    <div className="!mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 !px-4 sm:!px-6 lg:!px-8 !py-5 sm:!py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full gap-4 lg:gap-5">
        <div className="bg-white flex justify-between rounded-xl shadow-sm border border-gray-200 !p-4 !py-7">
          <div className='flex flex-col gap-2'>
            <h2 className='text-gray-600'>Total Calculation</h2>
            <p className="text-2xl font-bold text-gray-800">{profileInfo?.calculationCount || 0}</p>
          </div>
          <span className="text-2xl font-bold flex items-center gap-2">
            <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
              <Calculator size={20} />
            </div>
          </span>
        </div>

        <div className="bg-white flex justify-between rounded-xl shadow-sm border border-gray-200 !p-4 !py-7">
          <div className='flex flex-col gap-2'>
            <h2 className='text-gray-600'>Total Payments</h2>
            <p className="text-2xl font-bold text-gray-800">{profileInfo?.paymentCount || 0}</p>
          </div>
          <span className="text-2xl font-bold flex items-center gap-2">
            <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
              <Calculator size={20} />
            </div>
          </span>
        </div>

        <div className="bg-white flex justify-between rounded-xl shadow-sm border border-gray-200 !p-4 !py-7">
          <div className='flex flex-col gap-2'>
            <h2 className='text-gray-600'>Pending Payments</h2>
            <p className="text-2xl font-bold text-gray-800">{profileInfo?.pendingPaymentCount || 0}</p>
          </div>
          <span className="text-2xl font-bold flex items-center gap-2">
            <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
              <FileText size={20} />
            </div>
          </span>
        </div>

        <div className="bg-white flex justify-between rounded-xl shadow-sm border border-gray-200 !p-4 !py-7">
          <div className='flex flex-col gap-2'>
            <h2 className='text-gray-600'>Total Amount Paid</h2>
            <p className="text-2xl font-bold text-gray-800">Tk {profileInfo?.totalPaidAmount || 0}</p>
          </div>
          <span className="text-2xl font-bold flex items-center gap-2">
            <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
              <Clock size={20} />
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileStatsCards
