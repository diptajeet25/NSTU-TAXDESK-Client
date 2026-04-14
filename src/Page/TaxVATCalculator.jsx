import { useQuery } from '@tanstack/react-query'
import { Calculator, CircleAlert, CircleCheckBig, CreditCard, RefreshCw, Save, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure'
import { useForm, useWatch } from 'react-hook-form'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'

const TaxVATCalculator = () => {
  const axiosSecure=useAxiosSecure();
  const {user,loading}=useContext(AuthContext);
  const [load,setLoad]=useState(false);
  const [isSavingPending,setIsSavingPending]=useState(false);
  const [isProceedingToPayment,setIsProceedingToPayment]=useState(false);
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
  },[seletedTax, setValue])
  const taxCalculator=async(data)=>
  {
    setLoad(true);
    try {
      await axiosSecure.patch(`/updateCalculationCount?email=${user?.email}`)

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
    } finally {
      setLoad(false);
    }
  
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
    if (isSavingPending || isProceedingToPayment) return;
    setIsSavingPending(true);
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

    try {
      const res=await axiosSecure.post('/payments',pendingData)
      if(res.data.insertedId)
      {
        toast.success("Saved as pending successfully.");
        resetFun();
      }
      else{
        toast.error("Failed to save pending payment. Please try again.");
      }
    } catch {
      toast.error("Failed to save pending payment. Please try again.");
    } finally {
      setIsSavingPending(false);
    }
  }
  const PaymentRedirect=async()=>
  {
   if (isSavingPending || isProceedingToPayment) return;
   setIsProceedingToPayment(true);
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
    try {
      await axiosSecure.post('/payments',pendingData)
      navigate(`/payment/${pendingData.id}`);
    } finally {
      setIsProceedingToPayment(false);
    }

  
  }
  if(loading || isLoading)
  {
    return <Loading></Loading>
  }

  return (
    <section className="flex-1 min-w-0 h-full bg-gray-50 !px-4 sm:!px-5 lg:!px-7 !py-5 lg:!py-7 overflow-auto hide-scrollbar border-l border-gray-200">
      <div className="w-full max-w-7xl !mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Tax & VAT Calculator</h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-xl !mt-2 max-w-3xl">
          Enter the service type and base amount to calculate tax and VAT automatically.
        </p>

        <div className="!mt-7 bg-white shadow-sm border border-gray-200 rounded-2xl !px-4 sm:!px-5 !py-5">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className="text-primary !p-3 rounded-2xl bg-[#E9E7F7]">
              <Calculator size={22} />
            </span>
            Tax Calculator
          </h2>

          <form className="w-full max-w-4xl flex flex-col gap-4 !mt-6" onSubmit={handleSubmit(taxCalculator)}>
            <div className="flex flex-col gap-1 items-start w-full">
              <label className="font-bold">Category</label>
              <select {...register("category", { required: "Category is required" })} defaultValue="" className="rounded-lg w-full bg-gray-100 border border-gray-300 !px-3 !py-2.5">
                <option value="" className="text-black" disabled>Select your Category</option>
                {uniqueCategories.map((category, i) => <option key={i} value={category}> {category.charAt(0).toUpperCase() + category.slice(1)}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            <div className={`flex flex-col gap-1 items-start w-full ${selectedCategory ? 'block' : 'hidden'}`}>
              <label className="font-bold">Name</label>
              {selectedCategory === "others" ?
                <input type="text" placeholder="Enter the Service/Product Name" {...register("name", { required: "Name is required" })} className="rounded-lg w-full bg-gray-100 border border-gray-300 !px-3 !py-2.5" />
                :
                <select {...register("name", { required: "Name is required" })} defaultValue="" className="rounded-lg w-full bg-gray-100 border border-gray-300 !px-3 !py-2.5">
                  <option value="" className="text-black" disabled>Select your {selectedCategory}</option>
                  {filteredTaxes.map((tax, i) => <option key={i} value={tax.name}> {tax.name}</option>)}
                </select>
              }
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className={`flex flex-col gap-1 items-start w-full ${selectedName ? 'block' : 'hidden'}`}>
              <label className="font-bold">Base Amount</label>
              <input type="number" placeholder="Enter the Base Amount" {...register("baseAmount", { required: "Base Amount is required" })} className="rounded-lg w-full bg-gray-100 border border-gray-300 !px-3 !py-2.5" />
              {errors.baseAmount && <p className="text-red-500 text-sm">{errors.baseAmount.message}</p>}
            </div>

            <div className={`flex flex-col gap-1 items-start w-full ${selectedName ? 'block' : 'hidden'}`}>
              <label className="font-bold">VAT Rate</label>
              {selectedCategory === "others" ?
                <input type="text" placeholder="Enter the VAT Rate" {...register("vatRate", { required: "VAT Rate is required" })} className="rounded-lg w-full bg-gray-100 border border-gray-300 !px-3 !py-2.5" />
                :
                <input type="text" placeholder={`VAT Rate for ${selectedName || selectedCategory}`} {...register("vatRate")} readOnly className="rounded-lg w-full bg-gray-100 border border-gray-300 !px-3 !py-2.5" />
              }
              {errors.vatRate && <p className="text-red-500 text-sm">{errors.vatRate.message}</p>}
            </div>

            <div className={`flex flex-col gap-1 items-start w-full ${selectedName ? 'block' : 'hidden'}`}>
              <label className="font-bold">TAX Rate</label>
              {selectedCategory === "others" ?
                <input type="text" placeholder="Enter the TAX Rate" {...register("taxRate", { required: "TAX Rate is required" })} className="rounded-lg w-full bg-gray-100 border border-gray-300 !px-3 !py-2.5" />
                :
                <input type="text" placeholder={`TAX Rate for ${selectedName || selectedCategory}`} {...register("taxRate")} readOnly className="rounded-lg w-full bg-gray-100 border border-gray-300 !px-3 !py-2.5" />
              }
              {errors.taxRate && <p className="text-red-500 text-sm">{errors.taxRate.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full !pt-2">
              <button type="submit" disabled={load} className="btn btn-primary sm:flex-1" aria-busy={load}>
                {load ? <RefreshCw size={20} className="animate-spin" /> : <Calculator size={20} />}
                {load ? "Calculating..." : "Calculate"}
              </button>
              <button type="button" onClick={resetFun} className="btn btn-outline btn-primary sm:w-36"><RefreshCw size={20} /> Reset</button>
            </div>
          </form>
        </div>

        <div className="!mt-7 bg-white shadow-sm border border-gray-200 rounded-2xl !px-4 sm:!px-5 !py-5">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className="text-primary !p-3 rounded-2xl bg-[#E9E7F7]">
              <CircleCheckBig size={20} />
            </span>
            Calculation Result
          </h2>

          {calculatedResult ?
            <div className="flex flex-col !py-6 !px-1 sm:!px-2 lg:!px-4">
              <h3 className="text-sm text-gray-500">{calculatedResult.category.charAt(0).toUpperCase() + calculatedResult.category.slice(1)}</h3>
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 !mt-1">{calculatedResult.name}</h2>

              <hr className="border-gray-200 !my-5" />

              <div className="flex justify-between items-center shadow-sm !px-3 sm:!px-4 !py-3 rounded-lg">
                <span className="text-gray-600 font-medium">Base Amount</span>
                <span className="font-semibold text-gray-800">৳ {new Intl.NumberFormat('en-BD').format(calculatedResult.baseAmount)}</span>
              </div>

              <div className="flex justify-between shadow-sm items-center bg-[#E9E7F7] !px-3 sm:!px-4 !py-3 rounded-lg !mt-3">
                <span className="text-gray-700 font-medium">TAX ({calculatedResult.taxRate}%)</span>
                <span className="font-semibold text-gray-900">৳ {new Intl.NumberFormat('en-BD').format(calculatedResult.taxAmount)}</span>
              </div>

              <div className="flex justify-between shadow-sm items-center bg-[#E6F4EA] !px-3 sm:!px-4 !py-3 rounded-lg !mt-3">
                <span className="text-gray-700 font-medium">VAT ({calculatedResult.vatRate}%)</span>
                <span className="font-semibold text-gray-900">৳ {new Intl.NumberFormat('en-BD').format(calculatedResult.vatAmount)}</span>
              </div>

              <div className="flex justify-between items-center bg-primary text-white !px-3 sm:!px-5 !py-3 rounded-lg !mt-5 shadow-sm">
                <span className="font-semibold text-sm sm:text-base lg:text-lg">Total Payable Amount</span>
                <span className="font-bold text-lg sm:text-xl">৳ {new Intl.NumberFormat('en-BD').format(calculatedResult.totalAmount)}</span>
              </div>

              <div className="flex flex-col gap-4 !mt-6">
                <button onClick={PaymentRedirect} disabled={isProceedingToPayment || isSavingPending} className="w-full btn btn-primary !py-4 text-md font-bold" aria-busy={isProceedingToPayment}>
                  {isProceedingToPayment ? <RefreshCw size={20} className="animate-spin" /> : <CreditCard size={20} />}
                  {isProceedingToPayment ? "Processing..." : "Proceed to Payment"}
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={pendingPayments} disabled={isSavingPending || isProceedingToPayment} className="btn w-full btn-primary btn-outline !py-4 text-md font-bold" aria-busy={isSavingPending}>
                    {isSavingPending ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
                    {isSavingPending ? "Saving..." : "Save as Pending"}
                  </button>
                  <button onClick={resetFun} disabled={isSavingPending || isProceedingToPayment} className="btn w-full btn-outline !py-4 text-md font-bold"><X size={20} />Cancel</button>
                </div>
              </div>
            </div>
            :
            <div className="w-full flex flex-col !py-20 justify-center items-center gap-3 text-center">
              <div className="!p-4 rounded-full opacity-80 bg-gray-200"><Calculator /></div>
              <p className="text-gray-600 opacity-80">Enter the required details and click "Calculate" to see results</p>
            </div>
          }
        </div>

        <div className="!mx-auto !mt-3">
          <div className="bg-white shadow-sm border border-gray-200 text-sm flex items-start gap-2 text-black !px-4 !py-3 !mt-4 rounded-xl">
            <CircleAlert className="w-5 h-5 !mt-0.5 shrink-0" />
            <span>
              <span className="font-bold">Important Notice:</span>{" "}
              All tax and VAT rates applied in this system are based on the official regulations of the National Board of Revenue (NBR). Users are advised to review and confirm all information before proceeding with payment.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TaxVATCalculator