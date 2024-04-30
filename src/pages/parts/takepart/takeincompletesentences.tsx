import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, RadioGroup, FormControlLabel, Radio, CircularProgress, Box, Paper } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Question {
  _id: string;
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
}

interface PartData {
  category: string;
    part: string;
    ref: string;
    questions: string[];
    time: number;
}

const TakeIncompleteSentences: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [score, setScore] = useState<number | null>(null);
    const [showResults, setShowResults] = useState<boolean>(false);
    const { ref } = useParams<{ ref: string }>();
    const [timer, setTimer] = useState<number | null>(null);
  
    useEffect(() => {
        const fetchExam = async () => {
          try {
            const examResponse = await axios.get<PartData>(`${import.meta.env.VITE_BACKEND_URL}/api/part/${ref}`);
            
            setTimer(examResponse.data.time); // Set the timer with the fetched exam time OK
            setQuestions(examResponse.data.questions as unknown as Question[]); // Cast directly to Question[]
          } catch (error) {
            console.error('Error fetching exam:', error);
          } finally {
            setLoading(false);
          }
        };
      
        if (ref) {
          fetchExam();
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
      toast.success("Well done on completing the practice!");
    };
  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (showResults) {
      return (
        <Container maxWidth="sm">
          <Typography variant="h3" gutterBottom sx={{ color: 'black', marginBottom: '40px', marginTop: '50px' }}>Your Score: {score}/{questions.length}</Typography>
          {questions.map((question/*, questionIndex*/) => (
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
          <Button variant="contained" color="primary" onClick={() => setShowResults(false)} href="/practice" sx={{mb:4, backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>
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

  export default TakeIncompleteSentences;