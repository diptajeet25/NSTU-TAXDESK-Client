import { CircleAlert, RefreshCw, Shield } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Pin = ({finalMethod, phone, paymentData, setStep}) => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const axiosSecure=useAxiosSecure();
  const [load,setLoad]=useState(false);
    const handlepin=async(data)=>
    {
    setLoad(true);
        const paymentInfo={
            status:"Paid",
            method:finalMethod,
            phone:phone,
            paidAt:new Date(),

        }
        try {
          const res=await axiosSecure.patch(`/payment?id=${paymentData.id}`,paymentInfo)
          setStep(5);
        } finally {
          setLoad(false);
        }

    }
 
  return (
   <div className="w-full max-w-3xl flex flex-col justify-center gap-4 !mx-auto !mt-6 sm:!mt-8 lg:!mt-10 bg-white rounded-2xl border border-gray-200 shadow-sm !mb-8 sm:!mb-10 !p-4 sm:!p-6">
         <div className="text-2xl font-bold flex items-start sm:items-center w-full gap-3"> 
            <div className="text-primary !p-3 sm:!p-4 rounded-2xl bg-[#E9E7F7] shrink-0">
              <Shield size={24} />
            </div> 
            <div className='flex flex-col items-start'>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">Enter PIN</h2>
                <p className="text-sm text-gray-500">Enter your 4-digit PIN</p>
            </div>
            </div>
              <div className="bg-[#E7F7EA] shadow-sm text-sm flex items-start gap-2 text-black !px-4 sm:!px-6 !py-3 !mt-4 rounded-xl">
                <CircleAlert className="w-5 h-5 !mt-0.5" />
                <span>
                  <span className="font-bold">OTP Verified Successfully</span>{" "}
                  <br></br><p className='!mt-0.5'>Your mobile number has been verified. Enter your payment PIN to confirm the transaction.</p>
                </span>
              </div>

            <form className='flex flex-col gap-y-6 !px-0 sm:!px-2 !mt-4 !mb-4 sm:!mb-6' onSubmit={handleSubmit(handlepin)}>
              <div className='w-full !mx-auto'>

           <input type="text" placeholder="Enter your 4-digit PIN" {...register("pin", {required: "PIN is required",pattern: {value: /^\d{4}$/,message: "Enter a valid 4-digit PIN"
    }
  })}
  className="rounded-lg w-full bg-gray-100 border border-gray-300 !pl-3 !py-2.5"/>
       {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin.message}</p>}

          </div>
           <button type="submit" disabled={load} aria-busy={load} className="btn btn-primary w-full sm:w-[80%] !px-6 !py-3 !mx-auto">{load ? <RefreshCw className="animate-spin" /> : null}{load ? "Processing..." : "Proceed to Pay"}</button>

            </form>
            </div>

  )
}

export default Pin