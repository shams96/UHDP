import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import DataCollectionForm from './components/DataCollectionForm';
import Navigation from './components/Navigation';
import UserManagement from './components/UserManagement';
import Registration from './components/Registration';
import ResetPassword from './components/ResetPassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'password', role: 'Admin' },
  ]);
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleRegister = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    navigate('/login');
  };

  const handleResetPassword = (username, newPassword) => {
    const updatedUsers = users.map((user) => {
      if (user.username === username) {
        return { ...user, password: newPassword };
      }
      return user;
    });
    setUsers(updatedUsers);
    navigate('/login');
  };

  const handleCreateUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
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
              <UserManagement users={users} onCreateUser={handleCreateUser} /> 
              : <Login onLogin={handleLogin} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
