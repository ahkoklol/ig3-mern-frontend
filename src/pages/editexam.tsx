import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axiosInstance from '../axiosInstance.ts';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

interface Exam {
  examNumber: number;
  _id: string;
  time: number; // Assuming time is a property you can edit
}

const EditExam: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [editTime, setEditTime] = useState<number>(0);

  const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
        navigate('/login');
        }
    }, [user, navigate]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosInstance.get<Exam[]>(`/api/exam/allexams`);
        setExams(response.data);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
      }
      setLoading(false);
    };

    fetchExams();
  }, []);

  const handleOpenDeleteDialog = (exam: Exam) => {
    setCurrentExam(exam);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentExam(null);
  };

  const handleDelete = async () => {
    if (currentExam) {
      try {
        await axiosInstance.delete(`/api/exam/${currentExam.examNumber}`);
        setExams(exams.filter(exam => exam._id !== currentExam._id));
        handleCloseDeleteDialog();
        toast.success(`Exam ${currentExam.examNumber} deleted successfully!`);
      } catch (error) {
        console.error('Error deleting exam:', error);
        toast.error('Failed to delete exam. Please try again.');
      }
    }
  };

  const handleEditTime = async () => {
    if (currentExam && editTime > 0) {
      try {
        await axiosInstance.patch(`/api/exam/${currentExam.examNumber}`, { time: editTime });
        setExams(exams.map(exam => exam._id === currentExam._id ? { ...exam, time: editTime } : exam));
        setCurrentExam(null); // Reset current exam
        toast.success(`Exam ${currentExam.examNumber} time updated successfully!`);
      } catch (error) {
        console.error('Error editing exam time:', error);
        toast.error('Failed to edit exam time. Please try again.');
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{marginTop: '20px', marginBottom: '30px'}}>
      <Typography variant="h4" sx={{marginTop: '30px', color: 'black', marginBottom: '20px'}}>Edit Exams</Typography>
      <Typography variant="body2" gutterBottom sx={{ color: 'black', textAlign: 'justify', marginBottom: '20px' }}>This section is available only to teachers. You can only edit an exam time, and this time has to be in seconds. Please convert the exam time to seconds. Do not input "3600 seconds", only input 3600. If you create a wrong exam number, you can only delete the exam. The questions will remain as they do not belong solely to that exam (yes, you created 200 questions for an exam, not bad!). You can create the exam again in a few clicks!</Typography>
      <Button component={RouterLink} to="/teacher" variant="contained" sx={{ marginBottom: '30px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)', color: 'white'}}} > 
            Back to Dashboard
        </Button>
      {exams.map((exam) => (
        <Grid container key={exam._id} spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Typography sx={{color: 'black'}}>Exam {exam.examNumber} - Time: {exam.time} seconds</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" onClick={() => setCurrentExam(exam)} sx={{ marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>Edit</Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" color="error" onClick={() => handleOpenDeleteDialog(exam)} sx={{ marginLeft: '10px', marginTop: '10px', backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'rgb(153, 0, 0)', borderColor: 'rgb(153, 0, 0)'}}}>Delete</Button>
          </Grid>
        </Grid>
      ))}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Exam</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete Exam {currentExam?.examNumber}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      {currentExam && (
        <div>
          <TextField
            margin="normal"
            label="Edit Time (seconds)"
            type="number"
            fullWidth
            variant="outlined"
            value={editTime}
            onChange={(e) => setEditTime(Number(e.target.value))}
          />
          <Button onClick={handleEditTime} color="primary" variant="contained" sx={{ marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>Save Changes</Button>
        </div>
      )}
    </Container>
  );
};

export default EditExam;