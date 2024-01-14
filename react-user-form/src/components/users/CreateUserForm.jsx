import React, { useState } from 'react';
import axiosClient from '../../axiosClient';

const CreateUserForm = () => {

  const initialFormData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
    dob: ''
  }
  const initialNotifData = { 
    success: null, 
    message: null 
  }
  const [notification, setNotification] = useState(initialNotifData);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'dob') {
      value.split("-").reverse().join("-");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData(initialFormData);

    setErrors(null);
    setNotification(initialNotifData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosClient.post('/user/create', formData)
      .then((res)=>{
        setErrors(null);
        setNotification({
          'message': res.data.message,
          'success': res.status === 200 && res.data.status === "Success",
        });        
      })
      .catch((error)=>{
        if (error.response && error.response.status === 422) {
          setNotification(initialNotifData);
          setErrors(error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      })
  };

  return (
<div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="mt-3">

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

      {errors && (
        <div className="alert alert-danger">
          {Object.keys(errors).map((field) => (
            <small key={field} className="d-block mb-1">
              {errors[field].join(' ')}
            </small>
          ))}
        </div>
      )}


      <div className="row">
      <div className="mb-3 col-md-6">
        <label className="form-label">
          First Name:
        </label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
      </div>

      <div className="mb-3 col-md-6">
        <label className="form-label">
          Last Name:
        </label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
      </div>
      

      <div className="mb-3 col-md-6">
        <label className="form-label">
          Email:
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
      </div>

      <div className="mb-3 col-md-6">
        <label className="form-label">
          Phone:
          </label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
      </div>

      <div className="mb-3 col-md-6">
        <label className="form-label">
          Date of Birth:
          </label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
      </div>

      <div className="mt-2 col-md-6">
        <label className="d-block">Gender:</label>
        <div className="form-check form-check-inline mt-2">
          <input
            type="radio"
            className="form-check-input"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            className="form-check-input"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
          />
          <label className="form-check-label">Female</label>
        </div>
      </div>


      </div>

      <div className="mb-3 mt-4 d-flex justify-content-center">
        <button type="button" onClick={handleReset} className="btn btn-secondary me-2 w-25">
          Reset
        </button>
        <button type="submit" className="btn btn-primary w-25">
          Submit
        </button>
      </div>

      </form>

      </div>

  );
};

export default CreateUserForm;
