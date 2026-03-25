import React from 'react'

const MainLoder = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rose-50 via-white to-stone-50 flex items-center justify-center z-50">
      {/* Main content */}
      <div className="relative flex flex-col items-center">
        {/* Soft spinner */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="w-20 h-20 rounded-full border-4 border-rose-100 border-t-rose-400 animate-spin"></div>
          
          {/* Inner circle with logo */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
        </div>

        {/* Website name */}
        <h1 className="text-4xl font-light text-stone-700 mb-2 tracking-wide">
          Sofy
        </h1>
        
        {/* Soft loading text */}
        <p className="text-stone-400 text-sm font-light tracking-widest">
          loading
          <span className="inline-flex ml-1">
            <span className="animate-pulse">.</span>
            <span className="animate-pulse animation-delay-200">.</span>
            <span className="animate-pulse animation-delay-400">.</span>
          </span>
        </p>

        {/* Minimal accent line */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>
      </div>

  
    </div>
  )
}

export default MainLoder