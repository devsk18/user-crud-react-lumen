import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';

const ShowUserData = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserData(id);
    }, [id]);

    const getUserData = (id) => {
        axiosClient.get('/user/' + id)
            .then((res) => {
                console.log(res);
                if (res.status === 200 && res.data.status === true) {
                    setUser(res.data.data);
                } else {
                    navigate('/users')
                }
            })
            .catch((error) => {
                navigate('/users')
            })
    };

    return (
        <div className="container">
            {user ? (
                <div className="card mt-3">
                    <div className="card-body">
                        <p className="card-text"><strong>ID:</strong> {user.id}</p>
                        <p className="card-text"><strong>First Name:</strong> {user.first_name}</p>
                        <p className="card-text"><strong>Last Name:</strong> {user.last_name}</p>
                        <p className="card-text"><strong>Email:</strong> {user.email}</p>
                        <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
                        <p className="card-text"><strong>Gender:</strong> {user.gender}</p>
                        <p className="card-text"><strong>Date of Birth:</strong> {user.dob}</p>
                    </div>
                    <div className="d-flex m-2">
                        <button
                            className="btn btn-primary btn-sm m-1 mt-0 "
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
                    </div>
                </div>
                
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowUserData;
