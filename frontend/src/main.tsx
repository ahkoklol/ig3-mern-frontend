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
import LoggedOutExam from './pages/loggedOutExam.tsx';
import LoggedOutQuickfire from './pages/loggedOutQuickfire.tsx';
import LoggedOutPractice from './pages/loggedOutPractice.tsx';
import Exams from './pages/exam.tsx';
import TakeExam from './pages/takeExam.tsx';
import QuickfirePage from './pages/quickfirePage.tsx';
import CreateExam from './pages/createexam.tsx';
import EditExam from './pages/editexam.tsx';
import PracticePage from './pages/practice.tsx';
import IncompleteSentences from './pages/parts/incompletesentences.tsx';
import TakeIncompleteSentences from './pages/parts/takepart/takeincompletesentences.tsx';
import CreatePart from './pages/createpart.tsx';
import EditPart from './pages/editpart.tsx';

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
    <Route path="loggedOutExam" element={<LoggedOutExam />} />
    <Route path="loggedOutQuickfire" element={<LoggedOutQuickfire />} />
    <Route path="loggedOutPractice" element={<LoggedOutPractice />} />
    <Route path="exams" element={<Exams />} />
    <Route path="exam/:examNumber" element={<TakeExam />} />
    <Route path="quickfirePage" element={<QuickfirePage />} />
    <Route path="createexam" element={<CreateExam />} />
    <Route path="editexam" element={<EditExam />} />
    <Route path="practice" element={<PracticePage />} />
    <Route path="part/incomplete-sentences" element={<IncompleteSentences />} />
    <Route path="part/:ref" element={<TakeIncompleteSentences />} />
    <Route path="createpart" element={<CreatePart />} />
    <Route path="editpart" element={<EditPart />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);