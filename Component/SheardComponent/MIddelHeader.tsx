
import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import { logo } from '@/assete/Images'
import SearchInput from './SearchInput'
import Link from 'next/link'
import { LiaUser } from 'react-icons/lia'
import HeaderIcon from './HeaderIcon'
import MobileNavigation from './MobileNavigation'
import SiginButton from './SiginButton'






const MIddelHeader = () => {


  return (
    <div className='border-[1px] border-b-gray-700'>
<Container className='py-5 flex items-center gap-4 md:gap-6 lg:gap-8 justify-between'>
<Link href={"/"}>
<Image alt='logo' className='w-28'   src={logo} priority/></Link>
<SearchInput></SearchInput>
<div className='hidden md:inline-flex items-center gap3'>
<SiginButton/>

<HeaderIcon/>
</div>

<MobileNavigation/>
</Container>


    </div>
  )
}

export default MIddelHeader