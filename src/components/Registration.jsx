import React, { useState } from 'react';
    import { useFormik } from 'formik';
    import * as Yup from 'yup';
    import FormInput from './FormInput';
    import FormSelect from './FormSelect';

    // Define the validation schema for the form
    const validationSchema = Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
      role: Yup.string().required('Role is required'),
    });

    // Registration component for registering new users
    function Registration({ onRegister }) {
      // State variables for error messages and loading
      const [errorMessage, setErrorMessage] = useState(null);
      const [loading, setLoading] = useState(false);

      // Initialize formik for form management
      const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
          role: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          setLoading(true);
          try {
            await onRegister(values);
            setErrorMessage(null);
            console.log('User registered successfully:', values);
          } catch (error) {
            setErrorMessage('An error occurred during registration.');
            console.error('Error during registration:', error);
          } finally {
            setLoading(false);
          }
        },
      });

      return (
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              label="Username"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              touched={formik.touched.username}
              error={formik.errors.username}
            />
            <FormInput
              label="Password"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              touched={formik.touched.password}
              error={formik.errors.password}
            />
            <FormSelect
              label="Role"
              id="role"
              name="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              touched={formik.touched.role}
              error={formik.errors.role}
            >
              <option value="">Select Role</option>
              <option value="Fieldworker">Fieldworker</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Admin">Admin</option>
            </FormSelect>
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      );
    }

    export default Registration;
