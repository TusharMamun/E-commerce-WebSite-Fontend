import { NotfoundImges } from '@/assete/Images'
import Container from '@/Component/Container'
import Button from '@/Component/SheardComponent/Button'
import Image from 'next/image'
import React from 'react'

const NotFoundPage = () => {
  return (
<Container className='flex flex-col gap-2 items-center'>
      <Image 
        src={NotfoundImges} 
        alt='Not Found Page' 
        className='w-full max-w-2xl px-4'
        priority
      />
<Button className='rounded-full' href="/">Go Back</Button>
</Container>
  )
}

export default NotFoundPage