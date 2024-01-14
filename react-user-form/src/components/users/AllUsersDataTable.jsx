import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';

function AllUsersDataTable() {

    const navigate = useNavigate();

    const initialNotifData = { 
        success: null, 
        message: null 
      }
    const [notification, setNotification] = useState(initialNotifData);
    const [users, setUsers] = useState();


    useEffect(() => {
        getAllUsersData();
    }, []);

    const getAllUsersData = () => {
        axiosClient.get('/users')
            .then((res) => {
                if (res.status === 200 && res.data.status === true) {
                    setUsers(res.data.data);
                }
            })
            .catch((error) => {
                setNotification({
                    'message' : 'Couldn\'t fetch users data.' ,
                    'success' : false,
                });
            })
    };
    const deleteUser = (id) => {
        axiosClient.delete('/user/' + id)
            .then((res) => {
                setNotification({
                    'message': res.data.message,
                    'success': res.status === 200 && res.data.status === "Success",
                  });
            })
            .catch((error) => {
                setNotification({
                    'message' : 'Couldn\'t delete users data.' ,
                    'success' : false,
                });
            })
    };

    const handleDelete = (userId) => {
        if (confirm(`Are you sure want to delete user with ID: ${userId} ?`)) {
            deleteUser(userId);
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
        }
    };

    return (
        <div className='table-responsive'>

            {
                notification.message && (
                    <div
                        className={`alert ${notification.success ? 'alert-success' : 'alert-danger'}`}
                        role="alert"
                    >
                        {notification.message}
                    </div>
                )
            }

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.gender}</td>
                            <td>{user.dob}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm m-1 mt-0 "
                                    onClick={() => navigate('/user/' + user.id)}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-warning btn-sm m-1 mt-0 "
                                    onClick={() => navigate('/user/' + user.id + '/edit')}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm m-1 mt-0"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};


export default AllUsersDataTable;