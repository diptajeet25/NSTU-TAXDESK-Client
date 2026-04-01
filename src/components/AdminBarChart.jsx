import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const AdminBarChart = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640)

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const data = [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 2000 },
    { name: 'Apr', uv: 2780 },
    { name: 'May', uv: 1890 },
    { name: 'Jun', uv: 2390 },
    { name: 'Jul', uv: 3490 },
    { name: 'Aug', uv: 2000 },

   

  ];

  const margin = isMobile
    ? { top: 12, right: 8, left: 0, bottom: 8 }
    : { top: 20, right: 30, left: 20, bottom: 20 };

  const formatAxisTick = (value) => {
    return `${value}`;
  };



  return (
    <div className='!mt-9 bg-white rounded-2xl shadow-sm border border-gray-200 !px-4 !py-5'>
      <h2 className='text-xl sm:text-2xl font-bold text-gray-900 !mb-6'>Monthly Tax-Vat Collection</h2>
      <div className='h-70 w-full md:h-85'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={margin}>
            <XAxis
              dataKey="name"
              tickFormatter={formatAxisTick}
              tick={{ fontSize: 12 }}
              interval={isMobile ? 'preserveStartEnd' : 0}
              minTickGap={isMobile ? 18 : 8}
            />
            <YAxis tick={{ fontSize: 12 }} width={isMobile ? 36 : 52} />
            <Bar dataKey="uv" fill="#570df8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AdminBarChart