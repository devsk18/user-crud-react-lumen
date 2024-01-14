import React from 'react'
import ShowUserData from '../components/users/ShowUserData'

function UserShowDataPage() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Single User Data</h1>
        <button
          className="btn btn-danger"
          onClick={() => history.back()}>
          Go back
        </button>
      </div>
      <ShowUserData />
    </div>
  )
}

export default UserShowDataPage