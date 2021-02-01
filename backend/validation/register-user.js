import validator from 'validator';
import isEmpty from 'is-empty';
import User from '../models/user.model.js';

export default function validateRegisterInput(data) {
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

    // username not long enough
    if(!validator.isLength(data.username, { min: 6, max: 30 })) {
        errors.username = "Username is not long enough - must be between 6 and 30 characters";
    }

    // username is taken
    User.findOne({ username: data.username }).then(user => {
        if(user) {
            //username is already taken, need to pick a different one
            errors.username = "Username is taken, please choose a different username";
        }
    });


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