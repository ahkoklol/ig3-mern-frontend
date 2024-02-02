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
import Profile from './pages/profile.tsx'
import Quickfire from './pages/quickfire.tsx';
import Privacy from './pages/privacy.tsx';
import Terms from './pages/terms.tsx';
import Teacher from './pages/teacher.tsx';
import CreateQuestion from './pages/createquestion.tsx';
import EditQuestion from './pages/editquestion.tsx';


const router = createBrowserRouter(createRoutesFromElements(
  
  <Route path="/" element={<App />}>
    <Route index={true} element={<Home />} />
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
    <Route path="user/profile/:id" element={<Profile />} />
    <Route path="quickfire" element={<Quickfire />} />
    <Route path="privacy-policy" element={<Privacy/>} />
    <Route path="terms-of-use" element={<Terms/>} />
    <Route path="teacher" element={<Teacher />} />
    <Route path="createquestion" element={<CreateQuestion />} />
    <Route path="editquestion" element={<EditQuestion />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);