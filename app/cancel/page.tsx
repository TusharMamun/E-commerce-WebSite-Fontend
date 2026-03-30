import React from 'react';
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        
        {/* Cancel/Alert Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 p-4 rounded-full">
            <XCircle className="w-12 h-12 text-amber-600" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          No worries! Your transaction was not completed, and you haven't been charged. If you ran into an issue, you can try again below.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-[0.98]">
            <RefreshCw size={18} />
            Try Again
          </button>
          
          <Link href="/shopingCard" className="block">
            <button className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98]">
              <ArrowLeft size={18} />
              Return to Store
            </button>
          </Link>
        </div>

        {/* Feedback Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-3">
            Was there a problem with the checkout?
          </p>
          <button className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
            <MessageCircle size={16} />
            Let us know
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;