import React, { useState } from 'react'
import bkash from '../assets/Mobile Banking Logo/bkash.png'
import nagad from '../assets/Mobile Banking Logo/nagad.jpg'
import rocket from '../assets/Mobile Banking Logo/rocket.png'
import tap from '../assets/Mobile Banking Logo/tap.png'
import upay from '../assets/Mobile Banking Logo/upay.png'
import surecash from '../assets/Mobile Banking Logo/surecash.png'
import mcash from '../assets/Mobile Banking Logo/mcash.png'
import ucash from '../assets/Mobile Banking Logo/ucash.png'
import { CreditCard } from 'lucide-react'
const methods=[
    {name:"Bkash",logo:bkash},
    {name:"Nagad",logo:nagad},
    {name:"Rocket",logo:rocket},
    {name:"Tap",logo:tap},
    {name:"Upay",logo:upay},
    {name:"SureCash",logo:surecash},
    {name:"Mcash",logo:mcash},
    {name:"Ucash",logo:ucash}
]

const PaymentMethod = ({finalMethod,setFinalMethod,step,setStep }) => {
    const [method,setMethod]=useState("");

    const handleProceed=()=>
    {
        setFinalMethod(method);
        setStep(2);
        console.log(finalMethod,step);
        
    }
  return (
    <div className="flex flex-col justify-center gap-4 w-full max-w-4xl !mx-auto !mt-6 sm:!mt-8 lg:!mt-10 bg-white rounded-2xl border border-gray-200 shadow-sm !mb-8 sm:!mb-10 !p-4 sm:!p-6">
         <div className="text-2xl font-bold flex items-start sm:items-center w-full gap-3"> 
            <div className="text-primary !p-3 sm:!p-4 rounded-2xl bg-[#E9E7F7] shrink-0">
                <CreditCard size={24} />
            </div> 
            <div className='flex flex-col items-start'>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">Select Payment Method</h2>
                <p className="text-sm text-gray-500">Choose your preferred payment method</p>
            </div>
            </div>

     
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 !p-2 sm:!p-4 lg:!p-6 !py-4 sm:!py-6 gap-3 sm:gap-4 w-full !mx-auto"> 
        {methods.map((m, index) => (
            <button type="button" onClick={() => setMethod(m.name)} key={index} className={`shadow-sm group border rounded-xl hover:-translate-y-1 hover:shadow-md transition-all duration-300 !p-3 sm:!p-4 flex flex-col items-center justify-center min-h-28 sm:min-h-32 ${method === m.name ? "border-primary bg-primary/8 scale-[1.02] ring-2 ring-primary" : "border-gray-200 bg-white"}`}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
  <img src={m.logo} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
</div>
                <p className="text-sm sm:text-base font-semibold !mt-2 text-center">{m.name}</p>
            </button>
        ))}
    </div>
    <button onClick={handleProceed} className={`btn btn-primary w-full sm:w-[80%] !mx-auto !px-6 !py-3 ${method ? "" : "btn-disabled"}`}>Proceed to Pay</button>
    </div>
  )
}

export default PaymentMethod