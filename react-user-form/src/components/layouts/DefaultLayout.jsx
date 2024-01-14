import React from 'react'
import { Outlet } from 'react-router-dom'

function DefaultLayout() {    
  return (
    <>
      <div className="container p-5">
        <div className="row p-5 border border-primary">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default DefaultLayout