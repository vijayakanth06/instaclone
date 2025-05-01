import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { jwtDecode } from 'jwt-decode'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://instaclone-8585.onrender.com/login', formData);
      
      const token = response.data.token;
      const decoded = jwtDecode(token);
      const username = decoded.username;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      navigate('/'); 
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Invalid username or password');
    }
  };

  return (
    <div id="logbody" style={{ backgroundImage: "url(../images/llo.jpg)" }}>
      <link rel="icon" href="../public/images/dc_lo.jpeg" />
      <div className="logininmain">
        <img src="../images/dc_lo.jpeg" id="logimg" alt="logo" height="100" width="100" />
        <h1 id="logh1">DCGRAM</h1>
        <h3>Enter your login credentials</h3>
        <form method="post" id="Form1" name="form1" onSubmit={handleSubmit}>
          <label id="loglabel" htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your Username" required onChange={handleChange} />

          <label id="loglabel" htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your Password" required onChange={handleChange} />

          <div className="logininwrap">
            <button type="submit" className='logbutton'>Login</button>
          </div>
        </form>
        <p id="logp">Not registered? <a id="loga" href="/signup">Create an account</a></p>
      </div>
    </div>
  );
};

export default Login;
