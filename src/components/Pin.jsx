import { CircleAlert, Shield } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Pin = ({finalMethod, phone, paymentData, setStep}) => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const axiosSecure=useAxiosSecure();
    const handlepin=async(data)=>
    {
        console.log(data.pin);
        const paymentInfo={
            status:"Paid",
            method:finalMethod,
            phone:phone,
            paidAt:new Date(),

        }
        const res=await axiosSecure.patch(`/payment?id=${paymentData.id}`,paymentInfo)
        console.log(res.data);
       

        setStep(5);

    }
 
  return (
   <div className="w-full flex flex-col justify-center gap-4 w-full lg:w-[70%] !mx-auto !mt-10 bg-white rounded-lg shadow-md !mb-10 !p-6">
         <span className="text-2xl font-bold  flex items-center w-full     !mx-auto gap-2"> 
            <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
              <Shield size={24} />
            </div> 
            <div className='flex flex-col items-start'>
                <h2 className="text-2xl font-bold">Enter PIN</h2>
                <p className="text-sm text-gray-500">Enter your 4-digit PIN</p>
            </div>
            </span>
              <div className="bg-[#E7F7EA] shadow-md text-sm flex items-start gap-2 text-black !px-6 !py-3 !mt-4  rounded-xl">
                <CircleAlert className="w-5 h-5 !mt-0.5" />
                <span>
                  <span className="font-bold">OTP Verified Successfully</span>{" "}
                  <br></br><p className='!mt-0.5'>Your mobile number has been verified. Enter your payment PIN to confirm the transaction.</p>
                </span>
              </div>

            <form className='flex flex-col gap-4 gap-y-6 !px-6 !mt-4 !mb-10' onSubmit={handleSubmit(handlepin)}>
              <div className='w-full !mx-auto'>

           <input type="text" placeholder="Enter your 4-digit PIN" {...register("pin", {required: "PIN is required",pattern: {value: /^\d{4}$/,message: "Enter a valid 4-digit PIN"
    }
  })}
  className="rounded-lg w-full  bg-gray-200 border-black/10 !pl-2 !py-2"/>
       {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin.message}</p>}

          </div>
           <button type="submit" className={`btn btn-primary w-[80%] !px-6 !py-3 !mx-auto `}>Proceed to Pay</button>

            </form>
            </div>

  )
}

export default Pin