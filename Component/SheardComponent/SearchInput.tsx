"use client"
import React, { useState } from 'react'
import { RiCloseLine, RiSearchLine } from 'react-icons/ri'

const SearchInput = () => {
    const [search,setSearch] =useState("")
    console.log(search)
  return (
    <div className='hidden md:inline-flex flex-1  h-10 relative'>

<input value={search} onChange={(e)=>setSearch(e.target.value)} type="text"  placeholder='Search Product ' className='w-full h-full border-2  rounded-md border-themeColor px-4 outline-none' />
{
    search && <RiCloseLine onClick={()=>setSearch("")} className='text-xl absolute top-2.5 right-12 text-gray-600 cursor-pointer duration-200'/>
}
<span className='absolute bg-themeColor/80 inline-flex items-center justify-center top-0 right-0 w-10 h-10 border-themeColor duration-200 cursor-pointer hover:bg-themeColor rounded-r-md '><RiSearchLine className='text-red-600'/></span>

    </div>
  )
}

export default SearchInput