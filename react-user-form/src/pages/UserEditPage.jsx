import React from 'react'
import EditUserForm from '../components/users/EditUserForm'
import { useNavigate } from 'react-router-dom'

function UserEditPage() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Edit User</h1>
        <button
          className="btn btn-danger"
          onClick={() => history.back()}>
          Go back
        </button>
      </div>
      <EditUserForm />
    </div>
  )
}

export default UserEditPage