import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, RadioGroup, FormControlLabel, Radio, CircularProgress, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';

interface Question {
  _id: string;
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
  imagePath?: string;
  audioPath?: string;
}

interface ExamData {
  _id: string;
  examNumber: number;
  questions: string[];
  time: number;
}
/*
interface ScoreData {
    examNumber: number;
    questions: number;
    score: number;
    date: Date;
    student: string;
}*/

const TakeExam: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const { examNumber } = useParams<{ examNumber: string }>();
  const [timer, setTimer] = useState<number | null>(null);

  const { user } = useAuthContext();
  //console.log('user:', user) //ok

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const examResponse = await axios.get<ExamData>(`${import.meta.env.VITE_BACKEND_URL}/api/exam/${examNumber}`);
        setTimer(examResponse.data.time); // Set the timer with the fetched exam time
        const examQuestions = await Promise.all(
          examResponse.data.questions.map(questionId =>
            axios.get<Question>(`${import.meta.env.VITE_BACKEND_URL}/api/question/${questionId}`)
          )
        );
        setQuestions(examQuestions.map(res => res.data));
      } catch (error) {
        console.error('Error fetching exam:', error);
      } finally {
        setLoading(false);
      }
    };

    if (examNumber) {
      fetchExam();
    }
  }, [examNumber]);

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t! - 1);
      }, 1000);
    } else if (timer === 0) {
      handleSubmitExam();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: event.target.value
    }));
  };

  const handleSubmitExam = async () => {
    let newScore = 0;
    questions.forEach(question => {
        if (answers[question._id] === question.correctAnswer) {
            newScore += 1;
        }
    });
    setScore(newScore); // Set the final score
    setShowResults(true); // Show the results

    // Before using examNumber, ensure it's defined and is a string
    const parsedExamNumber = examNumber ? parseInt(examNumber, 10) : null;

    if (parsedExamNumber === null) {
        console.error('Exam number is not defined');
        return;
    }

    // Ensure there's a user before attempting to submit the score
    if (user && user._id) {
        const scoreData = {
            examNumber: parsedExamNumber, // Make sure examNumber is parsed to a number if it's not already
            questions: questions.length,
            score: newScore,
            date: new Date(), // This will automatically be converted to the appropriate format (ISO string) when sent as JSON
            student: user._id // Use the user's _id from the context
        };

        // Post the score data to the backend
        try {
            /*const response = */await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/score/create`, scoreData);
            toast.info(`Well done you have submitted the exam! Check your score at the top of the page!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        } catch (error) {
            console.error('Error submitting score:', error);
            toast.error('Failed to submit score. Please try again later.');
        }
    } else {
        console.error('No user found. Score not submitted.');
        toast.error('You must be logged in before attemting the exam.');
    }
};

  if (loading) {
    return <CircularProgress />;
  }

  if (showResults) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h3" gutterBottom sx={{ color: 'black', marginBottom: '40px', marginTop: '50px' }}>Your Score: {score}/{questions.length}</Typography>
        {questions.map((question/*, questionIndex */) => (
          <Box key={question._id} component={Paper} elevation={3} sx={{ p: 2, mt: 2, marginBottom: '30px' }}>
            <Typography variant="h5" gutterBottom>{question.text}</Typography>
            {/* Conditionally render the image if imagePath is present */}
            {question.imagePath && (
              <img src={`${import.meta.env.VITE_BACKEND_URL}/${question.imagePath}`} alt="Question" style={{ maxWidth: '100%', marginBottom: '20px', marginTop: '20px' }} />
            )}
            {question.choices.map((choice, index) => (
              <Button
                key={index}
                fullWidth
                variant={answers[question._id] === choice ? (choice === question.correctAnswer ? "contained" : "contained") : "contained"}
                color={choice === question.correctAnswer ? "success" : (answers[question._id] === choice ? "error" : "primary")}
                sx={{ justifyContent: "flex-start", mb: 1, textTransform: "none" }}
              >
                {choice}
              </Button>
            ))}
            <Typography 
                variant="subtitle1" 
                sx={{ 
                    mt: 2, 
                    // If an answer is selected, and it's incorrect, force text color to red
                    // If no answer is selected, force text color to red as well
                    // Otherwise, keep it primary (which could be a neutral color)
                    color: (answers[question._id] && answers[question._id] !== question.correctAnswer) || !answers[question._id] ? 'error.main' : 'black', 
                    textAlign: 'justify' 
                }}
                >
                {question.teacherCorrection}
            </Typography>
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={() => setShowResults(false)} href="/exams" sx={{mb:4, backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>
          Take Another Exam
        </Button>
      </Container>
    );
  }
  
  return (
    <Container sx={{ marginBottom: '20px' }}>
      <Typography variant="h4" sx={{ marginTop: '50px', marginBottom: '20px', color: 'black' }}>Exam {examNumber}</Typography>
      <Typography variant="h1" sx={{color: 'red', marginBottom: '30px'}}>{timer ? `${Math.floor(timer / 60)}:${`0${timer % 60}`.slice(-2)}` : '00:00'}</Typography>
      {questions.map(question => (
        <Card key={question._id} variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography>{question.text}</Typography>
            {/* Conditionally render the image if imagePath is present */}
            {question.imagePath && (
              <img src={`${import.meta.env.VITE_BACKEND_URL}/${question.imagePath}`} alt="Question" style={{ maxWidth: '100%', marginBottom: '20px', marginTop: '20px' }} />
            )}
            {/* Conditionally render the audio if audioPath is present */}
            {question.audioPath && (
              <audio controls src={`${import.meta.env.VITE_BACKEND_URL}/${question.audioPath}`} style={{ width: '100%', marginBottom: '20px' }} />
            )}
            <RadioGroup
              value={answers[question._id] || ''}
              onChange={(event) => handleAnswerChange(event, question._id)}
            >
              {question.choices.map((choice, index) => (
                <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmitExam} sx={{backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>
        Finish Exam
      </Button>
    </Container>
  );
};

export default TakeExam;