"use client";

import { ProductTyps, statType } from '@/type';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CartPriceCal = ({ product }: { product: ProductTyps }) => {
  const [existingProduct, setExistingProduct] = useState<ProductTyps | null>(null);
  const { cart } = useSelector((state: statType) => state?.sofi);
  const dispatch = useDispatch();

  useEffect(() => {
    const availableProduct = cart?.find((item) => item._id === product?._id);
    if (availableProduct) {
      setExistingProduct(availableProduct);
    } else {
      setExistingProduct(null);
    }
  }, [cart, product]);

  // Calculate discounted price per unit (if discount exists)
  const hasDiscount = product.discountPercentage > 0;
  const discountedPricePerUnit = hasDiscount 
    ? parseFloat((product.price - (product.price * product.discountPercentage / 100)).toFixed(2))
    : product.price;
  
  const currentQuantity = existingProduct?.quantity || 1;
  const MrpPrice = currentQuantity * product.price
  // Calculate total price based on quantity
  const totalPrice = parseFloat((discountedPricePerUnit * currentQuantity).toFixed(2));
  
  // Calculate total original price (without discount)
  const totalOriginalPrice = parseFloat((product.price * currentQuantity).toFixed(2));
  
  // Calculate total discount amount
  const totalDiscountAmount = parseFloat((totalOriginalPrice - totalPrice).toFixed(2));
  
  // Format currency to USD with 2 decimal places
  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div>
      {hasDiscount ? (
        // Product with discount
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1.5'>
            {/* Total price (discounted) */}
            <span className='text-lg font-bold text-gray-900'>
              {formatUSD(totalPrice)}
            </span>
            
   <span className='text-xs text-gray-400 line-through'>
                {formatUSD(MrpPrice)}
              </span>
          </div>
          
          {/* Show discount amount for all discounted items */}
          {totalDiscountAmount > 0 && (
            <div className='text-xs text-green-600 font-medium'>
              Save {formatUSD(totalDiscountAmount)}
            </div>
          )}
        </div>
      ) : (
        // Product without discount
        <div className='flex items-center gap-1.5'>
          {/* Total price (regular) */}
          <span className='text-lg font-bold text-gray-900'>
            {formatUSD(totalPrice)}
          </span>
          
        </div>
      )}
    </div>
  );
};

export default CartPriceCal;