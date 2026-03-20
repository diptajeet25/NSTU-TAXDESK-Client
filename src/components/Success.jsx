import { Check } from 'lucide-react'
import React from 'react'

const Success = ({finalMethod, paymentData}) => {
  return (
  <div className="w-full flex flex-col justify-center gap-6 w-full lg:w-[70%] !mx-auto !mt-10 bg-white rounded-lg shadow-md !mb-10 !p-6">
       <span className="text-2xl font-bold  flex justify-center items-center w-full     !mx-auto gap-2"> 
            <div className=" !p-4 rounded-full bg-[#E7F7EA] text-green-600">
              <Check size={40} />
            </div> 
            
            </span>
            <h2 className="text-2xl font-bold text-center">Payment Successful</h2>
            <p className="text-sm text-gray-500 text-center">Your tax and VAT payment has been completed successfully.</p>
            <div className="flex flex-col gap-4 !mt-2 !mb-10 !mx-4 lg:!mx-12 !px-4 bg-[#E9E7F7] shadow-md rounded-lg !py-6">
                <div className='flex justify-between'>
                    <div className='flex flex-col  justify-center gap-2 text-sm text-gray-600'>
                        <span className="text-sm text-gray-600">Transaction ID:</span>
                        <span className="text-lg font-bold">{paymentData.id}</span>
                    </div>
                    <div className='flex flex-col  justify-center gap-2 text-sm text-gray-600'>
                        <span className="text-sm text-gray-600">Payment Method</span>
                        <span className="text-lg font-bold">{finalMethod}</span>

                    </div>

                </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col  justify-center gap-2 text-sm text-gray-600'>
                        <span className="text-sm">Amount Paid</span>
                        <span className="text-lg font-bold">৳ {paymentData?.totalAmount?.toFixed(2)}</span>
                    </div>
                    <div className='flex flex-col  justify-center gap-2 text-sm text-gray-600'>
                        <span className="text-sm">Date & Time</span>
                        <span className="text-lg font-bold">{new Date().toLocaleDateString()}</span>
                        
                    </div>

                </div>


            </div>
   
  </div>
  )
}

export default Success