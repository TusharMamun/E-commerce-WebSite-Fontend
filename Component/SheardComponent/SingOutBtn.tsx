"use client"
import { signOut } from 'next-auth/react'

const SignOutBtn = () => {
  return (
    <button 
      onClick={() => signOut()}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Sign Out
    </button>
  )
}

export default SignOutBtn