import React from 'react'
import Container from '../Container'
import { banner } from '@/Constent'
import Image from 'next/image'

import {  GoArrowRight } from 'react-icons/go'
import Button from './Button'


const Banner = () => {
  return (
    <div className='py-20 text-themewhite bg-[#115061]'>
    <Container className='flex flex-col gap-5 md:flex-row md:items-center justify-between '>

<div className='flex flex-col gap-4'>
  <p className='font-semibold text-base'>{banner?.priceText}</p>
<h2 className='text-5xl font-bold max-w-[500px]'>{banner?.title}</h2>
<p className='text-lg font-bold'>
  {banner?.textone} <span className='text-lightYellow mx-[1]'>{banner?.offerPrice}</span>
  {banner?.textTwo}
  
</p>
<Button
className="flex items-center gap-1
bg-themewhite
☐ text-black rounded-md w-32 px-0 justify-center text-sm font-semibold hover:bg-transparent
hover:text-themewhite py-3 border
border-transparent hover:border-white/40
duration-200"
href={banner.buttonLink}>Hellow butn<GoArrowRight></GoArrowRight></Button>
</div>
<Image src={banner.image} alt=' bannerimg' priority/>
    </Container>


        
        </div>
  )
}

export default Banner