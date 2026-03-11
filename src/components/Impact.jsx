import { BadgeDollarSign, CircleDollarSign, Receipt, TrendingUp, Users } from 'lucide-react'
import React from 'react'

const Impact = () => {
    const impacts=[
        {
            icon : <Users></Users>,
            value : "1250+",
            description : "Active Users"
        },
        {
            icon : <Receipt />,
            value : "8100+",
            description : "Transactions Processed"
        },
        {
            icon : <CircleDollarSign />,
            value : "৳ 1.2M+",
            description : "Tax Collected"
        },
        {
            icon : <TrendingUp />,
            value : "700+",
            description : "Annual Transactions"

        }
    ]
  return (
     <div className="w-full bg-primary !pt-11 !pb-10 !mt-6">
         <h3 className="text-3xl font-bold text-center mb-2 text-white">Our Impact in Numbers</h3>
      <p className="text-gray-200 text-lg text-center !px-2 !my-3">Trusted by the NSTU community for efficient tax management</p>
  <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 !px-4 lg:!px-8 !pt-6">
    {
        impacts.map((im,i)=>
                <div className="flex flex-col gap-4 items-center text-center !p-6  rounded-lg shadow-md group backdrop-blur-sm border border-white/20 bg-white/10 rounded-xl transition duration-500 hover:-translate-y-2 hover:shadow-xl">
        <div className="text-primary !p-4 rounded-full bg-[#E9E7F7]"><p> {im.icon} </p></div>
               <h4 className="text-3xl font-bold text-white"> {im.value} </h4>
                <p className="text-gray-200"> {im.description} </p>
  
  </div>
        )
    }

  </div>

     </div>
  )
}

export default Impact