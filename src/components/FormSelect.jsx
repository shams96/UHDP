import React from 'react';

    // Reusable FormSelect component for select inputs
    function FormSelect({ label, id, name, onChange, onBlur, value, touched, error, children }) {
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <select
            id={id}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          >
            {children}
          </select>
          {touched && error && <div className="error-message">{error}</div>}
        </div>
      );
    }

    export default FormSelect;
