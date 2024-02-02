import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';

interface Question {
  _id: string;
  text: string;
  choices: string[];
  correctAnswer: string;
}

const TakeExam: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { examNumber } = useParams<{ examNumber: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Question[]>(`http://localhost:5000/api/exam/${examNumber}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [examNumber]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: event.target.value
    }));
  };

  const handleSubmitExam = () => {
    let score = 0;
    questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        score += 1;
      }
    });
    
    // Here you can navigate to a results page or handle the score display as needed
    // For example:
    navigate(`/exam/${examNumber}/results`, { state: { score } });
  };

  

  return (
    <Container>
      <Typography variant="h4">Exam {examNumber}</Typography>
      {questions.map((question) => (
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
      <Button variant="contained" color="primary" onClick={handleSubmitExam}>
        Finish Exam
      </Button>
    </Container>
  );
};

export default TakeExam;