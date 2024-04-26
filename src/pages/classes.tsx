import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface Class {
  _id: string;
  name: string;
  teacher: string;
  students: string[];
}

const ClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/allclasses`);
        setClasses(response.data);
      } catch (error) {
        console.error('Failed to fetch classes', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ color: 'black', marginTop: '30px', marginBottom: '30px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Classes
      </Typography>
      <Paper elevation={3}>
        <List>
          {classes.map((cls) => (
            <ListItem key={cls._id} component={Link} to={`/class/${cls._id}/students`} button>
              <ListItemText primary={`Class: ${cls.name}`} secondary={`Teacher: ${cls.teacher}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ClassesPage;