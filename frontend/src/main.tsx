import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Signup from './pages/signup.tsx';
import Login from './pages/login.tsx';
import Home from './pages/home.tsx';
import { AuthContextProvider } from './context/authContext.tsx';

const router = createBrowserRouter(createRoutesFromElements(
  
  <Route path="/" element={<App />}>
    <Route index={true} element={<Home />} />
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);