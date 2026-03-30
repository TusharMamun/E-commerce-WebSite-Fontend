"use client"
import { addTofavorate } from '@/Redux/sofislise'
import { ProductTyps, statType } from '@/type'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const FavorateIcon = ({ product }: { product: ProductTyps }) => {

  const [existingProduct, setExistingProduct] = useState<ProductTyps | null>(null);
  const { favorate } = useSelector((state: statType) => state.sofi)
  const dispatch = useDispatch()

  useEffect(() => {
    const availableProduct = favorate?.find((item) => item._id === product?._id);
if(availableProduct){
  setExistingProduct(availableProduct)
}else{
  setExistingProduct(null)
}
  }, [favorate, product,existingProduct,dispatch]);

  const handleFavorite = (): void => {
    // Determine if product is currently in favorites BEFORE dispatching

    
    // Dispatch the action
    dispatch(addTofavorate(product));

    // Show appropriate toast message based on current state
    if (existingProduct) {
      toast.success("❤️ Removed from favorites", {
        position: "top-center",
      });
    } else {
      toast.success("❤️ Added to favorites", {
        position: "top-center",
      });
    }
  };

  return (
  <button 
  onClick={handleFavorite}
  className='absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-20 group'
>
  {existingProduct ? (
    <MdFavorite
      className="text-red-500 text-xl transition-colors duration-200" 
    />
  ) : (
    <MdFavoriteBorder
      className="text-gray-600 group-hover:text-red-500 text-xl transition-colors duration-200" 
    />
  )}
</button>
  )
}

export default FavorateIcon