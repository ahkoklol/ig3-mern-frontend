import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Question {
  _id: string;
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
  imagePath?: string;
  audioPath?: string;
}

interface AnswerButtonProps {
  choice: string;
  isSelected: boolean;
  isCorrect: boolean;
  showCorrect: boolean; // New property to control when to show the correct answer
  onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({
  choice,
  isSelected,
  isCorrect,
  showCorrect,
  onClick,
}) => {
  let backgroundColor = '#e0e0e0'; // Default color
  let color = 'black'; // Default text color

  if (isSelected) {
    backgroundColor = isCorrect ? '#4caf50' : '#f44336'; // Correct: Green, Incorrect: Red
    color = 'white';
  } else if (showCorrect && isCorrect) {
    // Highlight the correct answer in green only if showCorrect is true
    backgroundColor = '#4caf50';
    color = 'white';
  }

  return (
    <Button
      onClick={onClick}
      fullWidth
      sx={{
        mt: 1,
        backgroundColor,
        color,
        ':hover': {
          backgroundColor,
          opacity: 0.9,
        },
      }}
    >
      {choice}
    </Button>
  );
};

const Quickfire: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRandomQuestion = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<Question>('http://localhost:5000/api/question/65c28aed47691b1b7abeeef7');
      setQuestion(response.data);
      setSelectedAnswer(null); // Reset selected answer for the new question
    } catch (error) {
      console.error('Error fetching random question:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const handleAnswerClick = (choice: string) => {
    // Prevent changing the selected answer if one has already been chosen
    if (selectedAnswer === null) {
        setSelectedAnswer(choice);
      }
  };

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  if (!question) {
    return <Container><Typography variant="h5">Question not found</Typography></Container>;
  }

  const isCorrectSelected = selectedAnswer === question.correctAnswer;

  return (
    <Container maxWidth="sm" sx={{ marginTop: '30px'}}>
        <Typography variant="h3" gutterBottom sx={{color: 'black', marginBottom: '40px'}}>Quickfire</Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2, marginBottom: '50px' }}>
        {/* Conditionally render the image if imagePath is present */}
        {question.imagePath && (
          <img src={`http://localhost:5000/${question.imagePath}`} alt="Question illustration" style={{ maxWidth: '100%', marginBottom: '20px' }} />
        )}

        {/* Conditionally render the audio if audioPath is present */}
        {question.audioPath && (
          <audio controls src={`http://localhost:5000/${question.audioPath}`} style={{ width: '100%', marginBottom: '20px' }} />
        )}
        <Typography variant="h5" gutterBottom>{question.text}</Typography>
        {question.choices.map((choice, index) => (
          <AnswerButton
            key={index}
            choice={choice}
            isSelected={choice === selectedAnswer}
            isCorrect={choice === question.correctAnswer}
            showCorrect={selectedAnswer !== null} // Pass true if any answer is selected
            onClick={() => handleAnswerClick(choice)}
          />
        ))}
        {selectedAnswer && (
          <>
            <Typography variant="subtitle1" sx={{ mt: 2, color: isCorrectSelected ? '#4caf50' : '#f44336', textAlign: 'justify' }}>
              {question.teacherCorrection}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchRandomQuestion}
              sx={{ mt: 2 }}
            >
              Next Question
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Quickfire;