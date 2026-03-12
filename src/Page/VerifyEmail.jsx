import React from 'react'
import AuthNavbar from '../components/AuthNavbar';
import { AuthFooter } from '../components/AuthFooter';
import VerifyUser from '../components/VerifyUser';
import { CircleAlert } from 'lucide-react';

export const VerifyEmail = () => {
  return (
    <div>
        <AuthNavbar></AuthNavbar>
        <VerifyUser></VerifyUser>
         <div className="w-[80%] lg:w-[60%] !mx-auto flex justify-center !mt-3">
  <p className="bg-white shadow-md text-sm flex items-start gap-2 text-black !px-4 !py-3 !mt-4 rounded-xl">
    <CircleAlert className="w-5 h-5 mt-0.5" />
    <span>
      <span className="font-bold">Security Notice:</span>{" "}
      For your account security, the verification link will expire in 24 hours.
      If expired, please request a new verification email.
    </span>
  </p>
</div>
        <AuthFooter></AuthFooter>
    </div>
  )
}
