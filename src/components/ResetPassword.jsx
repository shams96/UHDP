import React, { useState } from 'react';
    import { useFormik } from 'formik';
    import * as Yup from 'yup';
    import FormInput from './FormInput';

    // Define the validation schema for the form
    const validationSchema = Yup.object({
      username: Yup.string().required('Username is required'),
      newPassword: Yup.string().required('New password is required').min(6, 'Password must be at least 6 characters'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    // ResetPassword component for resetting user passwords
    function ResetPassword({ onResetPassword }) {
      // State variables for error messages and loading
      const [errorMessage, setErrorMessage] = useState(null);
      const [loading, setLoading] = useState(false);

      // Initialize formik for form management
      const formik = useFormik({
        initialValues: {
          username: '',
          newPassword: '',
          confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          setLoading(true);
          try {
            await onResetPassword(values.username, values.newPassword);
            setErrorMessage(null);
            console.log('Password reset successfully:', { username: values.username });
          } catch (error) {
            setErrorMessage('An error occurred while resetting password.');
            console.error('Error during password reset:', error);
          } finally {
            setLoading(false);
          }
        },
      });

      return (
        <div className="form-container">
          <h2>Reset Password</h2>
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
              label="New Password"
              id="newPassword"
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              touched={formik.touched.newPassword}
              error={formik.errors.newPassword}
            />
            <FormInput
              label="Confirm New Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              touched={formik.touched.confirmPassword}
              error={formik.errors.confirmPassword}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
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

    export default ResetPassword;
