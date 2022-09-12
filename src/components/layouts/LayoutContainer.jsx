import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutContainer = () => {
  return (
    <div className='w-96 mx-auto mt-8'>
        
        <Outlet></Outlet>
    </div>
  )
}

export default LayoutContainer