import { useQuery } from '@tanstack/react-query'
import { Clock4, DollarSign, FileText, Users } from 'lucide-react'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import useAxiosSecure from '../hooks/useAxiosSecure'
import AdminBarChart from '../components/AdminBarChart'
import AdminLineChart from '../components/AdminLineChart'
import AdminPieChart from '../components/AdminPieChart'

const AdminDashBoard = () => {
  const {user}=useContext(AuthContext);
    const axiosSecure=useAxiosSecure();
    const {data:adminDashBoardStats}=useQuery({
        queryKey:['admindashBoardStat',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/adminstats?email=${user.email}`)
            console.log(res.data);
            return res.data;
        }
    })
 const summaryCards = [
  {
    title: 'Total Users',
    amount: `${adminDashBoardStats?.totalUsers || 0}`,
    change: adminDashBoardStats?.totalUsers > 0
      ? 'Registered users'
      : 'No users yet',
    icon: Users,
    positive: true,
  },
  {
    title: 'Total Transactions',
    amount: `${adminDashBoardStats?.totalTransactions || 0}`,
    change: adminDashBoardStats?.totalPaidCount > 0
      ? `${adminDashBoardStats.totalPaidCount} completed`
      : 'No completed transactions',
    icon: FileText,
    positive: true,
  },
  {
    title: 'Tax Collected',
    amount: `Tk ${adminDashBoardStats?.totalPaidAmount || 0}`,
    change: adminDashBoardStats?.totalPendingAmount > 0
      ? `Tk ${adminDashBoardStats.totalPendingAmount} pending`
      : 'No pending dues',
    icon: DollarSign,
    positive: true,
  },
  {
    title: 'Pending Amount',
    amount: `Tk ${adminDashBoardStats?.totalPendingAmount || 0}`,
    change: adminDashBoardStats?.lastPayment?.paidAt
      ? `Last payment ${new Date(adminDashBoardStats.lastPayment.paidAt).toLocaleDateString('en-GB')}`
      : 'No recent payments',
    icon: Clock4,
    positive: false,
  },
];
  return (
     <section className="flex-1 min-w-0 h-full bg-gray-50 !px-4 sm:!px-5 lg:!px-7 !py-5 lg:!py-7 overflow-auto hide-scrollbar border-l border-gray-200 md:border-l">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-xl !mt-2 max-w-3xl">
            Manage users, monitor activity, and control all operations of the NSTU TaxDesk .
          </p>
          <div className="!mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {summaryCards.map((card) => {
                const Icon = card.icon

                return (
                  <article key={card.title} className="rounded-2xl border border-gray-200 bg-white !p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-gray-500 text-base">{card.title}</p>
                        <h3 className="text-2xl font-bold text-gray-900 !mt-2">{card.amount}</h3>
                        <p className={`!mt-2 text-sm font-semibold text-gray-500`}>
                          {card.change}
                        </p>
                      </div>

                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-primary">
                        <Icon size={29} strokeWidth={2.2} />
                      </span>
                    </div>
                  </article>
                )
              })}
          </div>
          <AdminBarChart />
          <AdminLineChart />
          <AdminPieChart />
        </div>
    </section>
  )
}

export default AdminDashBoard