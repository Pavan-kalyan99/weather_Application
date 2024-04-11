import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    
  return (
    <nav className='navbar w-full bg-slate-700 fixed top-0 m-0 p-2'>
    <div className='flex justify-center text-center gap-2 text-white'>
      <Link to='/' className='active:visited:text-red-800 hover:text-red-500'>Home</Link>
      <Link to='/about' className='hover:text-red-500'>About</Link>
    </div>
  </nav>
  )
}

export default Dashboard
