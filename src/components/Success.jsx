import { Check, CircleCheckBig, Download, History, LayoutDashboard } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Success = ({finalMethod, paymentData}) => {
    const paidDate = paymentData?.paidAt ? new Date(paymentData.paidAt) : new Date()

  return (
    <section className="w-full max-w-4xl !mx-auto !mt-6 sm:!mt-8 lg:!mt-10 !mb-8 sm:!mb-10 !px-4 sm:!px-5">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm !p-5 sm:!p-6 lg:!p-7">
            <div className="flex flex-col items-center text-center gap-3">
                <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-[#E7F7EA] text-green-600 flex items-center justify-center">
                    <Check size={38} />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 text-green-700 !px-3 !py-1 text-xs font-semibold">
                    <CircleCheckBig size={14} /> Transaction Completed
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Successful</h2>
                <p className="text-sm sm:text-base text-gray-500 max-w-xl">Your tax and VAT payment has been completed successfully. A summary of your transaction is shown below.</p>
            </div>

            <div className="!mt-6 rounded-xl border border-gray-200 bg-gray-50 !p-4 sm:!p-5 lg:!p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="rounded-lg bg-white border border-gray-200 !p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Transaction ID</p>
                        <p className="!mt-1 text-sm sm:text-base font-bold text-gray-900 break-all">{paymentData?.id}</p>
                    </div>
                    <div className="rounded-lg bg-white border border-gray-200 !p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Payment Method</p>
                        <p className="!mt-1 text-sm sm:text-base font-bold text-gray-900">{finalMethod || 'N/A'}</p>
                    </div>
                    <div className="rounded-lg bg-white border border-gray-200 !p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Amount Paid</p>
                        <p className="!mt-1 text-lg sm:text-xl font-bold text-primary">৳ {paymentData?.totalAmount?.toFixed(2) || '0.00'}</p>
                    </div>
                    <div className="rounded-lg bg-white border border-gray-200 !p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Date & Time</p>
                        <p className="!mt-1 text-sm sm:text-base font-bold text-gray-900">{paidDate.toLocaleString('en-GB')}</p>
                    </div>
                </div>
            </div>

            <div className="!mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button type="button" className="btn btn-primary w-full !py-2.5"><Download size={16} /> Download Receipt</button>
                <Link to="/dashboard/payment-history" className="btn btn-outline btn-primary w-full !py-2.5"><History size={16} /> Payment History</Link>
                <Link to="/dashboard/user" className="btn btn-outline w-full !py-2.5"><LayoutDashboard size={16} /> Dashboard</Link>
            </div>
        </div>
    </section>
  )
}

export default Success