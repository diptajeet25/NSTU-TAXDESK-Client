import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';
import Loading from './Loading';
import ReceiptTemplate from './ReceiptTemplate';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import { buildReceiptPdf } from '../utils/receiptPdf';

const Receipt = () => {
  const {id}=useParams();
  const axiosSecure=useAxiosSecure();
  const {user}=useContext(AuthContext);

  const handleDownload = async () => {
    try {
      if (!id) return;

      const res = await axiosSecure.get(`/receipt?id=${id}`);

      const pdf = new jsPDF('p', 'mm', 'a4');
      buildReceiptPdf(pdf, {
        id,
        user,
        receiptData: res.data,
      });

      pdf.save('receipt.pdf');
      toast.success('Receipt downloaded');
    } catch (error) {
      console.error('Receipt download failed:', error);
      toast.error('Failed to download receipt PDF');
    }
  };

  const {data:receiptData,isLoading}=useQuery(
    {
      queryKey:["receipt",id],
      enabled:!!id,
      queryFn: async ()=>
      {
        const res=await axiosSecure.get(`/receipt?id=${id}`);
        return res.data;
      }
    }
  )

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className='min-h-screen !px-4 !py-8'>
      <div className='!mx-auto mb-3 flex w-fit justify-end'>
        <button onClick={handleDownload} className='btn btn-primary !px-4 !py-2'>
          Download PDF
        </button>
      </div>

      <div className='!mx-auto w-fit'>
        <ReceiptTemplate id={id} user={user} receiptData={receiptData} />
      </div>
    </div>
  )
}

export default Receipt