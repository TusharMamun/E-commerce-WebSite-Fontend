import { ProductTyps } from '@/type'
import Image from 'next/image'
import React, { useState } from 'react'
import FavorateIcon from './FavorateIcon'
import QuiqeViwe from './QuiqeViwe'
import CartPriceCal from './CartPriceCal'
import AddToCartBtn from './AddToCartBtn'
import Link from 'next/link'

const ProductCard = ({product}:{product:ProductTyps}) => {

  
  // State for favorite/wishlist and add to cart


  
  // Calculate discounted price

  
  // Toggle favorite

  
  // Handle add to cart with animation

  
  return (
    <div className='border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group relative'>
      {/* Image Container */}
      <div className='relative w-full h-64 bg-gray-100'>
        <Link href={
          {
            pathname: `/products/${product?.id}`,   
            query:{id:product?.id}
          }
        }>
        
        <Image 
          src={product.images[0]} 
          alt={product.title}
     width={300}
     height={300}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        </Link>
        
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10'>
            {Math.round(product.discountPercentage)}% OFF
          </div>
        )}
        
        {/* Stock Status */}
        {product.stock < 10 && (
          <div className='absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10'>
            Only {product.stock} left
          </div>
        )}

        {/* Favorite/Wishlist Button */}
<FavorateIcon product={product}/>

        {/* Quick View Button */}
      <QuiqeViwe/>
      </div>

      {/* Product Details */}
      <div className='p-3'> {/* Reduced padding */}
        {/* Brand and Category */}
        <div className='flex justify-between items-center mb-1.5'>
          <span className='text-xs font-semibold text-blue-600 uppercase tracking-wide'>
            {product.brand}
          </span>
          <span className='text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600'>
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3 className='font-semibold text-base mb-1 line-clamp-2 hover:text-blue-600 transition-colors'>
          {product.title}
        </h3>

        {/* Description - removed to save space */}

        {/* Rating */}
        <div className='flex items-center gap-1 mb-2'>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
            <span className='text-xs text-gray-500 ml-1'>({product.rating})</span>
          </div>
          <span className='text-xs text-gray-500'>• {product.reviews.length}</span>
        </div>

        {/* Price and Actions */}
        <div className='flex items-center justify-between mt-2'>
<CartPriceCal product ={product} />
          
          {/* Interactive Add to Cart Button - Smaller and More Active */}
    <AddToCartBtn product={product} ></AddToCartBtn>
        </div>

        {/* Minimum Order Info */}
        <p className='text-xs text-gray-400 mt-1.5'>
          Min: {product.minimumOrderQuantity} units
        </p>
      </div>
    </div>
  )
}

export default ProductCard