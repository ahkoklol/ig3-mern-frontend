import React from "react";
import {
  Container,
  Avatar,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Edit, Settings } from "@mui/icons-material";
import { useProfile } from "../hooks/useProfile";
import { format, parseISO } from 'date-fns';

const Profile = () => {
  const { profile } = useProfile();

  // Check if profile is not null
  // console.log('profile:', profile) // ok
  if (profile) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
          <Avatar
            alt="User Profile"
            src="https://via.placeholder.com/150"
            style={{ width: "100px", height: "100px", margin: "0 auto" }}
          />

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
              <ListItemText primary="Exams Taken" secondary={profile.examsTaken} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Progress" secondary={profile.progress} />
            </ListItem>
            <ListItem>
            <ListItemText primary="Date Joined" secondary={format(parseISO(profile.dateJoined), 'dd/MM/yyyy')}/>
            </ListItem>
          </List>

          <Button startIcon={<Edit />} variant="outlined" color="primary" style={{ margin: "10px" }}>
            Edit Profile
          </Button>

          <Button startIcon={<Settings />} variant="outlined" color="secondary" style={{ margin: "10px" }}>
            Settings
          </Button>
        </Paper>
      </Container>
    );
  } else {
    // Handle the case when profile is null (e.g., while data is loading)
    return <div>Loading...</div>;
  }
};

export default Profile;