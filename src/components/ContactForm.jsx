import { Send } from 'lucide-react';
import React from 'react'

const ContactForm = () => {
  return (
    <form className='flex flex-col items-center bg-white rounded-lg shadow-md !py-6 gap-4'>
        <div className='flex flex-col gap-1 items-start w-full !px-4 lg:!px-12'>
            <label className="font-bold">Name</label>
            <input type="text" placeholder="Enter Your Full Name " className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
        </div>
        <div className='flex flex-col gap-1 items-start w-full !px-4 lg:!px-12'>
            <label className="font-bold">Email</label>
            <input type="text" placeholder="Enter your Email Address" className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
        </div>
        <div className='flex flex-col gap-1 items-start w-full !px-4 lg:!px-12'>
            <label className="font-bold">Subject</label>
            <input type="text" placeholder="What is the regarding?" className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
        </div>
        <div className='flex flex-col gap-1 items-start w-full !px-4 lg:!px-12'>
            <label className="font-bold">Message</label>
            <input type="text" placeholder="Write your message here..." className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !pt-2 !pb-9 "></input>
        </div>
        <button type='submit' className="btn btn-primary !py-1 !w-[80%] mx-auto !mt-4 " >Send Message  <Send /></button>

    </form>
  )
}

export default ContactForm;