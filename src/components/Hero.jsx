import React from 'react'
import shahidMinar from '../assets/shahidMinar.jpg'
import { Link } from 'react-router';

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-b from-gray-100 to-white flex flex-col gap-8 lg:flex-row justify-center items-center !pt-20 !pb-10 !px-4 lg:!px-14">
        <div className="flex-1 p-6 gap-3 flex flex-col justify-center items-start">
            <h1 className="text-5xl font-bold leading-tight">NSTU TAXDESK</h1>
            <p className="text-gray-600 text-lg mt-4  max-w-full">A secure and efficient online platform for teachers, officers, and staff of Noakhali Science and Technology University to calculate and pay tax and VAT with ease.</p>
          <div className="flex gap-5 !mt-3">
  <Link to="/get-started" className="btn btn-primary !px-6">Get Started</Link>
  <Link to="/learn-more" className="btn btn-outline btn-primary !px-6">Learn More</Link>
</div>
            </div>
            <div className="flex-1">
                <img src={shahidMinar} alt="NSTU TAXDESK" className=' w-full lg:h-80 rounded-2xl shadow-xl' />
            </div>

    </div>
  )
}

export default Hero;