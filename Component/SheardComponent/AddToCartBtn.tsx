"use client";
import { addtocart, decreaseQuantity, increasesQuantity } from '@/Redux/sofislise';
import { ProductTyps, statType } from '@/type';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

interface AddToCartBtnProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  product: ProductTyps;
}

const AddToCartBtn = ({  
  product,
  onClick, 
  className = '', 
  children,
  variant = 'primary',
  size = 'sm',
  disabled = false,
  fullWidth = false
}: AddToCartBtnProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
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

  // Safe values with defaults
  const currentQuantity = existingProduct?.quantity ?? 0;
  const productStock = product?.stock ?? 0;
  
  // Stock validation
  const isQuantityOneOrLess = currentQuantity <= 1;
  const isOutOfStock = productStock <= 0;
  const canIncrease = currentQuantity < productStock;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled || isAddingToCart) return;
    
    if (isOutOfStock) {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-red-500 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
          <span className="text-2xl">📦</span>
          <div>
            <p className="font-semibold">Out of Stock!</p>
            <p className="text-sm">{product.title} is currently out of stock</p>
          </div>
        </div>
      ), {
        duration: 2000,
        position: 'bottom-right',
      });
      return;
    }
    
    if (product) {
      dispatch(addtocart(product));
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
          <span className="text-2xl">🛒</span>
          <div>
            <p className="font-semibold">Added to Cart!</p>
            <p className="text-sm">{product.title} has been added to your cart</p>
          </div>
        </div>
      ), {
        duration: 2000,
        position: 'bottom-right',
      });
    }
    
    setIsAddingToCart(true);
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
    
    onClick?.();
  };

  const handleDecrease = () => {
    if (disabled) return;
    
    if (existingProduct && currentQuantity > 1) {
      dispatch(decreaseQuantity(product._id));
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-yellow-500 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
          <span className="text-2xl">➖</span>
          <div>
            <p className="font-semibold">Quantity Decreased!</p>
            <p className="text-sm">{product.title} quantity decreased to {currentQuantity - 1}</p>
          </div>
        </div>
      ), {
        duration: 1500,
        position: 'bottom-right',
      });
    }
  };

  const handleIncrease = () => {
    if (disabled) return;
    
    if (!canIncrease) {
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-red-500 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold">Stock Limit Reached!</p>
            <p className="text-sm">Only {productStock} items available in stock</p>
          </div>
        </div>
      ), {
        duration: 2000,
        position: 'bottom-right',
      });
      return;
    }
    
    dispatch(increasesQuantity(product._id));
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-blue-500 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
        <span className="text-2xl">➕</span>
        <div>
          <p className="font-semibold">Quantity Increased!</p>
          <p className="text-sm">{product.title} quantity increased to {currentQuantity + 1}</p>
        </div>
      </div>
    ), {
      duration: 1500,
      position: 'bottom-right',
    });
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  // Button disabled states
  const isDecrementDisabled = disabled || isQuantityOneOrLess;
  const isIncrementDisabled = disabled || !canIncrease || isOutOfStock;
  
  // Display quantity (ensure it doesn't exceed stock)
  const displayQuantity = Math.min(currentQuantity, productStock);
  const quantityToShow = displayQuantity > 0 ? displayQuantity : 1;

  return (
    <>
      {existingProduct ? (
   <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm hover:shadow-md transition-all duration-300">
  <button
    disabled={isDecrementDisabled}
    onClick={handleDecrease}
    className={`
      bg-gray-100 rounded-md p-1 transition-colors duration-200
      ${isDecrementDisabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:bg-gray-200 cursor-pointer'
      }
    `}
    style={isDecrementDisabled ? { pointerEvents: 'none' } : {}}
  >
    <FaMinus className="text-gray-700" size={12} />
  </button>
  
  <div className="flex flex-col items-center">
    <p className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-base font-black min-w-[24px] text-center">
      {quantityToShow}
    </p>
    {productStock > 0 && (
      <p className="text-[10px] text-gray-500">
        {productStock === quantityToShow 
          ? <span className='text-red-600 text-[10px] font-light'>Out</span>
          : <span className='text-green-700 text-[10px] font-light'>Avail</span>}
      </p>
    )}
  </div>
  
  <button
    disabled={isIncrementDisabled}
    onClick={handleIncrease}
    className={`
      bg-gray-100 rounded-md p-1 transition-colors duration-200
      ${isIncrementDisabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:bg-gray-200 cursor-pointer'
      }
    `}
    style={isIncrementDisabled ? { pointerEvents: 'none' } : {}}
  >
    <FaPlus className="text-gray-700" size={12} />
  </button>
</div>
      ) : (
        <button 
          onClick={handleAddToCart}
          disabled={disabled || isAddingToCart || isOutOfStock}
          className={twMerge(
            `relative overflow-hidden
            rounded-lg font-semibold
            flex items-center gap-1.5
            transition-all duration-300 ease-out
            shadow-md hover:shadow-lg
            disabled:cursor-not-allowed
            group/btn`,
            sizeClasses[size],
            fullWidth && 'w-full justify-center',
            !isAddingToCart && !isOutOfStock && variantClasses[variant],
            isAddingToCart && 'bg-green-500 text-white scale-95',
            isOutOfStock && 'bg-gray-400 opacity-50 cursor-not-allowed',
            (disabled) && 'opacity-50',
            className
          )}
        >
          <span className={`
            transition-transform duration-300
            ${isAddingToCart ? 'animate-bounce' : 'group-hover/btn:rotate-12'}
          `}>
            {isAddingToCart ? (
              <svg className={`${iconSizes[size]} animate-spin`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            )}
          </span>

          <span className={`
            transition-all duration-300
            ${isAddingToCart ? 'opacity-90' : ''}
          `}>
            {isAddingToCart 
              ? 'Adding...' 
              : isOutOfStock 
                ? 'Out of Stock' 
                : (children || 'Add to Cart')
            }
          </span>

          {isAddingToCart && (
            <span className="absolute inset-0 flex items-center justify-center opacity-0 animate-pulse">
              <svg className={`${iconSizes[size]} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;