import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const host = "http://localhost:5000";

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { name, email, password } = credentials;
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate('/');
        props.showAlert("Account created successfully.", "success");
      } else {
        props.showAlert("Invalid Credentials.", "danger");
      }
    } catch (error) {
      console.log("Error occuured while loggin in., Error : " + error);
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <h2 className = "my-2">Create an account to continue to iNotebook</h2>
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
