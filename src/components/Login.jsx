import React, { useState } from 'react';
    import { Link } from 'react-router-dom';

    function Login({ onLogin }) {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
      };

      return (
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            <Link to="/register">Register</Link> | <Link to="/reset-password">Reset Password</Link>
          </p>
        </div>
      );
    }

    export default Login;
