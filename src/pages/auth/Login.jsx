import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Layout from "../../components/layout/layout";
import '../../styles/auth.css';
import { useAuth } from "../../context/auth";
import LoginApi from "../../utils/auth/LoginApi";

const Login = () => {
  const [ auth, setAuth ] = useAuth();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await LoginApi(email, password);

        if (!res.data.success) toast.error(res.data.message);
        else {
          setAuth({
            ...auth,
            user: res.data.user,
            role: res.data.role,
            token: res.data.token
          });
          localStorage.setItem('auth', JSON.stringify(res.data));
          toast.success('Login successful');
          setTimeout(() => {
            navigate(location.state || '/');
          }, 2000 );
        }

      } catch (error) {
        console.log('Login failed', { error });
        toast.error('Failed to login');
      }
  }
  return (
    <Layout title='My-Coaching Management Login'>
<div className="form-container">
      <ToastContainer />
      <form>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"  placeholder="Enter email.." />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter password.."
            />
          </div>
        </div>
        <div className="register-btn">
        <button onClick={handleLogin} className="btn btn-primary">
          Log in
        </button>
        <NavLink className="btn btn-primary" style={{backgroundColor:"#404040"}} to="/forgot-password">Forgot Password</NavLink>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default Login;
