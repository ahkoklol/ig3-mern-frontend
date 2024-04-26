import React from 'react';
import { Container, Typography, Grid, Button, CardMedia } from '@mui/material';

const LoggedOutQuickfire: React.FC = () => {
  return (
    <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 2, color: 'black', marginBottom: '50px' }}>
            Quickfire! Random TOEIC type questions
          </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
            <CardMedia
                component="img"
                image='../../public/quickfire.jpg' // Make sure the path is correct
                alt="Student Taking Exam"
                sx={{
                width: '100%',        // Makes image responsive
                height: 'auto',       // Maintain aspect ratio
                maxWidth: '500px',    // Maximum width
                maxHeight: '400px',   // Maximum height
                }}
            />
            </Grid>
            <Grid item xs={12} md={7}>
            
                <Typography variant="body1" textAlign='justify' sx={{ color: 'black' }}>
                    Just looking to practice a few questions? Don't really have time for a full exam... Our quickfire questions take random questions from the our database. The questions are not timed, so you can carefully anylize the questions and answers. Explanations to the answers are given after answering (correctly or not). The more you practice, the more you learn! The aim is to do as many questions as possible to widen your english knowloedge!
                </Typography>
            
            </Grid>
      </Grid>
      <Button variant="contained" href='/signup' color="primary" sx={{ mt: 4, marginBottom: '40px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'} }}>
            Sign Up Now
          </Button>
    </Container>
  );
};

export default LoggedOutQuickfire;