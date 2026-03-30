"use client";
import { ProductTyps, statType } from '@/type';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import AddToCartBtn from '../SheardComponent/AddToCartBtn';
import { useDispatch, useSelector } from 'react-redux';
import { removeFormCard } from '@/Redux/sofislise';
import toast from 'react-hot-toast';

const CartInfo = ({ product }: { product: ProductTyps }) => {
  const [existingProduct, setExistingProduct] = useState<ProductTyps | null>(null);
  const { cart } = useSelector((state: statType) => state?.sofi);


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
  const discountAmountPerUnit = hasDiscount 
    ? parseFloat((product.price * product.discountPercentage / 100).toFixed(2))
    : 0;
  
  const discountedPricePerUnit = hasDiscount 
    ? parseFloat((product.price - discountAmountPerUnit).toFixed(2))
    : product.price;
  
  const currentQuantity = existingProduct?.quantity || 1;
  
  // Calculate total price based on quantity
  const totalPrice = parseFloat((discountedPricePerUnit * currentQuantity).toFixed(2));
  
  // Calculate total original price (without discount)
  const totalOriginalPrice = parseFloat((product.price * currentQuantity).toFixed(2));
  
  // Calculate total discount amount
  const totalDiscountAmount = parseFloat((totalOriginalPrice - totalPrice).toFixed(2));
    const dispetch =useDispatch()
const hendelRemoveItem=()=>{

  dispetch(removeFormCard(product?._id))
   toast.success(`${product.title.substring(0,20)}    removed from cart successfully!`)
}




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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 border-b border-gray-200">
      {/* Product Info */}
      <div className="flex items-center gap-4 flex-1">
        <Link href={`/products/${product.id}?id=${product?.id}`}>
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden hover:opacity-80 transition-opacity">
            {product.images && product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.title || 'Product'}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </Link>
        
        <div>
          <Link href={`/products/${product.id}?id=${product?.id}`}>
            <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
              {product.title || 'Product title'}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description || ''}</p>
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="mt-1">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                {product.discountPercentage}% OFF
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Unit Price with Discount */}
      <div className="md:w-36 text-left">
        {hasDiscount ? (
          <div>
            <p className="text-xs text-gray-500">Unit Price</p>
            <div className="flex items-center gap-2">
              <p className="text-gray-500 text-sm line-through">
                {formatUSD(product.price)}
              </p>
              <p className="text-gray-900 font-semibold">
                {formatUSD(discountedPricePerUnit)}
              </p>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Save {formatUSD(discountAmountPerUnit)}/unit
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gray-500">Unit Price</p>
            <p className="text-gray-700 font-medium">
              {formatUSD(product.price)}
            </p>
          </div>
        )}
      </div>

      {/* Quantity */}
      <div className="md:w-32">
        <AddToCartBtn product={product} />
      </div>

      {/* Total with Discount */}
      <div className="md:w-40 text-right">
        {hasDiscount && totalDiscountAmount > 0 ? (
          <div>
            <p className="text-xs text-gray-500">Total Price</p>
            <div className="flex flex-col items-end">
              <p className="text-gray-500 text-sm line-through">
                {formatUSD(totalOriginalPrice)}
              </p>
              <p className="font-bold text-gray-900 text-lg">
                {formatUSD(totalPrice)}
              </p>
              <p className="text-xs text-green-600 font-medium mt-1">
                You save: {formatUSD(totalDiscountAmount)}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gray-500">Total Price</p>
            <p className="font-semibold text-gray-900 text-lg">
              {formatUSD(totalPrice)}
            </p>
          </div>
        )}
      </div>

      {/* Remove Button */}
      <button 
        onClick={hendelRemoveItem}
        className="text-gray-400 hover:text-red-500 transition-colors ml-auto md:ml-0 cursor-pointer"
        aria-label="Remove item"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartInfo;