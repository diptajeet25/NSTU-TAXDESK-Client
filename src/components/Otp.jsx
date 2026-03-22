import { CircleAlert, Shield } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';

const Otp = ({phone,setStep}) => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    
    const handleotp=(data)=>
    {
       setStep(4);
       
    }
  return (
 <div className="w-full flex flex-col justify-center gap-4 w-full lg:w-[70%] !mx-auto !mt-10 bg-white rounded-lg shadow-md !mb-10 !p-6">
         <span className="text-2xl font-bold  flex items-center w-full     !mx-auto gap-2"> 
            <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
              <Shield size={24} />
            </div> 
            <div className='flex flex-col items-start'>
                <h2 className="text-2xl font-bold">Enter OTP</h2>
                <p className="text-sm text-gray-500">Enter the 6-digit OTP sent to your phone</p>
            </div>
            </span>
              <div className="bg-[#E9E7F7] shadow-md text-sm flex items-start gap-2 text-black !px-6 !py-3 !mt-4  rounded-xl">
                <CircleAlert className="w-5 h-5 !mt-0.5" />
                <span>
                  <span className="font-bold">OTP Sent Successfully:</span>{" "}
                  <br></br><p className='!mt-0.5'>An OTP has been sent to your mobile number {phone}. Please enter the code below.</p>
                </span>
              </div>

            <form className='flex flex-col gap-4 gap-y-6 !px-6 !mt-4 !mb-10' onSubmit={handleSubmit(handleotp)}>
              <div className='w-full !mx-auto'>

           <input type="text" placeholder="Enter your 6-digit OTP" {...register("otp", {required: "OTP is required",pattern: {value: /^\d{6}$/,message: "Enter a valid 6-digit OTP"
    }
  })}
  className="rounded-lg w-full  bg-gray-200 border-black/10 !pl-2 !py-2"/>
       {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}

          </div>
           <button type="submit" className={`btn btn-primary w-[80%] !px-6 !py-3 !mx-auto `}>Proceed to Pay</button>

            </form>
            </div>



       
  )
}

export default Otp