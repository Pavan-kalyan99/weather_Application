import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className='container bg-slate-400'>
        <div className="flex items-center justify-center h-screen">
      <div className=" text-center">
        <h1 className="text-3xl">Page Not Found</h1>
        <Link to='/' className='text-blue-700'>Back to Home</Link>
      </div>
    </div>
    </div>
  )
}

export default PageNotFound
