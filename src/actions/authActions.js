import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import * as api from '../utils/api.js';

import validator from 'validator';
import isEmpty from 'is-empty';

import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    GET_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

export const loadUser = () => async dispatch => {
    try {
      const res = await api.getUserByToken().catch(err => {
        console.log("There was an error with authentication");
        console.log(err);
        dispatch({ type: AUTH_ERROR });
      });
      console.log(res.data);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
}

// Register User
export const registerUser = formData => async dispatch => {
    const { errors, isValid } = validateRegisterInput(formData);
      if(!isValid) {
          dispatch({
              type: GET_ERRORS,
              payload: errors,
          });
          return;
      }

    try {
      const res = await api.createUser(formData);
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(loadUser());
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: errors });
      dispatch({ type: REGISTER_FAIL });
    }
};

// Login - get user token
export const loginUser = (body) => async dispatch => {
    const { errors, isValid } = validateLoginInput(body);
    if(!isValid) {
        dispatch({
            type: GET_ERRORS,
            payload: errors,
        });
        return;
    }

    try {
      const res = await api.loginUser(body).catch(err => {
        console.log(err);
        errors.credentials = 'Invalid credentials';
        dispatch({
          type: GET_ERRORS,
          payload: errors
        });
      });
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
      });
      
      dispatch({
        type: GET_ERRORS,
        payload: errors
      })
    }
};

export const logoutUser = () => ({ type: LOGOUT });


export function validateRegisterInput(data) {
    let errors = {};

    // convert empty fields into string
    data.username = !isEmpty(data.username) ? data.username: '';
    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';
    data.password2 = !isEmpty(data.password2) ? data.password2: '';

    // empty input field checks
    if(validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }

    if(validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required';
    }


    // password is not long enough or too long
    if(!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if(!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords do not match. Please make sure that the passwords are matching.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';

    // email checks
    // if email is empty
    if(validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } 
    // if email input isn't really an email
    else if(!validator.isEmail(data.email)) {
        errors.email = 'Email is not a valid email';
    }

    // password check
    if(validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}