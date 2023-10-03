import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const host = "http://localhost:5000";
    
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                localStorage.setItem('name', json.name);
                console.log("username : " + json.name);
                navigate('/');
                props.showAlert("Logged in Successfully.", "success");
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
        <div className="container mt-3">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
