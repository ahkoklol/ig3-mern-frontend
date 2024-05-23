import React from 'react';
import { Container, Typography, Grid, Button, CardMedia } from '@mui/material';

const LoggedOutExam: React.FC = () => {
  return (
    <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 2, color: 'black', marginBottom: '50px' }}>
            Take a full-length TOEIC exam
          </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
            <CardMedia
                component="img"
                image='/examination.jpg' // Make sure the path is correct
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
      <Button variant="contained" href='/signup' color="primary" sx={{ mt: 4, marginBottom: '40px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)', color: 'white'} }}>
            Sign Up Now
          </Button>
    </Container>
  );
};

export default LoggedOutExam;