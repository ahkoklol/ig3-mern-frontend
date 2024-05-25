import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, List, ListItem, ListItemText, TextField, Button, Box } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import ProgressChart from '../components/ProgressChart';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../axiosInstance";

interface Student {
  _id: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  examsTaken: Score[];
}

interface Class {
  _id: string;
  name: string;
  teacher: string;
  students: Student[]; 
}

interface Exam {
  _id: string;
  examNumber: number;
  questions: number[];
  time: number;
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
      examsTaken: Exam[];
    };
}

const ClassPage: React.FC = () => {
  const [currentClass, setCurrentClass] = useState<Class | null>(null);
  const [className, setClassName] = useState<string>('');
  const { classId } = useParams<{ classId: string }>();
  const [teacherEmail, setTeacherEmail] = useState<string>('');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Fetch the current class details
    const fetchClassDetails = async () => {
      try {
        const classResponse = await axiosInstance.get(`/api/classes/${classId}`);
        setCurrentClass(classResponse.data);
      } catch (error) {
        console.error('Failed to fetch class details', error);
      }
    };
  
    // Fetch students belonging to the class
    const fetchStudents = async () => {
      try {
        const studentResponse = await axiosInstance.get(`/api/classes/${classId}/students`);
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

  // Update current class
  const updateClass = async () => {
    try {
      const response = await axiosInstance.post(`/api/classes/create`, {
        className,
        teacherEmail,
      });
      console.log(response.data);
      // Optionally refetch the class details to update the UI
      const classResponse = await axiosInstance.get(`/api/classes/${classId}`);
      setCurrentClass(classResponse.data);
      toast.success('Class updated successfully! The page will now reload.');
      setTimeout(() => {
        window.location.reload(); // Refresh the page after a delay
      }, 2000); // Adjust the delay duration as needed
    } catch (error) {
      console.error('Failed to update class', error);
      toast.error('Failed to update class. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{marginTop: '50px', marginBottom: '30px'}}>
      {currentClass ? (
        <>
          <Typography variant="h5" component="h2" gutterBottom sx={{color: 'black', marginBottom: '20px'}}>
            You are now monitoring the class {currentClass.name}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom sx={{color: 'black', marginBottom: '20px'}}>
            If new students have joined or quit your class, please update your class by filling in the details below:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
            <TextField
              label="Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              label="Teacher Email"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ marginBottom: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<UpdateIcon />}
              onClick={updateClass}
              sx={{ margin: "10px", backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}} }
            >
              Update Class
            </Button>
          </Box>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center", width: '100%', maxWidth: '800px', margin: '0 auto' }}>
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