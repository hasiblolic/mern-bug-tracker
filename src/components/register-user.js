import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions.js';
import { Link, Redirect, withRouter } from 'react-router-dom';

class RegisterUser extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: {},
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.errors !== prevState.errors) {
            return ({ errors: nextProps.errors });
        }
        return null;
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

        this.props.registerUser(user);
    }

    render() {
        const errors = this.props.errors;
        if(this.props.auth.isAuthenticated) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div>
                <h3>Create New User</h3>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group needs-validation">
                        <label htmlFor="" className="form-label">Username: </label>
                        <div className="form-error-message">{errors.username}</div>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            id="username"
                            error={errors.username}
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group has-validation">
                        <label htmlFor="" className="form-label">Email: </label>
                        <div className="form-error-message">{errors.email}</div>
                        <input 
                            type="email"
                            required
                            className="form-control"
                            id="email"
                            error={errors.email}
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group has-validation">
                        <label htmlFor="" className="form-label">Password: </label>
                        <div className="form-error-message">{errors.password}</div>
                        <input 
                            type="password"
                            required
                            className="form-control"
                            id="password"
                            error={errors.password}
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group has-validation">
                        <label htmlFor="" className="form-label">Confirm password: </label>
                        <div className="form-error-message">{errors.password2}</div>
                        <input 
                            type="password"
                            required
                            className="form-control"
                            id="password2"
                            error={errors.password2}
                            value={this.state.password2}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
                <p>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    errors: state.errorReducer,
});

export default connect(
    mapStateToProps,
    { registerUser }
) (withRouter(RegisterUser));
