
"use client"
import Link from 'next/link'
import React from 'react'
import {  BiShoppingBag } from 'react-icons/bi'
import {  MdFavoriteBorder } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { statType } from '@/type'
const HeaderIcon = () => {
  const {cart,favorate} =useSelector((state:statType)=>state?.sofi)
console.log(cart)
console.log(favorate)
  return (
<>
<Link href="/favorite" className="relative inline-block">
  <div className="p-2 rounded-full hover:bg-pink-50 transition-colors">
    <MdFavoriteBorder className="text-2xl text-gray-700 hover:text-pink-500" />
  </div>
  <span className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-md">
{favorate?.length > 0 ? favorate.length : "0"}
  </span>
</Link>
<Link href="/shopingCard" className="relative inline-block">
  <div className="p-2 rounded-full hover:bg-pink-50 transition-colors">
    <BiShoppingBag className="text-2xl text-gray-700 hover:text-pink-500" />
  </div>
  <span className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-md">
{cart?.length > 0 ? cart.length : "0"}
  </span>
</Link>

</>
  )
}

export default HeaderIcon