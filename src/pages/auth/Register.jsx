import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import Layout from "../../components/layout/layout";

const Register = () => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ answer, setAnswer ] = useState('');
    const role = "admin";

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('/api/v1/auth/register', { first_name: firstName, last_name: lastName, email, password, answer, role });

          if (!res.data.success) toast.error(res.data.message);
          else {
            toast.success('Registration successful');
            setTimeout(() => navigate('/login'), 2000 );
          }

        } catch (error) {
          console.log('Signup failed', { error });
          toast.error('Failed to register');
        }
    }

  return (
    <Layout title='My-Coaching Management App Register'>
<div className="form-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
      <div className="row mb-3">
          <div className="col-sm-10">
            <input type="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control"  placeholder="Enter first name.." />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input type="name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control"  placeholder="Enter last name.." />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control"  placeholder="Enter email.." />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control"
              placeholder="Enter password.."
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toLowerCase())} 
              className="form-control"
              placeholder="What's your favorite dish?"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="text"
              value="admin"
              className="form-control"
              placeholder="Role"
            />
          </div>
        </div>
        <div className="register-btn">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default Register;
