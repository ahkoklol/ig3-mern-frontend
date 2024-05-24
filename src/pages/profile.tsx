import { useEffect, useState } from "react";
import { Container, Typography, Paper, List, ListItem, ListItemText, } from "@mui/material";
import { useProfile } from "../hooks/useProfile";
import { format, parseISO } from 'date-fns';
import { useAuthContext } from "../hooks/useAuthContext";
import ProgressChart from "../components/ProgressChart";
import axios from "axios";

// Define the Exam interface
interface Exam {
  _id: string;
  examNumber: number;
  questions: number;
  score: number;
  date: string;
  student: {
    _id: string;
    email: string;
    name: string;
    surname: string;
    role: string;
    // ... other student properties
  };
}

const Profile = () => {
  const { profile } = useProfile();
  const { user } = useAuthContext();
  const [examsTaken, setExamsTaken] = useState<Exam[]>([]);

  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/score/all/${user._id}`)
        .then(response => {
          setExamsTaken(response.data);
        })
        .catch(error => {
          console.error('Error fetching exams:', error);
        });
    }
  }, [user]);

  if (profile) {
    return (
      <Container maxWidth="sm" sx={{ marginBottom: '30px', marginTop: '50px'}}>
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center", width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <Typography variant="h4" style={{ marginTop: "20px" }}>
            {profile.name} {profile.surname}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {profile.role}
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Email" secondary={profile.email} />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Exams Taken" 
                secondary={examsTaken.map((exam) => (
                  <Typography key={exam._id}>
                    {`Exam ${exam.examNumber}: ${format(parseISO(exam.date), 'dd/MM/yyyy')}`}
                  </Typography>
                ))}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Date Joined" secondary={format(parseISO(profile.dateJoined), 'dd/MM/yyyy')} />
            </ListItem>
            <ListItem>
              {/* Directly place ProgressChart here */}
              {user && <ProgressChart studentId={user._id} />}
            </ListItem>
          </List>
        </Paper>
      </Container>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Profile;