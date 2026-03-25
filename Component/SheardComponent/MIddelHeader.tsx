
import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import { logo } from '@/assete/Images'
import SearchInput from './SearchInput'
import Link from 'next/link'
import { LiaUser } from 'react-icons/lia'
import HeaderIcon from './HeaderIcon'
import MobileNavigation from './MobileNavigation'






const MIddelHeader = () => {


  return (
    <div className='border-[1px] border-b-gray-700'>
<Container className='py-5 flex items-center gap-4 md:gap-6 lg:gap-8 justify-between'>
<Link href={"/"}>
<Image alt='logo' className='w-28'   src={logo} priority/></Link>
<SearchInput></SearchInput>
<div className='hidden md:inline-flex items-center gap3'>
<Link href={"/sigin"} className='flex  items-center gap-4 text-sm' >
<div className='border-b-2 rounded-full bg-gray-400 p-1.5 text-xl'>
    <LiaUser/>
</div>
<div>
    <p className='text-xs'>Hello , Gest </p>
    <p className='font-medium'>Login / Register</p>
</div>

</Link>

<HeaderIcon/>
</div>

<MobileNavigation/>
</Container>


    </div>
  )
}

export default MIddelHeader