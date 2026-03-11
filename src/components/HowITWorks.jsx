import React from 'react'
import { Calculator, FileText, UserRoundPlus, CreditCard } from 'lucide-react';

const HowITWorks = () => {
  const steps = [
    {
      icon: UserRoundPlus,
      title: "Register Account",
      description: "Create your account in minutes and start using NSTU TAXDESK right away.",
      step: 1
    },
    {
      icon: FileText,
      title: "Enter Taxable Amount",
      description: "Input your income or taxable transaction details.",
      step: 2
    },
    {
      icon: Calculator,
      title: "Automatic Tax Calculation",
      description: "System calculates tax and VAT automatically",
      step: 3
    },
    {
      icon: CreditCard,
      title: "Pay Online or Save",
      description: "Complete payment or save as pending for later",
      step: 4
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white !pt-12 !pb-8 !mt-12">
      <h3 className="text-3xl font-bold text-center mb-2">How It Works</h3>
      <p className="text-gray-600 text-lg text-center !px-2 !my-3">Simple steps to get started with NSTU TAXDESK</p>
      <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 !px-4 lg:!px-8 !pt-6">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="flex flex-col gap-4 items-center text-center !p-6 rounded-lg shadow-md group bg-white rounded-xl transition duration-500 hover:-translate-y-2 hover:shadow-xl relative">
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                {item.step}
              </div>
              <div className="text-primary !p-4 rounded-full bg-[#E9E7F7]">
                <Icon size={24} />
              </div>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default HowITWorks;
