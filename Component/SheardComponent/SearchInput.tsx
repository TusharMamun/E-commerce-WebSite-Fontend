"use client"
import { getData } from '@/Helpers'
import { ProductTyps } from '@/type'
import Link from 'next/link'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { RiCloseLine, RiSearchLine } from 'react-icons/ri'

const SearchInput = () => {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState<ProductTyps[]>([])
    const [isInputFocus, setInputFocus] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null) // Fixed: searchRefer -> searchRef, added type
    
    // Fetch products on mount
    useEffect(() => {
        const getProducts = async () => {
            const endpoint = 'http://localhost:5000/api/v1/products'
            try {
                const response = await getData(endpoint)
                const productsData = response.data
                setProducts(productsData)
            } catch (error) {
                console.log("Error fetching products:", error)
            }
        }
        getProducts()
    }, [])
    
    // Filter products based on search
    const filteredProducts = useMemo(() => {
        if (!search.trim()) {
            return products
        }
        
        return products.filter((item: ProductTyps) => {
            return item?.title?.toLowerCase().includes(search.toLowerCase())
        })
    }, [search, products])
    
    // Click outside handler - close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {

                setInputFocus(false)
        
            }
        }
        
        // Add event listener
        document.addEventListener('mousedown', handleClickOutside)
        
        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    
    // Handle escape key press
    // useEffect(() => {
    //     const handleEscKey = (event: KeyboardEvent) => {
    //         if (event.key === 'Escape') {
    //             setInputFocus(false)
           
    //         }
    //     }
        
    //     document.addEventListener('keydown', handleEscKey)
        
    //     return () => {
    //         document.removeEventListener('keydown', handleEscKey)
    //     }
    // }, [])
    
    return (
        <div 
            ref={searchRef}
            className='hidden md:inline-flex flex-1 h-10 relative'
        >
            <input 
                onFocus={() => setInputFocus(true)}
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                type="text"  
                placeholder='Search Product' 
                className='w-full h-full border-2 rounded-md border-themeColor px-4 outline-none' 
            />
            
            {search && (
                <RiCloseLine 
                    onClick={() => setSearch("")} 
                    className='text-xl absolute top-2.5 right-12 text-gray-600 cursor-pointer duration-200 hover:text-red-600'
                />
            )}
            
            <span className='absolute bg-themeColor/80 inline-flex items-center justify-center top-0 right-0 w-10 h-10 border-themeColor duration-200 cursor-pointer hover:bg-themeColor rounded-r-md'>
                <RiSearchLine className='text-white'/>
            </span>
            
            {/* Display search results dropdown - only when input is focused or has search term */}
            { isInputFocus && search &&(
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
                    {filteredProducts.map((product: ProductTyps) => (
                        <Link 
                            href={{
                                pathname: `/products/${product?.id || product?._id}`,
                                query: { id: product._id }
                            }} 
                            key={product._id}
                            onClick={() => {
                                setSearch("")
                                setInputFocus(false)
                            }}
                        >
                            <div className="p-3 hover:bg-gray-100 cursor-pointer border-b">
                                <p className="font-medium">{product.title}</p>
                               
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            
            {/* No results found */}
            {(isInputFocus || search) && search && filteredProducts.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg p-4 text-center text-gray-500">
                    No products found for "{search}"
                </div>
            )}
        </div>
    )
}

export default SearchInput