import { Smartphone } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import bkash from '../assets/Mobile Banking Logo/bkash.png'
import nagad from '../assets/Mobile Banking Logo/nagad.jpg'
import rocket from '../assets/Mobile Banking Logo/rocket.png'
import tap from '../assets/Mobile Banking Logo/tap.png'
import upay from '../assets/Mobile Banking Logo/upay.png'
import surecash from '../assets/Mobile Banking Logo/surecash.png'
import mcash from '../assets/Mobile Banking Logo/mcash.png'
import ucash from '../assets/Mobile Banking Logo/ucash.png'

const methods = [
  { name: 'Bkash', logo: bkash },
  { name: 'Nagad', logo: nagad },
  { name: 'Rocket', logo: rocket },
  { name: 'Tap', logo: tap },
  { name: 'Upay', logo: upay },
  { name: 'SureCash', logo: surecash },
  { name: 'Mcash', logo: mcash },
  { name: 'Ucash', logo: ucash }
]

const Mobile = ({ finalMethod, phone, setPhone, setStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const normalize = (v) => String(v ?? '').trim().toLowerCase()
  const selectedMethod = methods.find(
    (m) => normalize(m.name) === normalize(finalMethod)
  )

  const handlePhone = (data) => {
    setPhone(data.phone)
    setStep(3)
  }

  return (
    <div className="w-full flex flex-col justify-center  gap-4 lg:w-[70%] !mx-auto !mt-10 bg-white rounded-lg shadow-md !mb-10 !p-6">
      <span className="text-2xl font-bold flex items-center w-full  !mx-auto gap-2">
        <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
          <Smartphone size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold">Enter Mobile Number</h2>
          <p className="text-sm text-gray-500">Enter your 11 digit phone number</p>
        </div>
      </span>

      
        {selectedMethod ? (
          <div className=" bg-[#E9E7F7] rounded-md shadow-md flex items-center gap-2 w-full   !px-6 !mt-4 !py-3 ">
          <img
            src={selectedMethod.logo}
            alt={selectedMethod.name}
            className="w-12 h-12 object-contain rounded-lg"
          />
          <div className="ml-4 flex flex-col gap-0.5">
            <span className="text-gray-500 text-sm">Selected Method: </span>
            <span className="text-black text-lg font-bold">{selectedMethod.name}</span>

          </div>
          </div>
        )  : (
          <p className="text-xs text-red-500">Payment method not selected</p>
        )}
      

      <form
        className="flex flex-col gap-4 gap-y-6 !px-2 !mt-4 !mb-10"
        onSubmit={handleSubmit(handlePhone)}
      >
        <div className="w-full !mx-auto">
          <input
            type="text"
            placeholder="Enter your 11 digit phone Number"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: 'Enter a valid Bangladeshi number (01XXXXXXXXX)'
              }
            })}
            className="rounded-lg w-full bg-gray-200 border-black/10 !pl-2 !py-2"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-[80%] !px-6 !py-3 !mx-auto">
          Proceed to Pay
        </button>
      </form>
    </div>
  )
}

export default Mobile