"use client"
import React, { useState } from 'react'

const FavorateIcon = () => {
      const [isFavorite, setIsFavorite] = useState(false)
        const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }
  return (
<>
        <button 
          onClick={toggleFavorite}
          className='absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-20 group'
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg 
            className={`w-5 h-5 transition-colors duration-300 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600 group-hover:text-red-500'}`}
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button></>
  )
}

export default FavorateIcon