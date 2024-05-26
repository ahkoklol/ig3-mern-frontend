import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, RadioGroup, FormControlLabel, Radio, CircularProgress, Box, Paper } from '@mui/material';
import axiosInstance from '../../../axiosInstance';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

interface Question {
  _id: string;
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
  imagePath?: string;
  audioPath?: string;
}

interface PartData {
  category: string;
  part: string;
  ref: string;
  questions: Question[];
  time: number;
}

const TakePart: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const { ref } = useParams<{ ref: string }>();
  const [timer, setTimer] = useState<number | null>(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchPart = async () => {
      try {
        const partResponse = await axiosInstance.get<PartData>(`/api/part/${ref}`);
        setTimer(partResponse.data.time); // Set the timer with the fetched part time
        setQuestions(partResponse.data.questions); // Directly set questions
      } catch (error) {
        console.error('Error fetching part:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ref) {
      fetchPart();
    }
  }, [ref]);

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

  const handleSubmitExam = () => {
    let newScore = 0;
    questions.forEach(question => {
      if (answers[question._id] === question.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore); // Set the final score
    setShowResults(true); // Show the results
    toast.info("Well done on completing the practice part! Check your result at the top of the page.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (showResults) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h3" gutterBottom sx={{ color: 'black', marginBottom: '40px', marginTop: '50px' }}>Your Score: {score}/{questions.length}</Typography>
        {questions.map((question) => (
          <Box key={question._id} component={Paper} elevation={3} sx={{ p: 2, mt: 2, marginBottom: '30px' }}>
            <Typography variant="h5" gutterBottom>{question.text}</Typography>
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
                    color: (answers[question._id] && answers[question._id] !== question.correctAnswer) || !answers[question._id] ? 'error.main' : 'black', 
                    textAlign: 'justify' 
                }}
                >
                {question.teacherCorrection}
            </Typography>
          </Box>
        ))}
        <Button component={RouterLink} to="/practice" variant="contained" color="primary" onClick={() => setShowResults(false)} sx={{mb:4, backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)', color: 'white' }}}>
          Practice Another Part
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ marginBottom: '20px' }}>
      <Typography variant="h4" sx={{ marginTop: '50px', marginBottom: '20px', color: 'black' }}>Practice Part ref {ref}</Typography>
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
        Finish Practice
      </Button>
    </Container>
  );
};

export default TakePart;
