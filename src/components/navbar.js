import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';

const Navbar = () => {
    const dispatch = useDispatch(logoutUser);
    const auth = useSelector(state => state.auth);

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggler01" aria-expanded="false" aria-label="Toggle navigation">

                </button>
                <Link to="/" className="navbar-brand">Bug Tracker</Link>
                <div className="collapse navbar-collapse" id="navbar-toggler01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Create Bug Tracker</Link>
                        </li>
                        {
                            // TODO: Display user's icon/profile picture, link to profile settings etc
                        }
                        <li className="nav-item right-align">
                            <Link 
                                to={auth.isAuthenticated ? "/logout" : "/auth"}
                                onClick={auth.isAuthenticated && dispatch(logoutUser())}
                                className="nav-link">{auth.isAuthenticated ? "Log Out" : "Log In"}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            
        </nav>
    );
}

export default Navbar;