import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Card, CardContent, Paper, CardActions } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SchoolIcon from '@mui/icons-material/School';

// Teacher Page Component
const TeacherPage: React.FC = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{color: 'black'}}>
        Teacher Dashboard
      </Typography>
      <Typography variant="h7" gutterBottom sx={{color: 'black'}}>
        Welcome to the teacher dashboard. From here you can create and edit questions quickfire questions, exams and practice parts.
        </Typography>

        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <WhatshotIcon fontSize="large" />
                  <Typography variant="h6">Edit/Create quickfire questions</Typography>
                  <Typography>
                    Edit or create quickfire questions. These questions are designed to be answered quickly and are used to improve the students speed at answering single questions.
                  </Typography>
                  <Button variant="contained" color="primary" component={Link} to="/createquestion" sx={{ marginTop: '15px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'} }}>
                        Create Question
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/editquestion" sx={{ marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'} }}>
                        Edit Question
                    </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <LibraryBooksIcon fontSize="large" />
                  <Typography variant="h6">Edit/Create Exams</Typography>
                  <Typography>
                    Edit or create full TOEIC type exams.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <QuizIcon fontSize="large" />
                  <Typography variant="h6">Edit/Create Practice parts</Typography>
                  <Typography>
                    Edit or create practice parts. Students can practice a single part of the TOEIC exam (Listening, Reading comprehension, or Choosing the right word)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <SchoolIcon fontSize="large" />
                  <Typography variant="h6">Students data</Typography>
                  <Typography>
                    Monitor your students' improvement with the progress dashboard.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
    </Container>
  );
};

export default TeacherPage;