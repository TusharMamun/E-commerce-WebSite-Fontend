'use client'
import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link'; // Ensure you are importing the Link component correctly
import { redirect, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { resetCart } from '@/Redux/sofislise';
import toast from 'react-hot-toast';

const SuccessPage = () => { // 1. Fixed typo: "parms" -> "params"
const getSessionByparms =useSearchParams()
const sessionid= getSessionByparms.get('session_id')
const dispetch =useDispatch()
console.log(sessionid)
!sessionid && redirect("/")
useEffect(()=>{
if(sessionid){
dispetch(resetCart())
toast.success("Your order Sucessfylly completed ")
}
},[dispetch,sessionid])
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transition-all hover:shadow-2xl">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full transition-transform hover:scale-110">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Action Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Your request has been processed. We’ve sent a confirmation email to your inbox with all the details.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-[0.98]">
            View My Dashboard
            <ArrowRight size={18} />
          </button>
          
          {/* 2. Fixed Link: Removed extra quote and fixed lucide conflict */}
          <Link href="/" className="block">
            <button className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98]">
              <Home size={18} />
              Back to Home
            </button>
          </Link>
        </div>

        {/* Footer Support */}
        <p className="mt-8 text-sm text-gray-500">
          Need help? <a href="#" className="text-indigo-600 font-medium hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;