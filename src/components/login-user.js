import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions.js';
import { computeHeadingLevel } from '@testing-library/react';

class LoginUser extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        // push user to dashboard if they are authenticated
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.auth.isAuthenticated) {
            // push user to dashboard if they are authenticated
            nextProps.history.push("/dashboard");
        }

        if(nextProps.errors !== prevState.errors) {
            return ({ errors: nextProps.errors });
        }
        return null;
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const body = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(body);
    }

    render() {
        
        if(this.props.auth.isAuthenticated) {
            return <Redirect to="/dashboard" />;
        }
        
        const { errors } = this.state;
        if(errors.credentials) {
            errors.forgotUsername = "Forgot your username/password?";
        }

        return (
            <div>
                <h3>Login</h3>
                <form noValidate onSubmit={this.onSubmit}>
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
                    <div className="form-error-message">{errors.credentials}</div>
                    <div className="form-error-message">{errors.forgotUsername}</div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    errors: state.errorReducer
});

export default connect(
    mapStateToProps,
    { loginUser }
)(LoginUser);