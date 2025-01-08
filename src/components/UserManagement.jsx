import React, { useState } from 'react';
    import { useFormik } from 'formik';
    import * as Yup from 'yup';

    const validationSchema = Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      role: Yup.string().required('Role is required'),
    });

    function UserManagement({ users, onCreateUser }) {
      const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
          role: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          onCreateUser(values);
          formik.resetForm();
        },
      });

      return (
        <div>
          <h2>User Management</h2>
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.username}</strong> - {user.role}
              </li>
            ))}
          </ul>
          <div className="form-container">
            <h3>Create New User</h3>
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                >
                  <option value="">Select Role</option>
                  <option value="Fieldworker">Fieldworker</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Admin">Admin</option>
                </select>
                {formik.touched.role && formik.errors.role ? (
                  <div>{formik.errors.role}</div>
                ) : null}
              </div>
              <button type="submit">Create User</button>
            </form>
          </div>
        </div>
      );
    }

    export default UserManagement;
