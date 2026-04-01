import { CircleAlert, Shield } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';

const Otp = ({phone,setStep}) => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    
    const handleotp=()=>
    {
       setStep(4);
       
    }
  return (
 <div className="w-full max-w-3xl flex flex-col justify-center gap-4 !mx-auto !mt-6 sm:!mt-8 lg:!mt-10 bg-white rounded-2xl border border-gray-200 shadow-sm !mb-8 sm:!mb-10 !p-4 sm:!p-6">
         <div className="text-2xl font-bold flex items-start sm:items-center w-full gap-3"> 
            <div className="text-primary !p-3 sm:!p-4 rounded-2xl bg-[#E9E7F7] shrink-0">
              <Shield size={24} />
            </div> 
            <div className='flex flex-col items-start'>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">Enter OTP</h2>
                <p className="text-sm text-gray-500">Enter the 6-digit OTP sent to your phone</p>
            </div>
            </div>
              <div className="bg-[#E9E7F7] shadow-sm text-sm flex items-start gap-2 text-black !px-4 sm:!px-6 !py-3 !mt-4 rounded-xl">
                <CircleAlert className="w-5 h-5 !mt-0.5" />
                <span>
                  <span className="font-bold">OTP Sent Successfully:</span>{" "}
                  <br></br><p className='!mt-0.5'>An OTP has been sent to your mobile number {phone}. Please enter the code below.</p>
                </span>
              </div>

            <form className='flex flex-col gap-y-6 !px-0 sm:!px-2 !mt-4 !mb-4 sm:!mb-6' onSubmit={handleSubmit(handleotp)}>
              <div className='w-full !mx-auto'>

           <input type="text" placeholder="Enter your 6-digit OTP" {...register("otp", {required: "OTP is required",pattern: {value: /^\d{6}$/,message: "Enter a valid 6-digit OTP"
    }
  })}
  className="rounded-lg w-full bg-gray-100 border border-gray-300 !pl-3 !py-2.5"/>
       {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}

          </div>
           <button type="submit" className="btn btn-primary w-full sm:w-[80%] !px-6 !py-3 !mx-auto">Proceed to Pay</button>

            </form>
            </div>



       
  )
}

export default Otp