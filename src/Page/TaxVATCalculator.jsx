import { useQuery } from '@tanstack/react-query'
import { Calculator, RefreshCw } from 'lucide-react'
import React from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useForm, useWatch } from 'react-hook-form'

const TaxVATCalculator = () => {
  const axiosSecure=useAxiosSecure();
  const {register, handleSubmit,getValues,control, formState: { errors }} = useForm();
  const {data:taxes=[],refetch}=useQuery(
    {
      queryKey:['taxes'],
      queryFn:async()=>
      {
        const res=await axiosSecure.get('/taxvatrates');
        return res.data;
      }
    }
  )

  const category=taxes.map(tax=>tax.category);

  const uniqueCategories=[...new Set(category)];
  uniqueCategories.push("others");
  const selectedCategory=useWatch({control,name:"category"});
  const filteredTaxes=taxes.filter(tax=>tax.category===selectedCategory);
  const selectedName=useWatch({control,name:"name"});
  const seletedTax=filteredTaxes.find(tax=>tax.name===selectedName);

  return (
     <section className="flex-1 h-full bg-gray-50 !px-4 lg:!px-7 !py-5 lg:!py-7 overflow-auto hide-scrollbar border-l border-gray-200">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Tax & VAT Calculator</h1>
            <p className="text-gray-600 text:md lg:text-xl !mt-2 max-w-3xl">
              Enter the service type and base amount to calculate tax and VAT automatically.
            </p>
            <div className="!mt-7 bg-white shadow-md rounded-xl !px-5 !mx-auto !py-5">
              <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                <Calculator size={22} />
            </div> Tax Calculator</span>
            <form className="w-full flex flex-col gap-4 !mt-6 !px-2 lg:!px-6" >
                     <div className='flex flex-col gap-1 items-start w-full '>
            <label className="font-bold !px-1">Category</label>
            <select {...register("category", { required: "Category is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2">
                <option value="" className='text-black' disabled>Select your Category</option>
                {uniqueCategories.map((category,i)=><option key={i} value={category}> {category.charAt(0).toUpperCase() + category.slice(1)}</option>)
                }
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
          <div className={`flex flex-col gap-1 items-start w-full ${selectedCategory ? 'block' : 'hidden'}`}>
            <label className="font-bold !px-1">Name</label>
            {selectedCategory==="others"?
             <input type="text" placeholder={`Enter the Service/Product Name`} {...register("name", { required: "Name is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            :
            <select {...register("name", { required: "Name is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2">
                <option value="" className='text-black' disabled>Select your {selectedCategory}</option>
                {filteredTaxes.map((tax,i)=><option key={i} value={tax.name}> {tax.name}</option>)
                }
            </select>
            }
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
                   <div className={`flex flex-col gap-1 items-start w-full ${selectedName ? 'block' : 'hidden'}`}>
            <label className="font-bold !px-1">Base Amount</label>
           
             <input type="number" placeholder={`Enter the Base Amount`} {...register("baseAmount", { required: "Base Amount is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            
            {errors.baseAmount && <p className="text-red-500 text-sm">{errors.baseAmount.message}</p>}
        </div>
           <div className={`flex flex-col gap-1 items-start w-full ${selectedName ? 'block' : 'hidden'}`}>
            <label className="font-bold !px-1">VAT Rate</label>
            {selectedCategory==="others"?
             <input type="text" placeholder={`Enter the VAT Rate`} {...register("vatRate", { required: "VAT Rate is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            :
            <input type="text" placeholder={`VAT Rate for ${selectedName || selectedCategory}`} value={seletedTax?.vatRate || ""} readOnly className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
}
            {errors.vatRate && <p className="text-red-500 text-sm">{errors.vatRate.message}</p>}
        </div>
             <div className={`flex flex-col gap-1 items-start w-full ${selectedName ? 'block' : 'hidden'}`}>
            <label className="font-bold !px-1">TAX Rate</label>
            {selectedCategory==="others"?
             <input type="text" placeholder={`Enter the TAX Rate`} {...register("taxRate", { required: "TAX Rate is required" })} className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            :
            <input type="text" placeholder={`TAX Rate for ${selectedName || selectedCategory}`} value={seletedTax?.incomeTaxRate || ""} readOnly className="rounded-lg w-[95%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
}
            {errors.taxRate && <p className="text-red-500 text-sm">{errors.taxRate.message}</p>}
        </div>
         <div className='flex flex-row gap-4 items-center justify-center w-[80%] !mx-auto'>
                <button type='submit' className='btn btn-primary flex-grow-[3] '><Calculator  size={20} /> Calculate</button>
                <button type='reset' className='btn btn-outline btn-primary flex-grow-[1] '><RefreshCw size={20} /> Reset</button>
              </div>

              </form>
             
            </div>
            
          </section>
    
  )
}

export default TaxVATCalculator