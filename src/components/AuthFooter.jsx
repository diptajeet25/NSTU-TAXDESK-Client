import React from 'react'
import { Link } from 'react-router'

export const AuthFooter = () => {
  return (
    <div className='!mt-16 !pb-2'> 
        <div className="flex justify-center items-center gap-4 ">
            
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300">Back to Home</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300 ml-4">Contact Support</Link>
        </div>
        <footer className="footer sm:footer-horizontal footer-center !text-xs lg:text-md  text-gray-600 !py-3 !pt-4">
  <aside>
    <p>© {new Date().getFullYear()} - NSTU Tax & VAT Payment System. All rights reserved.</p>
  </aside>
</footer>
    </div>
  )
}
