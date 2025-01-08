import React from 'react';
    import { useFormik } from 'formik';
    import * as Yup from 'yup';

    const validationSchema = Yup.object({
      username: Yup.string().required('Username is required'),
      newPassword: Yup.string().required('New password is required').min(6, 'Password must be at least 6 characters'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    function ResetPassword({ onResetPassword }) {
      const formik = useFormik({
        initialValues: {
          username: '',
          newPassword: '',
          confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          onResetPassword(values.username, values.newPassword);
        },
      });

      return (
        <div className="form-container">
          <h2>Reset Password</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div>{formik.errors.newPassword}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      );
    }

    export default ResetPassword;
