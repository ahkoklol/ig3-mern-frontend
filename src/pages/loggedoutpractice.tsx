import React from 'react';
import { Container, Typography, Grid, Button, CardMedia } from '@mui/material';

const LoggedOutPractice: React.FC = () => {
  return (
    <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 2, color: 'black', marginBottom: '50px' }}>
            Part Practice
          </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
            <CardMedia
                component="img"
                image='/TOEIC-PART-2.webp' // Make sure the path is correct
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
                    You suck at one particular part of the exam? Is is Listening, Reading comprehension or Grammar that's giving you a hard time? Our practice tools are designed to help you improve your weak areas. You can focus on a single part of the exam. The Listening part is divided into 4 parts: Photographs (6 questions), Question-Response (25 questions), Conversations (39 questions), Talks (30 questions). The Reading section is divided into 3 parts: Incomplete Sentences (30 questions), Text Completion (16 questions), Single + Multiple Passages (25+29 questions). You will be given the time to complete a part so you get used to answering within the suggested time frames. Do your best!
                </Typography>
            
            </Grid>
      </Grid>
      <Button variant="contained" href='/signup' color="primary" sx={{ mt: 4, marginBottom: '40px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)', color: 'white'} }}>
            Sign Up Now
          </Button>
    </Container>
  );
};

export default LoggedOutPractice;