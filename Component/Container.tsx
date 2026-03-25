import React from 'react'
import { twMerge } from 'tailwind-merge'
interface props{
    children:React.ReactNode;
    className?:string
}

const Container = ({children,className}:props) => {
  return (
    <div className= {twMerge('max-w-[1140px] px-4 mx-auto',className)}>
        {children}
    </div>
  )
}

export default Container