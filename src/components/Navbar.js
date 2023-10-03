import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login');
        props.showAlert("Logged out successfully.", "danger");
    };
    let location = useLocation();
    return (
        <>
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">iNotebook</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                                </li>
                            </ul>
                            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                                
                                <Link className="btn btn-dark" to="/login" role="button">Login</Link>
                                <Link className="btn btn-dark" to="/signup" role="button">Sign up</Link>
                            </form> : <div><button className="btn btn-dark">Welcome {localStorage.getItem('name')} </button>
                            <button onClick = {handleLogout} className="btn btn-dark">Logout</button></div>}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
