"use client";

import { ProductTyps } from '@/type'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// ✅ STEP 1: Removed loadStripe and stripePromise. 
// You no longer need the Stripe SDK on the frontend for redirects.

interface props {
  cart: ProductTyps[]
}

const CalculationSummary = ({ cart }: props) => {
  const { data: session } = useSession()
  const [totalAmount, setTotalAmount] = useState(0)
  const [discountAmount, setDiscountAmount] = useState(0)

  useEffect(() => {
    if (!cart?.length) {
      setTotalAmount(0)
      setDiscountAmount(0)
      return
    }

    let subtotal = 0
    let totalDiscount = 0

    cart.forEach((item) => {
      const itemTotal = item.price * (item.quantity || 1)
      subtotal += itemTotal
      if (item.discountPercentage) {
        const itemDiscount = (itemTotal * item.discountPercentage) / 100
        totalDiscount += itemDiscount
      }
    })

    setTotalAmount(subtotal)
    setDiscountAmount(totalDiscount)
  }, [cart])

  const finalAmount = totalAmount - discountAmount

  const hendelCheckOut = async () => {
    if (!session) return toast.error("Please sign in to checkout!");

    const loadingToast = toast.loading("Preparing checkout...");

    try {
      const response = await fetch('/api/checkout', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: cart,
          email: session?.user?.email
        })
      });

      const checkoutSession = await response.json();

      if (!response.ok) {
        throw new Error(checkoutSession.error || "Checkout failed");
      }


      if (checkoutSession.url) {
        toast.success("Redirecting to Stripe...", { id: loadingToast });
        window.location.href = checkoutSession.url; 
      } else {
        throw new Error("Stripe did not return a checkout URL.");
      }

    } catch (error: any) {
      console.error("Checkout Error:", error);
      toast.error(error.message || "Something went wrong", { id: loadingToast });
    }
  }

  return (
    <div className="mt-8 lg:mt-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md ml-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          
          {discountAmount > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span className="text-red-600">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>${finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={hendelCheckOut} 
          disabled={cart.length === 0}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
        >
          Proceed to Checkout
        </button>
        
        <Link href="/">
          <button className="w-full mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CalculationSummary