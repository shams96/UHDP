import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import FormInput from './FormInput';

    // Login component for user authentication
    function Login({ onLogin }) {
      // State variables for username, password, error messages, and loading
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [errorMessage, setErrorMessage] = useState(null);
      const [loading, setLoading] = useState(false);

      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await onLogin(username, password);
          setErrorMessage(null);
          console.log('User logged in successfully:', { username });
        } catch (error) {
          setErrorMessage('Invalid username or password.');
          console.error('Error during login:', error);
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormInput
              label="Password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p>
            <Link to="/register">Register</Link> | <Link to="/reset-password">Reset Password</Link>
          </p>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      );
    }

    export default Login;
