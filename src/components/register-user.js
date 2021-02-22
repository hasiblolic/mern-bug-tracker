import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../actions/authActions.js';
import { Link, Redirect, useHistory, withRouter } from 'react-router-dom';

import Form from './form.js';

const initialState = {
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
}

const RegisterUser = () => {
    const [form, setForm] = useState(initialState);
    const [isRegistration, setIsRegistration] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const errors = useSelector(state => state.errors);

    const history = useHistory;
    
    // static getDerivedStateFromProps(nextProps, prevState) {
        //     if(nextProps.errors !== prevState.errors) {
            //         return ({ errors: nextProps.errors });
            //     }
            //     return null;
            // }
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsRegistration((prevIsRegistration) => !prevIsRegistration)
        setShowPassword(false);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if(isRegistration) {
            const user = {
                username: form.username,
                email: form.email,
                password: form.password,
                password2: form.password2,
            };
    
            dispatch(registerUser(user));
        } else {
            const body = {
                email: form.email,
                password: form.password
            }
            dispatch(loginUser(body));
        }
    }
    
    if(auth.isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form noValidate onSubmit={handleSubmit}>
                {isRegistration && (
                    <Form
                        label="Username"
                        type="text"
                        name="username"
                        errors={errors.username}
                        handleChange={handleChange}
                    />
                )}
                <Form
                    label="Email"
                    type="email"
                    name="email"
                    errors={errors.email}
                    handleChange={handleChange}
                />
                <Form
                    label="Password"
                    type="password"
                    name="password"
                    errors={errors.password}
                    handleChange={handleChange}
                />
                { isRegistration && (
                    <Form
                        label="Confirm Password"
                        type="password"
                        name="password2"
                        errors={errors.password2}
                        handleChange={handleChange}
                    />
                )}
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">{isRegistration ? 'Sign Up' : 'Sign In'}</button>
                </div>
            </form>
            <button className="btn btn-primary" onClick={switchMode}>
                { isRegistration ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
            </button>
        </div>
    );
}

export default RegisterUser;