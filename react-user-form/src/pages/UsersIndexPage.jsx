import React from 'react'
import AllUsersDataTable from '../components/users/AllUsersDataTable'
import { useNavigate } from 'react-router-dom'

function UsersIndexPage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>All Users Data</h1>
        <button 
          className="btn btn-success"
          onClick={() => navigate('/user/create')}>
          Add new User
        </button>
      </div>
      <AllUsersDataTable />
    </div>
  )
}

export default UsersIndexPage