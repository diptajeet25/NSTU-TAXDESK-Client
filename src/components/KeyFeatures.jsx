import { Calculator, ChartColumn, History, Lock } from 'lucide-react';
import React from 'react'

const KeyFeatures = () => {
  return (
    <div className="w-full !pt-14 bg-white !pb-8">
        <h3 className="text-3xl font-bold text-center mb-2">Key Features</h3>
        <p className="text-gray-600 text-lg text-center !px-2 !my-3">Powerful features designed to make TAX and VAT payments simple and efficient</p>
        <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 !px-4 lg:!px-8 !pt-6">
            <div className="flex flex-col gap-4 items-center text-center !p-6  rounded-lg shadow-md group bg-white rounded-xl transition duration-500 hover:-translate-y-2 hover:shadow-xl">
               <div className="text-primary !p-4 rounded-full bg-[#E9E7F7]"><p> <Calculator  /> </p></div>
               <h4 className="text-xl font-semibold">Easy Tax Calculation</h4>
               <p className="text-gray-600">Calculate your tax and VAT with our user-friendly interface, ensuring accuracy and simplicity.</p>
            </div>
                       <div className="flex flex-col gap-4 items-center text-center !p-6  rounded-lg shadow-md group bg-white rounded-xl transition duration-500 hover:-translate-y-2 hover:shadow-xl">
               <div className="text-primary !p-4 rounded-full bg-[#E9E7F7]"><p> <Lock /></p></div>
               <h4 className="text-xl font-semibold">Secure Online Payment</h4>
               <p className="text-gray-600">Make payments securely through encrypted channels with multiple payment options.</p>
            </div>
                       <div className="flex flex-col gap-4 items-center text-center !p-6  rounded-lg shadow-md group bg-white rounded-xl transition duration-500 hover:-translate-y-2 hover:shadow-xl">
               <div className="text-primary !p-4 rounded-full bg-[#E9E7F7]"><p> <History /></p></div>
               <h4 className="text-xl font-semibold">Transaction History</h4>
               <p className="text-gray-600">Access complete history of all your tax payments and pending transactions.</p>
            </div>
                        <div className="flex flex-col gap-4 items-center text-center !p-6  rounded-lg shadow-md group bg-white rounded-xl transition duration-500 hover:-translate-y-2 hover:shadow-xl">
               <div className="text-primary !p-4 rounded-full bg-[#E9E7F7]"><p> <ChartColumn /></p></div>
               <h4 className="text-xl font-semibold">Admin Monitoring System</h4>
               <p className="text-gray-600">Comprehensive dashboard for administrators to monitor and manage all transactions.</p>
            </div>
</div>
    </div>
  )
}

export default KeyFeatures;