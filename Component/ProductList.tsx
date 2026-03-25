"use client"
import Image from 'next/image'
import React from 'react'
import ProductCard from './SheardComponent/ProductCard'
import Container from './Container'
import { ProductTyps } from '@/type' // Verify this path is correct

interface Props {
  products: ProductTyps[];
} 

const ProductList = ({ products }: Props) => {
  console.log(products)

  
  return (
    <>
      <Container className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:mx-auto">
        {products?.map((item: ProductTyps) => (
          <ProductCard key={item?.id} product={item} />
        ))}
      </Container>
    </>
  )
}

export default ProductList