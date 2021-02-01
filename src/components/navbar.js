import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Bug Tracker</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Trackers</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Bug Tracker</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}