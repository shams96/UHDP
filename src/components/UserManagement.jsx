import React, { useState } from 'react';
    import { useFormik } from 'formik';
    import * as Yup from 'yup';
    import FormInput from './FormInput';
    import FormSelect from './FormSelect';

    // Define the validation schema for the form
    const validationSchema = Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      role: Yup.string().required('Role is required'),
    });

    // UserManagement component for managing users
    function UserManagement({ users, onCreateUser, setUsers }) {
      // State variables for edit user ID, edit form values, error messages, and loading
      const [editUserId, setEditUserId] = useState(null);
      const [editFormValues, setEditFormValues] = useState({
        username: '',
        password: '',
        role: '',
      });
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
            await onCreateUser(values);
            formik.resetForm();
            setErrorMessage(null);
            console.log('User created successfully:', values);
          } catch (error) {
            setErrorMessage('An error occurred while creating user.');
            console.error('Error creating user:', error);
          } finally {
            setLoading(false);
          }
        },
      });

      // Handle edit user
      const handleEditUser = (user) => {
        setEditUserId(user.id);
        setEditFormValues({
          username: user.username,
          password: user.password,
          role: user.role,
        });
      };

      // Handle update user
      const handleUpdateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const updatedUsers = users.map((user) =>
            user.id === editUserId ? { ...user, ...editFormValues } : user
          );
          localStorage.setItem('uhdp-users', JSON.stringify(updatedUsers));
          setUsers(updatedUsers);
          setEditUserId(null);
          setErrorMessage(null);
          console.log('User updated successfully:', { userId: editUserId, updatedValues: editFormValues });
        } catch (error) {
          setErrorMessage('An error occurred while updating user.');
          console.error('Error updating user:', error);
        } finally {
          setLoading(false);
        }
      };

      // Handle delete user
      const handleDeleteUser = async (userId) => {
        setLoading(true);
        try {
          const updatedUsers = users.filter((user) => user.id !== userId);
          localStorage.setItem('uhdp-users', JSON.stringify(updatedUsers));
          setUsers(updatedUsers);
          setErrorMessage(null);
          console.log('User deleted successfully:', { userId });
        } catch (error) {
          setErrorMessage('An error occurred while deleting user.');
          console.error('Error deleting user:', error);
        } finally {
          setLoading(false);
        }
      };

      // Handle edit form change
      const handleEditFormChange = (e) => {
        setEditFormValues({ ...editFormValues, [e.target.name]: e.target.value });
      };

      return (
        <div>
          <h2>User Management</h2>
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id}>
                {editUserId === user.id ? (
                  <form onSubmit={handleUpdateUser}>
                    <FormInput
                      label="Username"
                      id="editUsername"
                      name="username"
                      value={editFormValues.username}
                      onChange={handleEditFormChange}
                    />
                    <FormInput
                      label="Password"
                      id="editPassword"
                      name="password"
                      type="password"
                      value={editFormValues.password}
                      onChange={handleEditFormChange}
                    />
                    <FormSelect
                      label="Role"
                      id="editRole"
                      name="role"
                      value={editFormValues.role}
                      onChange={handleEditFormChange}
                    >
                      <option value="">Select Role</option>
                      <option value="Fieldworker">Fieldworker</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Admin">Admin</option>
                    </FormSelect>
                    <button type="submit" disabled={loading}>
                      {loading ? 'Updating...' : 'Update'}
                    </button>
                    <button type="button" onClick={() => setEditUserId(null)}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <strong>{user.username}</strong> - {user.role}
                    <button onClick={() => handleEditUser(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="form-container">
            <h3>Create New User</h3>
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
                {loading ? 'Creating...' : 'Create User'}
              </button>
            </form>
          </div>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      );
    }

    export default UserManagement;
