import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const AdminPieChart = () => {
    const data=[
        {name:"Pending",value:600},
        {name:"Paid",value:300},
    ]
  return (
    <div className='w-full !px-4 !py-5 !mt-9 bg-white rounded-2xl shadow-sm border border-gray-200'>
    <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>Monthly Transactions</h2>

      <div className='mt-4 flex w-full justify-center'>
        <div className='h-70 w-70 md:h-80 md:w-80'>
          <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="84%"
              cornerRadius={8}
              paddingAngle={5}
              dataKey="value"
              isAnimationActive
            >
              <Cell fill="#22c55e" />
              <Cell fill="#facc15" />
            </Pie>
          </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AdminPieChart