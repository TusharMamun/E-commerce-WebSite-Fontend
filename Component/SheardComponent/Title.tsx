import React from 'react'
import { twMerge } from 'tailwind-merge';
interface props{
children:React.ReactNode;
className?:string
}
const Title = ({children,className}:props) => {
  return (
    <div className={twMerge("text-lg font-semibold text-gray-800", className)}>{children}</div>
  )
}

export default Title