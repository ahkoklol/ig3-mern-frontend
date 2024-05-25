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
import LoggedOutExam from './pages/loggedoutExam.tsx';
import LoggedOutQuickfire from './pages/loggedoutquickfire.tsx';
import LoggedOutPractice from './pages/loggedoutpractice.tsx';
import Exams from './pages/exam.tsx';
import TakeExam from './pages/takeExam.tsx';
import QuickfirePage from './pages/quickfirePage.tsx';
import CreateExam from './pages/createexam.tsx';
import EditExam from './pages/editexam.tsx';
import PracticePage from './pages/practice.tsx';
import IncompleteSentences from './pages/parts/incompletesentences.tsx';
import Conversations from './pages/parts/conversations.tsx';
import Passages from './pages/parts/passages.tsx';
import Photographs from './pages/parts/photographs.tsx';
import Talks from './pages/parts/talks.tsx';
import TakePart from './pages/parts/takepart/takepart.tsx';
import TextCompletion from './pages/parts/textcompletion.tsx';
import QuestionResponse from './pages/parts/questionresponse.tsx';
import CreatePart from './pages/createpart.tsx';
import EditPart from './pages/editpart.tsx';
import ClassesPage from './pages/classes.tsx';
import Classpage from './pages/class.tsx';

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
    <Route path="part/conversations" element={<Conversations />} />
    <Route path="part/passages" element={<Passages />} />
    <Route path="part/photographs" element={<Photographs />} />
    <Route path="part/talks" element={<Talks />} />
    <Route path="part/:ref" element={<TakePart />} />
    <Route path="part/text-completion" element={<TextCompletion />} />
    <Route path="part/question-response" element={<QuestionResponse />} />
    <Route path="createpart" element={<CreatePart />} />
    <Route path="editpart" element={<EditPart />} />
    <Route path="classes" element={<ClassesPage />} />
    <Route path="class/:classId/students" element={<Classpage />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);