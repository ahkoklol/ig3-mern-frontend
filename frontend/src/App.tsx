import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Outlet } from 'react-router-dom';
//import { useLogout } from './hooks/useLogout';
//import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';

const theme = createTheme(); // Create the Material-UI theme

function App() {
  //const { logout } = useLogout();
  //const { user } = useAuthContext();
  //console.log(user) //ok

  /* const handleClick = () => {
    logout();
  } */

  return (
    <ThemeProvider theme={theme}>
      <div>
        <ToastContainer />
        <Navbar />
        
          <div>
            <Outlet />
          </div>
        
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

