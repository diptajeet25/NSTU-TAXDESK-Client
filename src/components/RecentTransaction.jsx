import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from './Loading';

const RecentTransaction = () => {
    const {user,loading}=useContext(AuthContext);
    const axiosSecure=useAxiosSecure();

      const {data:recentTransactions,isLoading,isFetching} = useQuery({
        queryKey: ["recentTransactions", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const res=await axiosSecure.get(`/recent-transactions?email=${user?.email}`);
          console.log(res.data);
          return res.data;
        }
      });
            const formatDate = (date) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

  return (
    <div>
            <h2 className="text-2xl font-bold text-gray-900 !mt-9">Recent Transactions</h2>
                <div className={`  min-w-full   !my-6 !mb-4 rounded-xl shadow-sm border border-gray-200 ${!recentTransactions  ? "hidden" : ""}`}>
        <table className="w-full text-sm text-left !overflow-x-auto">
          <thead>
            <tr className="bg-primary text-white">
              
              <th className="!px-4 !py-4 font-semibold text-md">Payment ID</th>
              <th className="!px-4 !py-4 font-semibold text-md">Date</th>
              <th className="!px-4 !py-4 font-semibold text-md">Product/Service Name</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Type</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Base Amount</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">VAT </th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Tax </th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Total Amount</th>
              <th className="!px-4 !py-4 font-semibold text-md text-center">Status</th>
             
            </tr>
          </thead>
        <tbody className="bg-white divide-y divide-gray-100">

  {isFetching || isLoading ? (
    <tr>
      <td colSpan={9} className="!px-4 !py-10 text-center text-gray-400">
        Updating...
      </td>
    </tr>
  ) : recentTransactions?.length > 0 ? (

    recentTransactions.map((item) => (
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
        <td className="!px-4 !py-5 text-center ">{item.status}</td>

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
    </div>
  )
}

export default RecentTransaction