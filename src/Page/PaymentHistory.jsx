import { useQuery } from '@tanstack/react-query';
import { CircleCheckBig, Clock, FileText, Receipt, Search } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router';
import Loading from '../components/Loading';

const PaymentHistory = () => {
    const {register}=useForm();
    const axiosSecure=useAxiosSecure();
    const {user,loading}=useContext(AuthContext);
    const [search,setSearch]=useState("");
    const [category,setCategory]=useState("");
    const [sort,setSort]=useState("newest");
    const {data:transactions,isFetching,isLoading}=useQuery({
        queryKey:["paymentHistory",search,category,sort],
        enabled: !!user?.email,
        queryFn: async () => {
            const res=await axiosSecure.get(`/payment-history?email=${user?.email}&search=${search}&category=${category}&sort=${sort}`);
            console.log(res.data);
            return res.data;
        }

    })

    const {data:paymentStats}=useQuery({
        queryKey:["paymentStats",user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res=await axiosSecure.get(`/payment-stats?email=${user?.email}`);
            
            console.log(res.data);
            return res.data;
        }

    })
        const formatDate = (date) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};
      const hasPayments = transactions?.length > 0;
const isFiltering = search || category;
if(loading || isLoading)
    return (
  <Loading></Loading>)

  return (
    <section className="flex-1 h-full bg-gray-50 !px-4 lg:!px-7 !py-5 lg:!py-7 overflow-auto hide-scrollbar border-l border-gray-200">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Payment History</h1>
            <p className="text-gray-600 text:md lg:text-xl !mt-2 max-w-3xl">
              View your payment history and transaction details.
            </p>
             <div className="!mt-4 rounded-xl !px-5 !mx-auto !py-5"> 
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 h-full gap-5 lg:!mx-18">
                    <div className="bg-white flex  justify-between rounded-lg shadow !p-4 !py-8">
                        <div className='flex flex-col  gap-2'>
                            <h2 className='text-gray-600'>Total Paid Amount</h2>
                            <p className="text-2xl font-bold text-gray-800">{paymentStats?.totalPaidAmountSum?.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' }) || 'Tk 0'}</p>
                        </div>
                         <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                
                <Receipt size={20} />
            </div> </span>



                    </div>
                       <div className="bg-white flex  justify-between rounded-lg shadow !p-4 !py-8">
                        <div className='flex flex-col  gap-2'>
                            <h2 className='text-gray-600'>No. of Total Payment</h2>
                            <p className="text-2xl font-bold text-gray-800">{paymentStats?.totalPaid ? paymentStats.totalPaid : '0'}</p>
                        </div>
                         <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                
                <FileText size={20} />
            </div> </span>



                    </div>
                      <div className="bg-white flex  justify-between rounded-lg shadow !p-4 !py-8">
                        <div className='flex flex-col  gap-2'>
                            <h2 className='text-gray-600'>Last Payment Date</h2>
                           <p className="text-2xl font-bold text-gray-800">{ paymentStats?.lastPaid ? new Date(paymentStats.lastPaid[0].paidAt).toLocaleDateString('en-GB') : "N/A"}</p>
                        </div>
                         <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                
                <Clock size={20} />
            </div> </span>



                    </div>
                    </div>


              </div>

                  <div className={`w-full bg-white rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-3 gap-4 !mt-4 !px-2 lg:!px-6 !py-12 ${!hasPayments && !isFiltering ? "hidden" : ""}`}>
                 <div className='relative flex-1'>
                          <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                          <input
                            type="text"
                            placeholder="Search product or service..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        
                            className="rounded-lg w-full  bg-gray-200 border-black/10 !pl-8 !py-2"
                          />
                        </div>
                         
                          <div className='flex flex-col gap-1 items-start '>
                          
                          <select {...register("category")} value={category} onChange={e => setCategory(e.target.value)} className="rounded-lg w-full bg-gray-200 border-black/10 !pl-2 !py-2">
                              
                          <option value="" className='text-black'>All</option>
                              <option value="service" className='text-black'>Service</option>
                               <option value="product" className='text-black'>Product</option>
                                <option value="others" className='text-black'>Others</option>
                             
                          </select>
                         
                      </div>
                                  <div >
                          
                          <select {...register("sort")} value={sort} onChange={e => setSort(e.target.value)} className="rounded-lg w-full bg-gray-200 border-black/10 !pl-2 !py-2">
                              <option value="newest" className='text-black'>Date (Newest First)</option>
                              <option value="oldest" className='text-black'>Date (Oldest First)</option>
                               <option value="high" className='text-black'>Amount (High to Low)</option>
                                <option value="low" className='text-black'>Amount (Low to High)</option>
                             
                          </select>
                         
                      </div>
              
                            </div>
        <div className={`  min-w-full   !my-10 !mb-4 rounded-xl shadow-sm border border-gray-200 ${!hasPayments && !isFiltering ? "hidden" : ""}`}>
        <table className="w-full text-sm text-left !overflow-x-auto">
          <thead>
            <tr className="bg-primary text-white">
              
              <th className="!px-4 !py-4 font-semibold text-md">Payment ID</th>
              <th className="!px-4 !py-4 font-semibold text-md">Payment Date</th>
              <th className="!px-4 !py-4 font-semibold text-md">Product/Service Name</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Type</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Base Amount</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">VAT </th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Tax </th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Paid Amount</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Payment Method</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Action</th>
            </tr>
          </thead>
        <tbody className="bg-white divide-y divide-gray-100">

  {isFetching || isLoading ? (
    <tr>
      <td colSpan={9} className="!px-4 !py-10 text-center text-gray-400">
        Updating...
      </td>
    </tr>
  ) : transactions?.length > 0 ? (

    transactions.map((item, i) => (
      <tr key={item.id} className="hover:bg-indigo-50/40 transition-colors">
       
        <td className="!px-4 !py-5 text-center">{item.id}</td>
        <td className="!px-4 !py-5 text-center whitespace-nowrap">
          {formatDate(item.paidAt)}
        </td>
        <td className="!px-4 !py-5 text-center">{item.name}</td>

        <td className="!px-4 !py-5 text-center">{item.category}</td>
        <td className="!px-4 !py-5 text-center font-semibold">{item.baseAmount}</td>
        <td className="!px-4 !py-5 text-center">{item.vatAmount}</td>
        <td className="!px-4 !py-5 text-center">{item.taxAmount}</td>
        <td className="!px-4 !py-5 text-center font-semibold">{item.totalAmount}</td>
        <td className="!px-4 !py-5 text-center">{item.method}</td>

        <td className="!px-4 !py-5 text-center">
         
            <button className="btn btn-primary hover:bg-red-500  text-sm !px-3 !py-2">
              Download Recipt
            </button>
     
        </td>
      </tr>
    ))

  ) : (
    <tr>
      <td colSpan={10} className="!px-4 !py-10 text-center text-gray-400">
        No results found
      </td>
    </tr>
  )}

</tbody>
        </table>
      </div>

    </section>
  )
}

export default PaymentHistory