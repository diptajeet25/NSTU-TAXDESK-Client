import { Facebook, Linkedin, Mail, Twitter } from 'lucide-react';
import React from 'react';


const Footer = () => {
  return (
    <div className="bg-[#0b0f1a] text-slate-400 !pt-12 !pb-2 !mt-12 ">
   
        <div className="w-full grid grid-cols-4 gap-4  justify-between items-start !px-8 !pb-6">
            <div className="flex flex-col gap-2 items-start">
                <h4 className="text-xl font-bold text-white">NSTU TAXDESK</h4>
                <p className="text-sm">A secure and efficient platform for tax and VAT management at Noakhali Science and Technology University.</p>
                <div className="flex gap-2 mt-2">
                    <div className="text-white !p-2 rounded-full backdrop-blur-sm border border-slate-700 hover:bg-slate-800 transition-colors"><Facebook /></div>
                    <div className="text-white !p-2 rounded-full backdrop-blur-sm border border-slate-700 hover:bg-slate-800 transition-colors"><Twitter /></div>
                    
                    <div className="text-white !p-2 rounded-full backdrop-blur-sm border border-slate-700 hover:bg-slate-800 transition-colors"><Linkedin /></div>
                      <div className="text-white !p-2 rounded-full backdrop-blur-sm border border-slate-700 hover:bg-slate-800 transition-colors"><Mail /></div>
                    </div>
            </div>

            <div className="w-full flex flex-col  gap-3  items-center justify-start  ">
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="flex flex-col gap-1 justify-center items-center">
                <li>Home</li>
                <li>Features</li>
                <li>How it Works</li>
                <li>About</li>
                </ul>

        </div>
         <div className="w-full flex flex-col  gap-3  items-center justify-start  ">
            <h4 className="text-lg font-bold text-white">Support</h4>
            <ul className="flex flex-col gap-1 justify-center items-center">
                <li>Help Center</li>
                <li>FAQs</li>
                <li>Contact Support</li>
                <li>Documentation</li>
                </ul>

        </div>
             <div className="w-full flex flex-col  gap-3  items-center justify-start  ">
            <h4 className="text-lg font-bold text-white">Legal</h4>
            <ul className="flex flex-col gap-1 justify-center items-center">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Disclaimer</li>
                
                </ul>
        </div>            
        </div>
        <hr className='bg-white h-[1px] w-full'></hr>

        <footer className="footer sm:footer-horizontal footer-center   text-white !py-3 !pt-4">
  <aside>
    <p>© {new Date().getFullYear()} - NSTU Tax & VAT Payment System. All rights reserved.</p>
  </aside>
</footer>
             
   
   </div>
  );
};

export default Footer;
