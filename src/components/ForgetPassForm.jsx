import { sendPasswordResetEmail } from 'firebase/auth';
import { CircleAlert, Lock, RefreshCw, Send } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router';
import { auth } from '../Firebase/firebase.init';
import toast from 'react-hot-toast';

const ForgetPassForm = () => {
     const { register, handleSubmit,getValues, formState: { errors }} = useForm();
     const [load,setLoad]=useState(false);
     const handleResetPass=async(data)=>
     {
      setLoad(true);
      const email=data.email;
      try {
        await sendPasswordResetEmail(auth,email,{
          url:`${window.location.origin}/auth/login`,
          handleCodeInApp:false
        })
        toast.success("Password reset email sent. Please check your inbox.");
      } catch (error) {
        console.error("Error sending password reset email", error);
        toast.error("Unable to send password reset email. Please try again.");
      } finally {
        setLoad(false);
      }
     }
     
  return (
    <form onSubmit={handleSubmit(handleResetPass)} className='flex flex-col justify-center items-center gap-3 bg-white shadow-md w-[90%] lg:w-[60%] !mx-auto !py-4 !px-4 rounded-xl !mt-14 lg:!mb-4 '>
    
        <div className="text-primary rounded-full w-[22%] lg:w-[10%] flex justify-center !mx-auto !p-4  bg-[#E9E7F7]">
            <Lock size={40}/>
            </div>
    <h1 className="text-2xl font-bold ">Reset Your Password</h1>
        <p className="text-gray-600 text-center">Enter your registered email address and we will send you a password reset link.</p>
                    <div className='flex  flex-col gap-2 items-start w-[95%] !mx-auto !mt-6 '>
            <label className="font-bold !px-1">Email</label>
            <input type="text" placeholder="Enter your Email Address" {...register("email", { required: "Email is required" })} className="rounded-lg w-full bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
      <button disabled={load} aria-busy={load} className="btn btn-primary w-[95%] lg:!w-[95%]  !mt-3 rounded-xl" >{load ? <RefreshCw className="animate-spin" /> : <Send />}{load ? "Sending..." : "Send Reset Link"}</button>
       <div className='w-full flex items-center justify-center !my-1'>
        <p className="bg-[#E9E7F7]  text-center text-sm flex gap-1 text-primary !px-4 !mt-2 !py-3 rounded-xl">You will receive an email with instructions to reset your password.</p>
        </div>
          <span className="text-sm text-gray-600 text-center">Remember your password? <Link to="/auth/login" className="text-primary font-bold">Back to Login</Link></span>

                    
       
        
    </form>
  )
}

export default ForgetPassForm