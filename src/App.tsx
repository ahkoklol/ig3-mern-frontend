import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chat from './components/Chat';
import socket from './socket.ts';
import { ToastContainer } from 'react-toastify';

const client = socket;

const theme = createTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div>
        <ToastContainer />
        <Navbar />
        
          <div>
            <Outlet />
          </div>
        <Chat />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

