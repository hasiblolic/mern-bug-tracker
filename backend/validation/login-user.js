import validator from 'validator';
import isEmpty from 'is-empty';

export default function validateLoginInput(data) {
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