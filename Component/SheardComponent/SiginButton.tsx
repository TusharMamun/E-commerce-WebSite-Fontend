'use client'
import Link from 'next/link'
import React from 'react'
import { LiaUser } from 'react-icons/lia'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const SignInButton = () => {
    const { data: session, status } = useSession()

    
    // Show loading state
    
    
    // User is authenticated (logged in)
    if (session?.user) {
        return (
            <div className='hidden md:inline-flex items-center gap-3 cursor-pointer group relative'>
                <div className='flex items-center gap-4 text-sm'>
                   <div className='relative'>
    {session.user.image ? (
        <div className='relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 ring-offset-white'>
            <Image
                width={32}
                height={32}
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className='w-full h-full object-cover'
                priority={false}
            />
            {/* Online status indicator */}
            <span className='absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full'></span>
        </div>
    ) : (
        <div className='relative w-8 h-8 rounded-full  flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200'>
            <LiaUser className='text-white text-lg' />
            {/* Optional: Show user initial instead of icon */}
            <span className='text-white text-sm font-medium'>
                {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
        </div>
    )}
</div>
                    <div>
                        <p className='text-xs text-gray-600'>Welcome back,</p>
                        <p className='font-medium text-gray-900'>
                            {session.user.name || session.user.email?.split('@')[0] || 'User'}
                        </p>
                    </div>
                </div>
                
                {/* Dropdown Menu */}
                <div className='absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 hidden group-hover:block'>
                    <Link href="/profile" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        My Profile
                    </Link>
                    <Link href="/orders" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        My Orders
                    </Link>
                    <hr className='my-1' />
                    <button 
                        onClick={() => signOut({ callbackUrl: '/' })} 
                        className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        )
    }
    
    // User is not authenticated (guest)
    return (
        <div 
            onClick={() => signIn()} 
            className='hidden md:inline-flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity'
        >
            <div className='flex items-center gap-4 text-sm'>
                <div className='border-b-2 rounded-full bg-gray-400 p-1.5 text-xl'>
                    <LiaUser />
                </div>
                <div>
                    <p className='text-xs text-gray-600'>Hello, Guest</p>
                    <p className='font-medium text-gray-900'>Login / Register</p>
                </div>
            </div>
        </div>
    )
}

export default SignInButton