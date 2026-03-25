import React from 'react'
import Container from '../Container'
import { IoChevronDown } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
const TopHeader = () => {
  return (
<div className='bg-[#010f1c] text-gray-200'>
<Container className='flex items-center justify-between'>
 <p className='w-full md:w-auto text-sm flex justify-center items-center  md:justify-normal font-medium py-1'>  <CiDeliveryTruck className='text-[#ffb342] text-2xl mr-1'/>FREE Express Shipping On Orders $1000+</p>
  <div className='hidden md:inline-flex items-center text-sm text-white'> 
    <p className='top_headers'>USD<IoChevronDown  className='mt-[1px]'/></p>
    <p className='top_headers'>English<IoChevronDown  className='mt-[1px]'/></p>
    <p className='top_headers'>Setting<IoChevronDown  className='mt-[1px]'/></p>
  </div>
</Container>


    </div>
  )
}

export default TopHeader