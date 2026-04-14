import React, { useContext, useState } from 'react'
import { useParams } from 'react-router';
import Navbar from '../components/Navbar';
import PaymentMethod from '../components/PaymentMethod';
import Mobile from '../components/Mobile';
import Otp from '../components/Otp';
import Pin from '../components/Pin';
import Success from '../components/Success';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';
import Loading from '../components/Loading';

const PaymentPage = () => {
    const {paymentId} = useParams();
    const axiosSecure=useAxiosSecure();
    const {user,loading}=useContext(AuthContext);
    
    const [finalMethod,setFinalMethod]=useState("");
    const [step,setStep]=useState(1);
    const [phone,setPhone]=useState("");
    const {data:paymentData,isLoading,refetch} =useQuery({
      queryKey:["payment",paymentId],
      enabled:!!paymentId,
      queryFn: async ()=>
      {
        const res=await axiosSecure.get(`/payment?id=${paymentId}`);
        return res.data;
      }
      
    })
    if(loading || !paymentData || loading)
      return <Loading></Loading>
  return (
    <div>
        <Navbar></Navbar>
        { step===1 ?
        <PaymentMethod finalMethod={finalMethod} setFinalMethod={setFinalMethod} step={step} setStep={setStep} ></PaymentMethod> : null
        }
        { step===2 ?
        <Mobile finalMethod={finalMethod} phone={phone}  setPhone={setPhone} setStep={setStep}></Mobile>
        : null
}
       { step===3 ?
        <Otp finalMethod={finalMethod} phone={phone}   setStep={setStep}></Otp> 
        : null
}
        { step===4 ?
        <Pin finalMethod={finalMethod} phone={phone} paymentData={paymentData}   setStep={setStep}></Pin>
        : null
}
{
  step===5 ?
  <Success finalMethod={finalMethod} paymentData={paymentData}></Success>
  : null
}
    </div>
  )
}

export default PaymentPage