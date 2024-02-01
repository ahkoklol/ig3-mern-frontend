import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Link, Outlet } from 'react-router-dom';
import { useLogout } from './hooks/useLogout';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';

const theme = createTheme(); // Create the Material-UI theme

function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <div>
          <Link to="/">Home</Link>
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/signup">Signup</Link>}
          {user && (
            <Link to={`/user/profile/${user._id}`}>Profile</Link>
          )}
        </div>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Outlet />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

