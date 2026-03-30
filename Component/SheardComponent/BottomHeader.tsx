import React from 'react'
import Container from '../Container'
import { navigation } from '@/Constent'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import SignOutBtn from './SingOutBtn'


const BottomHeader = async () => {
  const session = await getServerSession()
  console.log(session)
  
  return (
    <div className='border-b-[1px] border-gray-400'>
      <Container className='flex items-center justify-between py-2'>
        <div className='text-xs md:text-sm flex items-center justify-center gap-2 md:gap-5 font-medium'>
          {navigation?.map((item, index) => (
            <Link 
              className='hover:text-themeColor duration-200' 
              key={index} 
              href={item.href}
            >
              {item.title}
            </Link>
          ))}
          {!session ? (
            <p className='hover:text-themeColor duration-200'>Please Sign In</p>
          ) : (
            <SignOutBtn />
          )}
        </div>
        <p className='hidden md:inline-flex font-medium text-xs text-gray-500'>
          HotLine :<span className='text-black font-bold'>+880192046268</span>
        </p>
      </Container>
    </div>
  )
}

export default BottomHeader