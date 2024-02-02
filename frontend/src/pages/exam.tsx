import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Exam {
  examNumber: number;
  _id: string;
}

const ExamPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get<Exam[]>('http://localhost:5000/api/exam/allexams');
        setExams(response.data);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
      }
      setLoading(false);
    };

    fetchExams();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginBottom: '20px' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'black' }}>
        Select an Exam to Take
      </Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: '5px' }}>
        {exams.map((exam) => (
          <ListItem key={exam._id} button component={Link} to={`/exam/${exam.examNumber}`} sx={{ justifyContent: 'center', color: 'black', backgroundColor: 'rgb(255, 246, 236)', '&:hover': {backgroundColor: 'rgb(245, 236, 226)', borderColor: 'rgb(245, 236, 226)'} }}>
            <ListItemText primary={`Exam ${exam.examNumber}`} sx={{ textAlign: 'center' }} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ExamPage;