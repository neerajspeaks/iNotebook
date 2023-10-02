import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useStaterequired minLength = { 5}({ name: "", email: "", password: "", cpassword: "" });
  const host = "http://localhost:5000";

  const handleSubmit = async (event) => {
    try {
      console.log("client1");
      event.preventDefault();
      const { name, email, password } = credentials;
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });
      console.log("client2");
      const json = await response.json();
      console.log("client3");
      console.log(json);
      if (json.success) {
        console.log(JSON.stringify(json));
        localStorage.setItem('token', json.authToken);
        navigate('/');
      } else {
        alert('Invalid Credentials.');
      }
      console.log("client4");
    } catch (error) {
      console.log("Error occuured while loggin in., Error : " + error);
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label forHtml="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div class="mb-3">
          <label forHtml="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div class="mb-3">
          <label forHtml="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" name="password" onChange={handleChange} minLength={5} required />
        </div>
        <div class="mb-3">
          <label forHtml="cpassword" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="cpassword" name="cpassword" onChange={handleChange} minLength={5} required />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
