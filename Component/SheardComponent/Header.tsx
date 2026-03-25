import React from 'react'
import TopHeader from './TopHeader'
import MIddelHeader from './MIddelHeader'
import BottomHeader from './BottomHeader'

const Header = () => {
  return (
    <div className='sticky top-0 z-50 bg-white'>
<TopHeader/>
<MIddelHeader/>
<BottomHeader/>


    </div>
  )
}

export default Header