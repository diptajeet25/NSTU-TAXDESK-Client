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
    console.log(method);
    const handleProceed=()=>
    {
        setFinalMethod(method);
        setStep(2);
        console.log(finalMethod,step);
        
    }
  return (
    <div className="w-full flex flex-col justify-center gap-4 w-full lg:w-[70%] !mx-auto !mt-10 bg-white rounded-lg shadow-md !mb-10 !p-6">
         <span className="text-2xl font-bold  flex items-center w-full !px-6    !mx-auto gap-2"> 
            <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                <CreditCard size={24} />
            </div> 
            <div className='flex flex-col items-start'>
                <h2 className="text-2xl font-bold">Select Payment Method</h2>
                <p className="text-sm text-gray-500">Choose your preferred payment method</p>
            </div>
            </span>

     
    <div className="grid grid-cols-2 !p-8 !py-6 lg:grid-cols-4 gap-4 gap-y-6 w-full !mx-auto "> 
        {methods.map((m, index) => (
            <div onClick={() => setMethod(m.name)} key={index} className={`shadow-md group backdrop-blur-sm border  rounded-xl transition duration-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 !p-4 flex flex-col items-center justify-center ${method === m.name ? "border-primary bg-primary/8 scale-105 ring-2 ring-primary" : "border-white/20 bg-white/10"}`}>
                <div className="w-16 h-16 flex items-center justify-center">
  <img src={m.logo} className="w-12 h-12 object-contain" />
</div>
                <p className="text-lg font-semibold mt-2">{m.name}</p>
            </div>
        ))}
    </div>
    <button onClick={handleProceed} className={`btn btn-primary w-[80%] !mx-auto !px-6 !py-3  ${method ? "" : "btn-disabled"}`}>Proceed to Pay</button>
    </div>
  )
}

export default PaymentMethod