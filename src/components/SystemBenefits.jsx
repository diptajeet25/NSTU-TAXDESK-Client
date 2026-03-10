import { Archive, ChartLine, Eye, Shield } from 'lucide-react'
import React from 'react'

const SystemBenefits = () => {
    const benefits = [
        {
            icon: <Shield></Shield>,
            heading: "Secure Authentication",
            description: "Multi-layer security with encrypted data transmission to protect your financial information."
        },
        {
            icon: <ChartLine></ChartLine>,
            heading: "Real-time Analytics",
            description: "Gain valuable insights with our real-time analytics and reporting tools."
        },
        {
            icon: <Eye />,
            heading: "Transparent Transactions",
            description: "Complete transparency with detailed transaction history and status updates."
        },
        {
            icon: <Archive />,
            heading: "Digital Record Keeping",
            description: "Access and download all payment records anytime, anywhere for your convenience."
        }
    ]
  return (
     <div className="w-full !pt-12 bg-white !pb-8 ">
          <h3 className="text-3xl font-bold text-center mb-2">System Benefits</h3>
        <p className="text-gray-600 text-lg text-center !my-3">Designed with your convenience and security in mind</p>
       <div className="w-full mt-10 grid grid-cols-1  lg:grid-cols-2 gap-8 gap-y-6 !px-12 !pt-6">
        {
            benefits.map((benefit, i) => (
                <div className="flex gap-4 items-center justify-center !p-6  rounded-lg shadow-md group bg-white rounded-xl transition duration-500 hover:-translate-y-2 hover:shadow-xl">
            <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
            {benefit.icon}
            </div>
            <div className="col-span-2">
                 <h4 className="text-xl font-semibold">{benefit.heading}</h4>
                 <p className="text-gray-600">{benefit.description}</p>
            </div>
               </div>))

        }
        


    
    


       </div>
       </div>

        
  )
}

export default SystemBenefits