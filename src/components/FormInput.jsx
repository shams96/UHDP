import React from 'react';

    // Reusable FormInput component for text inputs
    function FormInput({ label, id, name, type = 'text', onChange, onBlur, value, touched, error }) {
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <input
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
          {touched && error && <div className="error-message">{error}</div>}
        </div>
      );
    }

    export default FormInput;
