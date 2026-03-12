import React from 'react'
import ForgetPassForm from '../components/ForgetPassForm'
import { CircleAlert } from 'lucide-react'

const ForgetPass = () => {
  return (
    <div>
        <ForgetPassForm></ForgetPassForm>
<div className="w-[80%] lg:w-[60%] !mx-auto flex justify-center !mt-3">
  <div className="bg-white shadow-md text-sm flex items-start gap-2 text-black !px-4 !py-3 !mt-4 rounded-xl">
    <CircleAlert className="w-5 h-5 !mt-0.5" />
    <span>
      <span className="font-bold">Security Notice:</span>{" "}
      For your account security, the verification link will expire in 24 hours.
      If expired, please request a new verification email.
    </span>
  </div>
</div>

    </div>
  )
}

export default ForgetPass