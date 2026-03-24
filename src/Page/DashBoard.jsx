import React, { useContext } from 'react'
import { Calculator, Clock4, CreditCard, DollarSign, Download, Receipt, TrendingUp, User } from 'lucide-react'
import { AuthContext } from '../Context/AuthContext'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router';
import RecentTransaction from '../components/RecentTransaction';
import Loading from '../components/Loading';


const DashBoard = () => {
  const {user,loading}=useContext(AuthContext);
  const axiosSecure=useAxiosSecure();
  const {data:dashBoardStats,isLoading,isFetching}=useQuery({
    queryKey:["dashBoardStats",user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res=await axiosSecure.get(`/dashboard-stats?email=${user?.email}`);
      console.log(res.data);
      return res.data ;
    }
  })



      const summaryCards = [
    {
      title: 'Total Tax Calculated',
      amount: `Tk ${dashBoardStats?.totalPaidAmount+dashBoardStats?.totalPendingAmount || 0}`,
      change: dashBoardStats ? `${dashBoardStats.totalPaidCount + dashBoardStats.totalPendingCount} invoices processed` : 'No invoices processed',
      icon: Calculator,
      positive: true,
    },
    {
      title: 'Total Payments Made',
      amount: `Tk ${dashBoardStats?.totalPaidAmount || 0}`,
      change: dashBoardStats?.totalPaidAmount > 0 ? `${dashBoardStats.totalPaidCount} Paid invoices` : 'No payments made',
      icon: CreditCard,
      positive: false,
    },
    {
      title: 'Pending Payments',
      amount: `Tk ${dashBoardStats?.totalPendingAmount || 0}`,
      change: dashBoardStats?.totalPendingAmount > 0 ? `${dashBoardStats.totalPendingCount} pending invoices` : 'No pending payments',
      icon: Clock4,
      positive: false,
    },
    {
      title: 'Last Transaction',
      amount: `Tk ${dashBoardStats?.lastPayment.totalAmount || 0}`,
      change: `Paid on ${dashBoardStats?.lastPayment.paidAt ? new Date(dashBoardStats.lastPayment.paidAt).toLocaleDateString('en-GB') : 'N/A'}`,
      icon: DollarSign,
      positive: false,
    },
  ]

  const quickActions = [
    { label: 'Calculate Tax', icon: Calculator,link:"/dashboard/tax-vatCalculator" },
    { label: 'View Pending', icon: Clock4, link:"/dashboard/pending-payments" },
    { label: 'Tax History', icon: Receipt,link:"/dashboard/payment-history" },
    { label: 'Tax-VAT Rates', icon: TrendingUp,link:'/tax-vat-rates' },
    {label:'Profile',icon: User,link:'/dashboard/profile'}
  ]
  if(loading || isLoading)
    return (
  <Loading></Loading>)

  return (
    <section className="flex-1 h-full bg-gray-50 !px-4 lg:!px-7 !py-5 lg:!py-7 overflow-auto hide-scrollbar border-l border-gray-200">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 text:md lg:text-xl !mt-2 max-w-3xl">
              Welcome back {user?.displayName} ! Here is your tax and payment overview.
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

            <h2 className="text-2xl font-bold text-gray-900 !mt-9">Quick Actions</h2>
            <div className="!mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {quickActions.map((action) => {
                const ActionIcon = action.icon

                return (
                  <Link to={action.link}
                    type="button"
                    key={action.label}
                    className="rounded-2xl border border-gray-200 bg-white !py-6 !px-3 flex flex-col items-center justify-center gap-3 text-gray-700 transition-all duration-200 hover:border-primary/40 hover:shadow-sm hover:text-primary"
                  >
                    <ActionIcon size={30} strokeWidth={2.1} />
                    <span className="text-sm font-semibold text-center">{action.label}</span>
                  </Link>
                )
              })}
            </div>
            <RecentTransaction></RecentTransaction>


        
          </section>
  )
}

export default DashBoard