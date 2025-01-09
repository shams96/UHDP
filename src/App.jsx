import React, { useState, useEffect } from 'react';
    import { Route, Routes, useNavigate } from 'react-router-dom';
    import Dashboard from './components/Dashboard';
    import Login from './components/Login';
    import DataCollectionForm from './components/DataCollectionForm';
    import Navigation from './components/Navigation';
    import UserManagement from './components/UserManagement';
    import Registration from './components/Registration';
    import ResetPassword from './components/ResetPassword';

    // Main App component
    function App() {
      // State variables for authentication and users
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [users, setUsers] = useState([]);
      const navigate = useNavigate();

      // Load users from localStorage on component mount
      useEffect(() => {
        try {
          const storedUsers = localStorage.getItem('uhdp-users');
          if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
          }
        } catch (error) {
          console.error('Error loading users from localStorage:', error);
        }
      }, []);

      // Handle login
      const handleLogin = async (username, password) => {
        try {
          const storedUsers = localStorage.getItem('uhdp-users');
          if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const user = users.find((u) => u.username === username && u.password === password);
            if (user) {
              setIsAuthenticated(true);
              navigate('/');
              return;
            }
          }
          throw new Error('Invalid credentials');
        } catch (error) {
          console.error('Error during login:', error);
          throw error;
        }
      };

      // Handle logout
      const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/login');
      };

      // Handle registration
      const handleRegister = async (newUser) => {
        try {
          const storedUsers = localStorage.getItem('uhdp-users');
          let users = [];
          if (storedUsers) {
            users = JSON.parse(storedUsers);
          }
          const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
          localStorage.setItem('uhdp-users', JSON.stringify(updatedUsers));
          setUsers(updatedUsers);
          navigate('/login');
          console.log('User registered successfully:', newUser);
        } catch (error) {
          console.error('Error during registration:', error);
          throw error;
        }
      };

      // Handle reset password
      const handleResetPassword = async (username, newPassword) => {
        try {
          const storedUsers = localStorage.getItem('uhdp-users');
          if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const updatedUsers = users.map((user) => {
              if (user.username === username) {
                return { ...user, password: newPassword };
              }
              return user;
            });
            localStorage.setItem('uhdp-users', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            navigate('/login');
            console.log('Password reset successfully:', { username });
          }
        } catch (error) {
          console.error('Error during password reset:', error);
          throw error;
        }
      };

      // Handle create user
      const handleCreateUser = async (newUser) => {
        try {
          const storedUsers = localStorage.getItem('uhdp-users');
          let users = [];
          if (storedUsers) {
            users = JSON.parse(storedUsers);
          }
          const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
          localStorage.setItem('uhdp-users', JSON.stringify(updatedUsers));
          setUsers(updatedUsers);
          console.log('User created successfully:', newUser);
        } catch (error) {
          console.error('Error creating user:', error);
          throw error;
        }
      };

      return (
        <div>
          <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} navigate={navigate} />
          <div className="container">
            <Routes>
              <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Registration onRegister={handleRegister} />} />
              <Route path="/reset-password" element={<ResetPassword onResetPassword={handleResetPassword} />} />
              <Route path="/data-collection" element={isAuthenticated ? <DataCollectionForm /> : <Login onLogin={handleLogin} />} />
              <Route
                path="/user-management"
                element={isAuthenticated ?
                  <UserManagement users={users} onCreateUser={handleCreateUser} setUsers={setUsers} />
                  : <Login onLogin={handleLogin} />
                }
              />
            </Routes>
          </div>
        </div>
      );
    }

    export default App;
