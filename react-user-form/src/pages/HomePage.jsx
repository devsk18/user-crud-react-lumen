import React from 'react'
import { Navigate } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <a className='btn btn-primary mt-3' href='/users'>Visit Users Table</a>
    </div>

  )
}

export default HomePage