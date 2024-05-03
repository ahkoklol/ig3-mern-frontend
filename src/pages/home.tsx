import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions, Paper } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useAuthContext } from '../hooks/useAuthContext';

export default function home() {

  const { user } = useAuthContext();

  return (
    <Container maxWidth="lg">
      <Box my={4}>
      <Typography variant="h2" component="h1" gutterBottom style={{ color: 'rgb(19, 38, 77)', marginTop: '60px' }}>
        Level Up. Pass the exam with flying colors.
      </Typography>
        <Typography variant="h5" component="p" gutterBottom style={{ color: 'rgb(19, 38, 77)' }}>
          Ace Your TOEIC Test With Our Comprehensive Practice Tools
        </Typography>
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <HeadphonesIcon fontSize="large" />
                  <Typography variant="h6">Interactive Listening Exercises</Typography>
                  <Typography>
                    Fine-tune your English listening skills with exercises designed to mimic the TOEIC listening section.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <BookIcon fontSize="large" />
                  <Typography variant="h6">Reading Comprehension Practices</Typography>
                  <Typography>
                    Enhance your reading speed and understanding with a variety of business-related reading materials.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <TimelapseIcon fontSize="large" />
                  <Typography variant="h6">Timed Practice Tests</Typography>
                  <Typography>
                    Take full-length TOEIC practice exams under timed conditions to get a real test-day experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <BarChartIcon fontSize="large" />
                  <Typography variant="h6">Personalized Progress Tracking</Typography>
                  <Typography>
                    Monitor your improvement with our progress dashboard and customized study recommendations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box mt={5}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="body1" align="center">
              Start your journey to TOEIC Excellence today
            </Typography>
            {!user && (
            <CardActions style={{ justifyContent: 'center', padding: '0', margin: '8px 0' }}>
              <Button variant="contained" href='/signup' sx={{ backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}} > 
                Sign Up for Free
              </Button>
              <Button variant="contained" href='/loggedOutPractice' sx={{ backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}} >
                Explore Practice Tests
              </Button>
            </CardActions>)}
            {user && (
              <CardActions style={{ justifyContent: 'center', padding: '0', margin: '8px 0' }}>
              <Button variant="contained" href='/quickfire' sx={{ backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}} > 
                Quickfire
              </Button>
              <Button variant="contained" href='/exams' sx={{ backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}} >
                Full Exam
              </Button>
              <Button variant="contained" href='/practice' sx={{ backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}} >
                Part Practice
              </Button>
            </CardActions>
            )}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}