import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Grid, CardMedia } from '@mui/material';
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
        <Typography variant="h4" sx={{ mb: 4, color: 'black', mt: 8 }}>
            Part Practice
          </Typography>
        <Grid container spacing={4} alignItems="center" >
            <Grid item xs={12} md={5}>
                <CardMedia
                    component="img"
                    image='../../public/examination.jpg' // Make sure the path is correct
                    alt="Student Taking Exam"
                    sx={{
                    width: '100%',        // Makes image responsive
                    height: 'auto',       // Maintain aspect ratio
                    maxWidth: '400px',    // Maximum width
                    maxHeight: '300px',   // Maximum height
                    }}
                />
                </Grid>
                <Grid item xs={12} md={7}>
                
                    <Typography variant="body1" textAlign='justify' sx={{ color: 'black' }}>
                        Get ready to challenge yourself with a full-length practice exam. Make sure you are in a quiet environment and have a stable internet connection. Try to be in TOEIC-exam-day conditions. There will be a ticking timer. Try answering all the questions, you will be rewarded with your score at the end of the exam!
                    </Typography>
                
                </Grid>
        </Grid>

      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'black', mt: 4 }}>
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