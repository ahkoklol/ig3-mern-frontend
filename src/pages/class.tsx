import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import ProgressChart from '../components/ProgressChart';


interface Student {
  _id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  examsTaken: Score[];
  // Add other fields as needed based on your backend data structure
}

interface Class {
  _id: string;
  name: string;
  teacher: string;
  students: Student[]; // Assuming the students array contains student details
}

interface Score {
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
      examsTaken: Score[];
      // ... other student properties
    };
  }

const ClassPage: React.FC = () => {
  const [currentClass, setCurrentClass] = useState<Class | null>(null);
  const { classId } = useParams<{ classId: string }>();

  useEffect(() => {
    // Fetch the current class details
    const fetchClassDetails = async () => {
      try {
        const classResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${classId}`);
        setCurrentClass(classResponse.data);
      } catch (error) {
        console.error('Failed to fetch class details', error);
      }
    };
  
    // Fetch students belonging to the class
    const fetchStudents = async () => {
      try {
        const studentResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${classId}/students`);
        setCurrentClass(prevClass => {
          // Check if prevClass is not null before spreading it
          if (prevClass) {
            return { ...prevClass, students: studentResponse.data };
          }
          // If prevClass was null, return null without updating the state
          return null;
        });
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };
  
    fetchClassDetails();
    fetchStudents();
  }, [classId]);

  return (
    <Container maxWidth="sm" sx={{marginTop: '30px', marginBottom: '30px'}}>
      {currentClass ? (
        <>
          <Typography variant="h5" component="h2" gutterBottom sx={{color: 'black', marginBottom: '20px'}}>
            You are now monitoring the class {currentClass.name}
          </Typography>
          <Paper elevation={3}>
            <List>
            {currentClass.students.map((student) => (
            <>
                <ListItem>
                    <ListItemText primary={`${student.name} ${student.surname}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Email: ${student.email}`} sx={{mt: '-20px'}} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`Exams taken: ${student.examsTaken}`} sx={{mt: '-20px'}} />
                </ListItem>
                
                <ListItem>
                <ProgressChart studentId={student._id} />
                </ListItem>
            </>
            ))}
            </List>
          </Paper>
        </>
      ) : (
        <Typography variant="h6" component="h3">
          Loading class details...
        </Typography>
      )}
    </Container>
  );
};

export default ClassPage;