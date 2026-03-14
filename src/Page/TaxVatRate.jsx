import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Download, FileText, Search } from 'lucide-react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'





const TaxVatRate = () => {
  const [taxVatData, setTaxVatData] = useState([]);
  const [search, setSearch] = useState('')
  const axiosSecure=useAxiosSecure();
  const {data:taxes=[],refetch}=useQuery(
    {
      queryKey:['taxes'],
      queryFn:async()=>
      {
        const res=await axiosSecure.get('/taxvatrates');
        setTaxVatData(res.data);
        return res.data;
      }

    }
  )


  const filtered = taxVatData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <Navbar />

      <div className='flex !mx-6 !py-10 items-center justify-start gap-3'>
        <div className="text-primary rounded-2xl w-[22%] lg:w-[7%] flex justify-center !p-4 lg:!p-3 bg-[#E9E7F7]">
          <FileText size={38} />
        </div>
        <div>
          <h1 className='text-2xl lg:text-3xl font-bold'>Tax & VAT Rates</h1>
          <p className='text-gray-700 text-sm lg:text-md'>Official tax and VAT rates based on the National Board of Revenue guideline</p>
        </div>
      </div>

      <div className='w-full lg:w-[75%] bg-white shadow-md flex flex-col gap-3 rounded-xl !px-5 !mx-auto !py-5'>
        <div className='flex items-center gap-3'>
          <div className='relative flex-1'>
            <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type="text"
              placeholder="Search product or service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg bg-gray-100 border border-gray-200 !pl-9 !pr-3 !py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button className="btn btn-primary flex items-center gap-2 !px-5 !py-2 rounded-lg text-sm whitespace-nowrap">
            <Download size={16} /> Download PDF
          </button>
        </div>
        <p className='text-sm text-gray-500'>
          Showing <span className='font-semibold text-gray-700'>{filtered.length}</span> of <span className='font-semibold text-gray-700'>{taxVatData.length}</span> services
        </p>
      </div>

      <div className="overflow-x-auto w-full lg:w-[80%] !mx-auto !my-6 rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-primary text-white">
              <th className="!px-6 !py-4 font-semibold text-base w-30">Serial No</th>
              <th className="!px-6 !py-4 font-semibold text-base">Product/Service Name</th>
              <th className="!px-6 !py-4 font-semibold text-base text-center">Type</th>
              <th className="!px-6 !py-4 font-semibold text-base text-center">VAT (%)</th>
              <th className="!px-6 !py-4 font-semibold text-base text-center">Tax (%)</th>
              <th className="!px-6 !py-4 font-semibold text-base text-center">Total Rate (%)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.length > 0 ? filtered.map((item) => (
              <tr key={item.id} className="hover:bg-indigo-50/40 transition-colors">
                <td className="!px-6 !py-5 text-gray-600 font-medium">{item.id}</td>
                <td className="!px-6 !py-5 text-gray-800 font-medium">{item.name}</td>
                <td className="!px-6 !py-5 text-center">
                  <span className={`!px-3 !py-1 rounded-full text-xs font-semibold ${item.type === 'Product' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {item.category}
                  </span>
                </td>
                <td className="!px-6 !py-5 text-center">
                  <span className="inline-block bg-blue-50 text-blue-500 font-semibold text-sm !px-4 !py-1.5 rounded-full min-w-[52px]">
                    {item.vatRate}%
                  </span>
                </td>
                <td className="!px-6 !py-5 text-center">
                  <span className="inline-block bg-green-50 text-green-600 font-semibold text-sm !px-4 !py-1.5 rounded-full min-w-[52px]">
                    {item.incomeTaxRate}%
                  </span>
                </td>
                <td className="!px-6 !py-5 text-center">
                  <span className="inline-block bg-purple-50 text-purple-500 font-semibold text-sm !px-4 !py-1.5 rounded-full min-w-[52px]">
                    {parseFloat(item.vatRate) + parseFloat(item.incomeTaxRate)}%
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="!px-6 !py-10 text-center text-gray-400">
                  No results found for &quot;{search}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-[95%] lg:w-[75%] !mx-auto !mb-8 rounded-xl border border-blue-100 bg-[#E9E7F7] !px-6 !py-6">
        <div className="flex items-center gap-3 !mb-4">
          <FileText size={22} className="text-black" />
          <h2 className="text-lg font-bold text-black">Important Information</h2>
        </div>
        <ul className="space-y-2 text-sm text-black">
          <li className="flex items-start gap-2"><span className="mt-0.5 text-black font-bold">•</span> All rates are subject to change based on NBR guidelines</li>
          <li className="flex items-start gap-2"><span className="mt-0.5 text-black font-bold">•</span> VAT and Tax are calculated on the gross amount of the service</li>
          <li className="flex items-start gap-2"><span className="mt-0.5 text-black font-bold">•</span> For detailed calculation, please use the Tax Calculator</li>
          <li className="flex items-start gap-2"><span className="mt-0.5 text-black font-bold">•</span> Contact the Finance Department for any clarifications</li>
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default TaxVatRate