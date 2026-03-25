import Link from 'next/link'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
interface props{
    children:React.ReactNode;
className?:string;
    onClick?: () => void;
    href?:string
}
const Button = ({children,className,href ,onClick}:props) => {
  return (
   <>
   {
    href ? <Link href={href} className={twMerge("text-white bg-themeColor/80 py-2 px-6 cursor-pointer hover:bg-themeColor duration-200",className)}>{children}</Link> :<button className={twMerge("text-white bg-themeColor/80 py-2 px-6 cursor-pointer hover:bg-themeColor duration-200",className)}>{children}</button>
   }
   
   
   
   </>
  )
}

export default Button