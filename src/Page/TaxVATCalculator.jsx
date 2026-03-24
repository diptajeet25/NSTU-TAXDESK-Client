import { useQuery } from '@tanstack/react-query'
import { Calculator, CircleAlert, CircleCheckBig, CreditCard, RefreshCw, Save, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useForm, useWatch } from 'react-hook-form'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router'
import Loading from '../components/Loading'

const TaxVATCalculator = () => {
  const axiosSecure=useAxiosSecure();
  const {user,loading}=useContext(AuthContext);
  const navigate=useNavigate()
  const [calculatedResult,setCalculatedResult]=useState(null);
  const {register, handleSubmit,setValue,reset,control, formState: { errors }} = useForm({defaultValues: {
    category: "",
    name: "",
    baseAmount: "",
    vatRate: "",
    taxRate: ""
  }});
  const {data:taxes=[],isLoading}=useQuery(
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
  useEffect(()=>{
  if(seletedTax){
    setValue("vatRate", seletedTax.vatRate)
    setValue("taxRate", seletedTax.incomeTaxRate)
  }
},[seletedTax])
  const taxCalculator=(data)=>
  {
    console.log(data);
    const vatAmount=(data.baseAmount*parseInt(data.vatRate))/100;
    const taxAmount=(data.baseAmount*parseInt(data.taxRate))/100;
    const totalAmount=parseFloat(vatAmount+taxAmount);
    const calculatedResult={
      name:data.name,
      category:data.category,
      baseAmount:data.baseAmount,
      vatRate:data.vatRate,
      taxRate:data.taxRate,
      taxAmount:taxAmount,
      vatAmount:vatAmount,
      totalAmount:totalAmount
    }
    setCalculatedResult(calculatedResult);
    console.log(calculatedResult);
      }
    const resetFun=()=>{
        reset({
        category:"",
        name:"",
        baseAmount:"",

        vatRate:"",
        taxRate:""
      })
 setCalculatedResult(null);
    }


  const pendingPayments=async()=>
  {
    const pendingData={
      id:`TXN${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}${Math.floor(Math.random() * 10000)}`,
      name: calculatedResult.name,
      category: calculatedResult.category,
      baseAmount: calculatedResult.baseAmount,
      vatRate: calculatedResult.vatRate,
      taxRate: calculatedResult.taxRate,
      taxAmount: calculatedResult.taxAmount,
      vatAmount: calculatedResult.vatAmount,
      totalAmount: calculatedResult.totalAmount,
      status: "Pending",
      userEmail:user?.email,
      createdAt: new Date()
    }
  
 
   const res=await axiosSecure.post('/payments',pendingData)
    if(res.data.insertedId)
    {
     
  resetFun();
     
    }
    else{
      alert("Failed to save pending payment. Please try again.");
    }
  }
  const PaymentRedirect=async()=>
  {
   const pendingData={
      id:`TXN${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}${Math.floor(Math.random() * 10000)}`,
      name: calculatedResult.name,
      category: calculatedResult.category,
      baseAmount: calculatedResult.baseAmount,
      vatRate: calculatedResult.vatRate,
      taxRate: calculatedResult.taxRate,
      taxAmount: calculatedResult.taxAmount,
      vatAmount: calculatedResult.vatAmount,
      totalAmount: calculatedResult.totalAmount,
      status: "Pending",
      userEmail:user?.email,
      createdAt: new Date()
    }
    const res=await axiosSecure.post('/payments',pendingData)
    console.log(res);
    navigate(`/payment/${pendingData.id}`);

  
  }
  if(loading || isLoading)
  {
    return <Loading></Loading>
  }

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
            <form className="w-full flex flex-col gap-4 !mt-6 !px-2 lg:!px-6" onSubmit={handleSubmit(taxCalculator)}>
                     <div className='flex flex-col gap-1 items-start w-full '>
            <label className="font-bold !px-1">Category</label>
            <select {...register("category", { required: "Category is required" })} defaultValue="" className="rounded-lg w-full lg:w-[90%] bg-gray-200 border-black/10 !pl-2 !py-2">
                <option value="" className='text-black'  disabled>Select your Category</option>
                {uniqueCategories.map((category,i)=><option key={i} value={category}> {category.charAt(0).toUpperCase() + category.slice(1)}</option>)
                }
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
          <div className={`flex flex-col gap-1 items-start w-full ${selectedCategory ? 'block' : 'hidden'}`}>
            <label className="font-bold !px-1">Name</label>
            {selectedCategory==="others"?
             <input type="text" placeholder={`Enter the Service/Product Name`} {...register("name", { required: "Name is required" })} className="rounded-lg w-full lg:w-[90%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            :
            <select {...register("name", { required: "Name is required" })} defaultValue="" className="rounded-lg w-full lg:w-[90%] bg-gray-200 border-black/10 !pl-2 !py-2">
                <option value="" className='text-black' disabled>Select your {selectedCategory}</option>
                {filteredTaxes.map((tax,i)=><option key={i} value={tax.name}> {tax.name}</option>)
                }
            </select>
            }
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
                   <div className={`flex flex-col gap-1 items-start w-full ${selectedName ? 'block' : 'hidden'}`}>
            <label className="font-bold !px-1">Base Amount</label>
           
             <input type="number" placeholder={`Enter the Base Amount`} {...register("baseAmount", { required: "Base Amount is required" })} className="rounded-lg w-full lg:w-[90%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            
            {errors.baseAmount && <p className="text-red-500 text-sm">{errors.baseAmount.message}</p>}
        </div>
           <div className={`flex flex-col gap-1 items-start w-full ${selectedName ? 'block' : 'hidden'}`}>
            <label className="font-bold !px-1">VAT Rate</label>
            {selectedCategory==="others"?
             <input type="text" placeholder={`Enter the VAT Rate`} {...register("vatRate", { required: "VAT Rate is required" })} className="rounded-lg w-full lg:w-[90%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            :
            <input type="text" placeholder={`VAT Rate for ${selectedName || selectedCategory}`} {...register("vatRate")}  readOnly className="rounded-lg w-full lg:w-[90%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
}
            {errors.vatRate && <p className="text-red-500 text-sm">{errors.vatRate.message}</p>}
        </div>
             <div className={`flex flex-col gap-1 items-start w-full ${selectedName ? 'block' : 'hidden'}`}>
            <label className="font-bold !px-1">TAX Rate</label>
            {selectedCategory==="others"?
             <input type="text" placeholder={`Enter the TAX Rate`} {...register("taxRate", { required: "TAX Rate is required" })} className="rounded-lg w-full lg:w-[90%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
            :
            <input type="text" placeholder={`TAX Rate for ${selectedName || selectedCategory}`} {...register("taxRate")}  readOnly className="rounded-lg w-full lg:w-[90%] bg-gray-200 border-black/10 !pl-2 !py-2"></input>
}
            {errors.taxRate && <p className="text-red-500 text-sm">{errors.taxRate.message}</p>}
        </div>
         <div className='flex flex-row gap-4 items-center justify-center w-full lg:w-[80%] !mx-auto'>
                <button type='submit' className='btn btn-primary flex-grow-[3] '><Calculator  size={20} /> Calculate</button>
                <button type="button" onClick={resetFun} className='btn btn-outline btn-primary flex-grow-[1] '><RefreshCw size={20} /> Reset</button>
              </div>

              </form>
              
             
            </div>
             <div className="!mt-7 bg-white shadow-md rounded-xl !px-2 lg:!px-5 !mx-auto !py-5">
               <span className="text-2xl font-bold  flex items-center gap-2"> <div className="text-primary !p-4 rounded-2xl bg-[#E9E7F7]">
                
                <CircleCheckBig size={20} />
            </div> Calculation Result</span>
            {
              calculatedResult ? 
              <div className="flex flex-col !mx-4 lg:!mx-8 !py-6">

 
  <h3 className="text-sm text-gray-500">
    {calculatedResult.category.charAt(0).toUpperCase() + calculatedResult.category.slice(1)}
  </h3>

  <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 !mt-1">
    {calculatedResult.name}
  </h2>

  <hr className="border-gray-200 !my-5" />

  <div className="flex justify-between items-center shadow-sm !px-2 lg:!px-4 !py-3 rounded-lg">
    <span className="text-gray-600 font-medium">Base Amount</span>
    <span className="font-semibold text-gray-800">
      ৳ {new Intl.NumberFormat('en-BD').format(calculatedResult.baseAmount)}
    </span>
  </div>

  <div className="flex justify-between shadow-sm items-center bg-[#E9E7F7] !px-2 lg:!px-4 !py-3 rounded-lg !mt-3">
    <span className="text-gray-700 font-medium">
      TAX ({calculatedResult.taxRate}%)
    </span>

    <span className="font-semibold text-gray-900">
      ৳ {new Intl.NumberFormat('en-BD').format(calculatedResult.taxAmount)}
    </span>
  </div>

  <div className="flex justify-between shadow-sm items-center bg-[#E6F4EA] !px-2 lg:!px-4 !py-3 rounded-lg !mt-3">
    <span className="text-gray-700 font-medium">
      VAT ({calculatedResult.vatRate}%)
    </span>

    <span className="font-semibold text-gray-900">
      ৳ {new Intl.NumberFormat('en-BD').format(calculatedResult.vatAmount)}
    </span>
  </div>

  <div className="flex justify-between shadow-md items-center bg-primary text-white !px-2 lg:!px-5 !py-3 rounded-lg !mt-5 shadow-sm">
    <span className="font-semibold text-md lg:text-lg">
      Total Payable Amount
    </span>

    <span className="font-bold text-xl">
      ৳ {new Intl.NumberFormat('en-BD').format(calculatedResult.totalAmount)}
    </span>
  </div>
  <div className="flex flex-col gap-4 !mt-6">

 <button onClick={PaymentRedirect} className='w-full btn btn-primary !py-4 text-md text-bold'> <CreditCard  size={20} /> Proceed to Payment</button>
<div className="grid grid-cols-1 lg:grid-cols-2 !mt-0 lg:!mt-2 gap-4 lg:gap-6">
  <button onClick={pendingPayments} className='btn w-full btn-primary btn-outline !py-4 text-md text-bold'><Save size={20} />Save as Pending</button>
  <button onClick={resetFun} className='btn w-full  btn-outline !py-4 text-md text-bold'><X  size={20} />Cancle</button>
  </div>

  </div>

</div>

 :
            <div className='w-full flex flex-col !py-20 justify-center items-center gap-3'>
               <div className="!p-4 rounded-full opacity-80 bg-gray-200"><p> <Calculator  /> </p></div>
                            
                             <p className="text-gray-600 opacity-80">Enter the required details & click "Calculate" to see results</p>
                          
            </div>
}
              </div>
              <div className=" !mx-auto flex justify-center !mt-3">
  <div className="bg-white shadow-md text-sm flex items-start gap-2 text-black !px-4 !py-3 !mt-4 rounded-xl">
    <CircleAlert className="w-5 h-5 !mt-0.5" />
    <span>
      <span className="font-bold">Important Notice:</span>{" "}
    All tax and VAT rates applied in this system are based on the official regulations of the National Board of Revenue (NBR). Users are advised to review and confirm all information before proceeding with payment. </span>
  </div>
</div>
            
          </section>
    
  )
}

export default TaxVATCalculator