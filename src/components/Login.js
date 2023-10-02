import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const host = "http://localhost:5000";
    
    const handleSubmit = async (event) => {
        try {
            console.log("client1");
            event.preventDefault();
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
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
