import React from 'react'
import CreateUserForm from '../components/users/CreateUserForm.jsx'

function UserFormPage() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Add New User</h1>
        <button
          className="btn btn-danger"
          onClick={() => history.back()}>
          Go back
        </button>
      </div>
        <CreateUserForm />
    </div>
  )
}

export default UserFormPage