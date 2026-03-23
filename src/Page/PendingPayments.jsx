import React, { useContext, useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Calculator, CircleAlert, CircleCheckBig, Clock, CreditCard, FileText, Receipt, Search, Trash, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import Loading from '../components/Loading';

const PendingPayments = () => {
    const axiosSecure = useAxiosSecure();
    const {user,loading}=useContext(AuthContext);


    const formatDate = (date) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};
const { data: pendingStats } = useQuery({
    queryKey: ["pendingStats", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
        const res = await axiosSecure.get(`/pending-payments/stats?email=${user?.email}`);
        console.log(res.data.lastpending[0].createdAt);
        return res.data;
    }
});



    const [search,setSearch]=useState('');
    const [category,setCategory]=useState('');
    const [sort,setSort]=useState('newest');
    const { register,   } = useForm();
    const {data:pendingPayments, isLoading,isFetching} = useQuery({
        queryKey:["pendingPayments",search,category,sort],
        enabled: !loading && !!user?.email,
        keepPreviousData: true,
        queryFn: async () => {
            const res=await axiosSecure.get(`/pending-payments?email=${user?.email}&search=${search}&category=${category}&sort=${sort}`);
            console.log(res.data);
            return res.data;
        }
    })
    const {totalAmountSum,totalPending}=pendingStats || {};


    const hasPayments = pendingPayments?.length > 0;
const isFiltering = search || category;
   
        if(loading )
      return (
    <Loading />
    )
  return (
       <section className="flex-1 h-full bg-gray-50 !px-4 lg:!px-7 !py-5 lg:!py-7 overflow-auto hide-scrollbar border-l border-gray-200">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Pending Payments</h1>
            <p className="text-gray-600 text:md lg:text-xl !mt-2 max-w-3xl">
              View and complete your pending tax and VAT payments.
            </p>
              <div className="!mt-4 rounded-xl !px-5 !mx-auto !py-5"> 
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 h-full gap-5 lg:!mx-12">
                    <div className="bg-white flex  justify-between rounded-lg shadow !p-4 !py-8">
                        <div className='flex flex-col  gap-2'>
                            <h2 className='text-gray-600'>Total Pending Amount</h2>
                            <p className="text-2xl font-bold text-gray-800">{ totalAmountSum ? totalAmountSum.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' }) : 0}</p>
                        </div>
                         <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                
                <Receipt size={20} />
            </div> </span>



                    </div>
                       <div className="bg-white flex  justify-between rounded-lg shadow !p-4 !py-8">
                        <div className='flex flex-col  gap-2'>
                            <h2 className='text-gray-600'>No. of Pending Payments</h2>
                            <p className="text-2xl font-bold text-gray-800">{totalPending ? totalPending: "0"}</p>
                        </div>
                         <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                
                <FileText size={20} />
            </div> </span>



                    </div>
                      <div className="bg-white flex  justify-between rounded-lg shadow !p-4 !py-8">
                        <div className='flex flex-col  gap-2'>
                            <h2 className='text-gray-600'>Last Pending Payments</h2>
                           <p className="text-2xl font-bold text-gray-800">{totalPending ? new Date(pendingStats.lastpending[0].createdAt).toLocaleDateString('en-GB') : "N/A"}</p>
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
                     <div className={`w-full bg-white !mt-8 rounded-lg shadow-md flex flex-col !py-16 justify-center items-center gap-3 ${!hasPayments && !isFiltering ? "" : "hidden"}`}>
                             <div className="!p-4 rounded-full opacity-80 bg-gray-200"><p> <FileText size={48} /></p></div>
                                <h2 className="text-2xl font-bold text-gray-800">No Pending Payments</h2>
                                          
                                           <p className="text-gray-600 opacity-80 text-center">You currently have no pending tax payments.</p>
                                           <Link to="/dashboard/tax-vatcalculator" className="btn btn-primary font-medium !mt-1 flex items-center  !px-4 !py-2 gap-1"><Calculator size={18} /> Calculate Tax & VAT</Link>
                                           <div className="w-[80%] lg:w-[60%] !mx-auto flex justify-center !mt-3">
  <div className="bg-[#E9E7F7] shadow-md text-sm flex items-start gap-2 text-black !px-4 !py-4 rounded-xl">
    <CircleAlert className="w-5 h-5 !mt-0.5" />
    <span>
      <span className="font-bold">Getting Started :</span>{" "}
      To begin, calculate your tax and VAT using the Tax Calculator. Once calculated, you can proceed to make a secure payment.
    </span>
  </div>
  
</div>
                                        
                  </div>
                  <div className={`!overflow-x-auto  min-w-full   !my-10 !mb-4 rounded-xl shadow-sm border border-gray-200 ${!hasPayments && !isFiltering ? "hidden" : ""}`}>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-primary text-white">
             
              <th className="!px-4 !py-4 font-semibold text-md">Payment ID</th>
              <th className="!px-4 !py-4 font-semibold text-md">Date</th>
              <th className="!px-4 !py-4 font-semibold text-md">Product/Service Name</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Type</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Base Amount</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">VAT </th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Tax </th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Payable Amount</th>
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
  ) : pendingPayments?.length > 0 ? (

    pendingPayments.map((item, i) => (
      <tr key={item.id} className="hover:bg-indigo-50/40 transition-colors">
       
        <td className="!px-4 !py-5 text-center">{item.id}</td>
        <td className="!px-4 !py-5 text-center whitespace-nowrap">
          {formatDate(item.createdAt)}
        </td>
        <td className="!px-4 !py-5 text-center">{item.name}</td>

        <td className="!px-4 !py-5 text-center">{item.category}</td>
        <td className="!px-4 !py-5 text-center font-semibold">{item.baseAmount}</td>
        <td className="!px-4 !py-5 text-center">{item.vatAmount}</td>
        <td className="!px-4 !py-5 text-center">{item.taxAmount}</td>
        <td className="!px-4 !py-5 text-center font-semibold">{item.totalAmount}</td>

        <td className="!px-4 !py-5 text-center">
          <div className="flex justify-center gap-2">
            <Link to={`/payment/${item.id}`} className="btn btn-primary text-sm !px-3 !py-2">
              Payment
            </Link>
            <button className="btn btn-outline bg-white hover:bg-red-500 hover:text-white border border-red-400 text-sm !px-3 !py-2">
              Delete
            </button>
          </div>
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
      <div className=" !mx-auto flex justify-center">
      <div className="bg-white shadow-md text-sm flex items-start gap-2 text-black !px-4 !py-3 !mt-4 rounded-xl">
        <CircleAlert className="w-5 h-5 !mt-0.5" />
        <span>
          <span className="font-bold">Important Notice:</span>{" "}
      Outstanding payments are displayed here All dues must be cleared within the prescribed timeframe to avoid late fees, penalties, or any administrative restrictions in accordance with institutional regulations. </span>
      </div>
    </div>


        </section>
  )
}

export default PendingPayments