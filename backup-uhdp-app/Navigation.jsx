import React from 'react';
    import { Link } from 'react-router-dom';

    function Navigation({ isAuthenticated, onLogout, navigate }) {
      return (
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/data-collection">Data Collection</Link>
                </li>
                <li>
                  <Link to="/user-management">User Management</Link>
                </li>
                <li>
                  <button onClick={() => {
                    onLogout();
                    navigate('/login');
                  }}>Logout</button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      );
    }

    export default Navigation;
