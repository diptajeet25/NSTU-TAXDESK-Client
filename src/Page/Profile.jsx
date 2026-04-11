import { Clock, FileText, Mail, Receipt } from 'lucide-react'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../components/Loading';

const Profile = () => {
  const {user,loading}=useContext(AuthContext);
  console.log(user);
  const axiosSecure=useAxiosSecure();
  const {data:profileInfo,isLoading}=useQuery(
    {
      queryKey:["profileInfo",user?.email],
      enabled:!loading && !!user?.email,
      queryFn:async()=>{
        const res=await axiosSecure.get(`/profile?email=${user.email}`);
        return res.data;
      }
    }
  )
  console.log(profileInfo);
  if(loading || isLoading) {
    return <Loading></Loading>
  }
  return (
    <section className="flex-1 min-w-0 h-full bg-gray-50 !px-4 sm:!px-5 lg:!px-7 !py-5 lg:!py-7 overflow-auto hide-scrollbar border-l border-gray-200">
          <div className="w-full max-w-7xl !mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">User Profile</h1>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg !mt-2 max-w-3xl leading-relaxed">
             Manage your account settings and personal information.
            </p>

             <div className="!mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 !px-4 sm:!px-6 lg:!px-8 !py-5 sm:!py-6">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 sm:gap-5 lg:gap-7">
                <div className="shrink-0">
                  <img src={profileInfo?.photourl} alt="Profile" className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full object-cover border-2 border-primary/25 shadow-sm" />
                </div>
                <div className='w-full md:flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-1.5'>
                  
                  <h2 className='text-slate-900 text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight break-all'>{profileInfo?.name}</h2>
<h4 className='text-slate-700 text-base sm:text-lg lg:text-xl'>
  {profileInfo?.designation
    ? `${profileInfo.designation.charAt(0).toUpperCase()}${profileInfo.designation.slice(1)}`
    : ''}
</h4>
<h4 className='text-slate-600 text-sm sm:text-base lg:text-lg'>Department of {profileInfo?.department}</h4>
<h4 className='text-slate-500 text-xs sm:text-sm lg:text-base break-all flex items-center gap-2'>
  <Mail size={16} className='text-slate-400 shrink-0' />
  <span>{profileInfo?.email}</span>
</h4>
<button type='button' className='btn btn-primary !mt-2 !px-5 !py-2 text-sm sm:text-base'>Edit Profile</button>
                </div>
                   

                    </div>


              </div>

            <div className="!mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4 lg:gap-5">
                    <div className="bg-white flex justify-between rounded-xl shadow-sm border border-gray-200 !p-4 !py-7">
                        <div className='flex flex-col  gap-2'>
                            <h2 className='text-gray-600'>Total Pending Amount</h2>
                            <p className="text-2xl font-bold text-gray-800"></p>
                        </div>
                         <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                
                <Receipt size={20} />
            </div> </span>



                    </div>
                       <div className="bg-white flex justify-between rounded-xl shadow-sm border border-gray-200 !p-4 !py-7">
                        <div className='flex flex-col  gap-2'>
                            <h2 className='text-gray-600'>No. of Pending Payments</h2>
                            <p className="text-2xl font-bold text-gray-800">hds</p>
                        </div>
                         <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                
                <FileText size={20} />
            </div> </span>



                    </div>
                      <div className="bg-white flex justify-between rounded-xl shadow-sm border border-gray-200 !p-4 !py-7">
                        <div className='flex flex-col  gap-2'>
                            <h2 className='text-gray-600'>Last Pending Payments</h2>
                           <p className="text-2xl font-bold text-gray-800">hdj</p>
                        </div>
                         <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                
                <Clock size={20} />
            </div> </span>



                    </div>
                    </div>


              </div>
              {/* <div className={`w-full bg-white rounded-xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 !mt-6 !px-3 sm:!px-4 lg:!px-6 !py-6 ${!hasPayments && !isFiltering ? "hidden" : ""}`}>
   <div className='relative flex-1'>
            <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type="text"
              placeholder="Search product or service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
          
              className="rounded-lg w-full bg-gray-100 border border-gray-300 !pl-8 !py-2.5"
            />
          </div>
           
            <div className='flex flex-col gap-1 items-start '>
            
            <select {...register("category")} value={category} onChange={e => setCategory(e.target.value)} className="rounded-lg w-full bg-gray-100 border border-gray-300 !pl-2 !py-2.5">
                
            <option value="" className='text-black'>All</option>
                <option value="service" className='text-black'>Service</option>
                 <option value="product" className='text-black'>Product</option>
                  <option value="others" className='text-black'>Others</option>
               
            </select>
           
        </div>
                    <div >
            
            <select {...register("sort")} value={sort} onChange={e => setSort(e.target.value)} className="rounded-lg w-full bg-gray-100 border border-gray-300 !pl-2 !py-2.5">
                <option value="newest" className='text-black'>Date (Newest First)</option>
                <option value="oldest" className='text-black'>Date (Oldest First)</option>
                 <option value="high" className='text-black'>Amount (High to Low)</option>
                  <option value="low" className='text-black'>Amount (Low to High)</option>
               
            </select>
           
        </div>

              </div>
                     <div className={`w-full bg-white !mt-8 rounded-xl shadow-sm border border-gray-200 flex flex-col !py-16 justify-center items-center gap-3 ${!hasPayments && !isFiltering ? "" : "hidden"}`}>
                             <div className="!p-4 rounded-full opacity-80 bg-gray-200"><p> <FileText size={48} /></p></div>
                                <h2 className="text-2xl font-bold text-gray-800">No Pending Payments</h2>
                                          
                                           <p className="text-gray-600 opacity-80 text-center">You currently have no pending tax payments.</p>
                                           <Link to="/dashboard/tax-vatcalculator" className="btn btn-primary font-medium !mt-1 flex items-center  !px-4 !py-2 gap-1"><Calculator size={18} /> Calculate Tax & VAT</Link>
                                           <div className="w-[90%] lg:w-[60%] !mx-auto flex justify-center !mt-3">
  <div className="bg-[#E9E7F7] shadow-sm text-sm flex items-start gap-2 text-black !px-4 !py-4 rounded-xl">
    <CircleAlert className="w-5 h-5 !mt-0.5" />
    <span>
      <span className="font-bold">Getting Started :</span>{" "}
      To begin, calculate your tax and VAT using the Tax Calculator. Once calculated, you can proceed to make a secure payment.
    </span>
  </div>
  
</div>
                                        
                  </div>
                  <div className={`overflow-x-auto !my-8 !mb-4 rounded-xl shadow-sm border border-gray-200 ${!hasPayments && !isFiltering ? "hidden" : ""}`}>
        <table className="min-w-[900px] w-full text-sm text-left">
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
          <div className="flex flex-wrap justify-center gap-2">
            <Link to={`/payment/${item.id}`} className="btn btn-primary text-sm !px-3 !py-2 whitespace-nowrap">
              Payment
            </Link>
            <button onClick={() => deletePending(item.id)} className="btn btn-outline bg-white hover:bg-red-500 hover:text-white border border-red-400 text-sm !px-3 !py-2 whitespace-nowrap">
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
      </div> */}
      {/* <div className="!mx-auto flex justify-center !mt-3">
      <div className="bg-white shadow-sm border border-gray-200 text-sm flex items-start gap-2 text-black !px-4 !py-3 !mt-4 rounded-xl">
        <CircleAlert className="w-5 h-5 !mt-0.5" />
        <span>
          <span className="font-bold">Important Notice:</span>{" "}
      Outstanding payments are displayed here All dues must be cleared within the prescribed timeframe to avoid late fees, penalties, or any administrative restrictions in accordance with institutional regulations. </span>
      </div>
    </div> */}

      </div>
        </section>
  )
}

export default Profile