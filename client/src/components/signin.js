import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/signin.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobno: ''
  });

  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
    }
  };

  return (
    <div id="signbody" style={{ backgroundImage: "url(../images/sig.jpg)" }}>
      <div className="signinmain">
        <img src="../images/dclo.jpeg" alt="logo" height="100" width="100" />
        <h1>DCGRAM</h1>
        <h3>Enter your credentials</h3>
        <form method="post" id="Form2" name="form2" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" required onChange={handleChange} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required onChange={handleChange} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required onChange={handleChange} />

          <label htmlFor="mobno">Mobile Number:</label>
          <input type="tel" id="mobno" name="mobno" placeholder="Enter your Mobile Number" required maxLength="10" minLength="10" onChange={handleChange} /><br />

          <div className="signinwrap">
            <button type="submit" className='sigbutton'>Sign in</button>
          </div>
          <p id="sigp">Already Have an account? <a id="siga" href="/login">Login</a></p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
