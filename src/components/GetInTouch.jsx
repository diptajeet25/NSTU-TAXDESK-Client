import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import ContactForm from './ContactForm'

const GetInTouch = () => {
    const contacts=[
        {
            icon : <Mail />,
            heading : "Email",
            value: "tax@nstu.edu.bd"
        },
        {
            icon : <Phone />,
            heading : "Phone",
            value: "+880 1234 567890"
        },
        {
            icon : <MapPin />,
            heading : "Address",
            value: "Noakhali Science and Technology University, Noakhali-3814, Bangladesh"
        }
    ]
  return (
     <div className="w-full bg-gradient-to-b from-gray-50 to-white !pt-12 !pb-8 !mt-12">
         <h3 className="text-3xl font-bold text-center mb-2">Get In Touch</h3>
          <p className="text-gray-600 text-lg text-center !my-3">Have questions? We're here to help you with the NSTU Tax & VAT Payment System</p>
          <div className="w-full mt-10 grid grid-cols-1  lg:grid-cols-2 gap-14 !px-8 !pt-6">
            <div >
<h3 className="text-xl font-bold  !mb-2">Contact Information</h3>
<p className="text-gray-600 text-md ">Reach out to us for any queries regarding tax calculations, payment issues, or technical support.</p>
 <div className="w-full flex flex-col gap-4 !mt-6">
 {
    contacts.map((contact,i)=>
        <div className="flex gap-4 items-center !p-6  rounded-lg shadow-md group bg-white rounded-xl transition duration-500 hover:-translate-y-2 hover:shadow-xl">
            <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
            {contact.icon}
            </div>
            <div className="col-span-2">
                 <h4 className="text-xl font-semibold">{contact.heading}</h4>
                 <p className="text-gray-600">{contact.value}</p>
            </div>
        </div>
    )
 }
 </div>

            </div>
                <div>
                    <ContactForm></ContactForm>
                   

          </div>


        </div>
        </div>
  )
}

export default GetInTouch