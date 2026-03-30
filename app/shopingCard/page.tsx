import CartProducts from '@/Component/CartPageFuctionality/CartProducts'
import Container from '@/Component/Container'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import React from 'react'

const CartPage =async () => {
  const session =await getServerSession()
if(!session){
redirect("/")
}
  return (
  <Container className='py-10'>
<CartProducts/>


  </Container>
  )
}

export default CartPage