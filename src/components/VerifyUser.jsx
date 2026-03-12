import { sendEmailVerification } from 'firebase/auth'
import { ArrowLeft, CircleAlert, Mail, RefreshCcw } from 'lucide-react'
import React, { useEffect } from 'react'
import { auth } from '../Firebase/firebase.init'
import { useNavigate } from 'react-router';

const VerifyUser = () => {
    const navigate=useNavigate();
    const resendVerificationEmail= async()=>
    {
        await sendEmailVerification(auth.currentUser,{
                        url:`${window.location.origin}/dashboard`,
                        handleCodeInApp:false
                    }
                    );
                    alert("Verification email resent! Please check your inbox.");
    }
    useEffect(() => {
  const interval = setInterval(async () => {
    await auth.currentUser.reload();

    if (auth.currentUser.emailVerified) { 
      navigate("/dashboard");
    }
  }, 1000);

  return () => clearInterval(interval);
}, []);
  return (
    <div className='flex flex-col justify-center items-center gap-3 bg-white shadow-md w-[90%] lg:w-[60%] !mx-auto !py-4 !px-4 rounded-xl !mt-14 lg:!mb-4 '>
        <div className="text-primary rounded-full w-[22%] lg:w-[10%] flex justify-center !mx-auto !p-4  bg-[#E9E7F7]">
            <Mail size={40}/>
            </div>
        <h1 className="text-2xl font-bold ">Verify Your Email</h1>
        <p className="text-gray-600 text-center">A verification email has been sent to your email address. Please check your inbox and click the verification link to activate your account.</p>
         <div className='w-full flex items-center justify-center !my-1'>
                <p className="bg-[#E9E7F7]  text-center text-sm flex gap-1 text-primary !px-4 !mt-4 !py-3 rounded-xl"> <CircleAlert /> If you don't see the email, please check your spam folder or junk mail.</p>
                </div>
                <div className='w-full flex flex-col gap-4 items-center justify-center !my-2'>
                    <button className="btn btn-primary w-[90%] lg:!w-[50%] rounded-xl" onClick={resendVerificationEmail}><RefreshCcw />Resend Verification Email</button>
                    <button className="btn btn-outline btn-primary w-[90%] lg:!w-[50%] !px-4 !py-3 rounded-xl" onClick={() => navigate("/login")}>
                        <ArrowLeft /> Back To Login
                    </button>
                </div>
            </div>
  )
}

export default VerifyUser