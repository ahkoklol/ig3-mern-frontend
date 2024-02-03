import React from 'react';
import { Container, Typography, Grid, Button, CardMedia, List, ListItemText, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

const PracticePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{marginTop: '60px', marginBottom: '40px'}}>
        <Typography variant="h4" sx={{ color: 'black', marginBottom: '30px' }}>
            Part Practice
          </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5}>
            <CardMedia
                component="img"
                image='../../public/TOEIC-PART-2.webp' // Make sure the path is correct
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
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'black', mt: 4, borderTop: '3px solid #f5f5f5', paddingTop: '20px', marginTop: '40px' }}>
        Select a part that you want to practice
      </Typography>
      <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ textAlign: 'center', color: 'black'}}>
                Listening
            </Typography>
                <List sx={{ bgcolor: 'background.paper', borderRadius: '5px' }}>
                    <ListItem component={Link} to={`/part/photographs`} sx={{ justifyContent: 'center', color: 'black', backgroundColor: 'rgb(255, 246, 236)', '&:hover': {backgroundColor: 'rgb(245, 236, 226)', borderColor: 'rgb(245, 236, 226)'} }}><ListItemText primary="Photographs (6 questions)" /></ListItem>
                    <ListItem component={Link} to={`/part/question-response`} sx={{ justifyContent: 'center', color: 'black', backgroundColor: 'rgb(255, 246, 236)', '&:hover': {backgroundColor: 'rgb(245, 236, 226)', borderColor: 'rgb(245, 236, 226)'} }}><ListItemText primary="Question-Response (25 questions)" /></ListItem>
                    <ListItem component={Link} to={`/part/conversations`} sx={{ justifyContent: 'center', color: 'black', backgroundColor: 'rgb(255, 246, 236)', '&:hover': {backgroundColor: 'rgb(245, 236, 226)', borderColor: 'rgb(245, 236, 226)'} }}><ListItemText primary="Conversations (39 questions)" /></ListItem>
                    <ListItem component={Link} to={`/part/talks`} sx={{ justifyContent: 'center', color: 'black', backgroundColor: 'rgb(255, 246, 236)', '&:hover': {backgroundColor: 'rgb(245, 236, 226)', borderColor: 'rgb(245, 236, 226)'} }}><ListItemText primary="Talks (30 questions)" /></ListItem>
                </List>
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ textAlign: 'center', color: 'black'}}>
                Reading
            </Typography>
                <List sx={{ bgcolor: 'background.paper', borderRadius: '5px' }}>
                    <ListItem component={Link} to={`/part/incomplete-sentences`} sx={{ justifyContent: 'center', color: 'black', backgroundColor: 'rgb(255, 246, 236)', '&:hover': {backgroundColor: 'rgb(245, 236, 226)', borderColor: 'rgb(245, 236, 226)'} }}><ListItemText primary="Incomplete Sentences (30 questions)" /></ListItem>
                    <ListItem component={Link} to={`/part/text-completion`} sx={{ justifyContent: 'center', color: 'black', backgroundColor: 'rgb(255, 246, 236)', '&:hover': {backgroundColor: 'rgb(245, 236, 226)', borderColor: 'rgb(245, 236, 226)'} }}><ListItemText primary="Text Completion (16 questions)" /></ListItem>
                    <ListItem component={Link} to={`/part/passages`} sx={{ justifyContent: 'center', color: 'black', backgroundColor: 'rgb(255, 246, 236)', '&:hover': {backgroundColor: 'rgb(245, 236, 226)', borderColor: 'rgb(245, 236, 226)'} }}><ListItemText primary="Single + Multiple Passages (25+29 questions)" /></ListItem>
                </List>
            </Grid>
        </Grid>
    </Container>
  );
};

export default PracticePage;