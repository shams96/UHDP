import React from 'react';

    // Reusable FormTextarea component for textareas
    function FormTextarea({ label, id, name, onChange, onBlur, value, touched, error }) {
      return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <textarea
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

    export default FormTextarea;
