import React from 'react';

const Form = ({ name, handleChange, label, type, errors }) => (
    <div className="form-group has-validation">
        <label htmlFor="" className="form-label">{label} </label>
        <div className="form-error-message">{errors}</div>
        <input 
            name={name}
            type={type}
            onChange={handleChange}
            required
            className="form-control"
        />
    </div>
   
);

export default Form;