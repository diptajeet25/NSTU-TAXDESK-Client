import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'


const AdminLineChart = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640)

    React.useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 640)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    const data=[
    { name: 'Jan', uv: 800 },
    { name: 'Feb', uv: 1300 },
    { name: 'Mar', uv: 1000 },
    { name: 'Apr', uv: 880 },
    { name: 'May', uv: 690 },
    { name: 'Jun', uv: 1190 },
    { name: 'Jul', uv: 850 },
    { name: 'Aug', uv: 900 },
    
    ]
     const margin = isMobile
      ? { top: 10, right: 8, left: 0, bottom: 8 }
      : { top: 20, right: 30, left: 20, bottom: 20 };
  return (
<div className='!mt-9 bg-white rounded-2xl shadow-sm border border-gray-200 !px-4 !py-5'>
  <h2 className='text-xl sm:text-2xl font-bold text-gray-900 !mb-6'>Monthly Transactions</h2>
      <div className='h-70 w-full md:h-90'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={margin}
          >
            <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="Transactions" dot={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={isMobile ? 'preserveStartEnd' : 0}
              minTickGap={isMobile ? 18 : 8}
            />
            <YAxis tick={{ fontSize: 12 }} width={isMobile ? 32 : 40} />
            {!isMobile && <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '12px' }} />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AdminLineChart