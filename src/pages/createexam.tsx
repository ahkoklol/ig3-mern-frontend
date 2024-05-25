import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography, Alert } from '@mui/material';
import axiosInstance from '../axiosInstance.ts';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

interface ExamForm {
    examNumber: number;
    time: number;
    // Assuming questions are identified by their IDs and added separately
}

const CreateExam: React.FC = () => {
    const [formData, setFormData] = useState<ExamForm>({
        examNumber: 0,
        time: 0,
    });
    const [submitStatus, setSubmitStatus] = useState<{ status: 'idle' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });

    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
        navigate('/login');
        }
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: name === 'examNumber' ? parseInt(value) : parseInt(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`/api/exam/create`, formData);
            setSubmitStatus({ status: 'success', message: 'Exam created successfully!' });
            toast.success('Exam created successfully!');
        } catch (error) {
            console.error('Error creating exam:', error);
            setSubmitStatus({ status: 'error', message: 'Failed to create exam. Please try again.' });
            toast.error('Failed to create exam. Please try again.');
        }
    };

    return (
        <Container maxWidth="lg" sx={{marginTop: '50px', marginBottom: '30px'}}>
            <Typography variant="h4" gutterBottom sx={{color: 'black'}}>
                Create Exam
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ color: 'black', textAlign: 'justify', marginBottom: '20px' }}>This section is available only to teachers. Please fill in all fields. If an exam number already exists, do not try to put the same number. If you have common sense, do not put random exam numbers (eg: if exam 1 is the last created, do not create exam 3 without creating exam 2). The time is in second: be careful and convert the hours to seconds. Friendly reminder that 1 hours = 3600 seconds. You just have to enter 3600, it's pretty straightforward, but I had to explain just in case. Oh, and yes, if you create an exam, all of the questions that were created belonging to that exam number will be used to generate this exam... No need to create 200 questions here!</Typography>
                <Button component={RouterLink} to="/teacher" variant="contained" sx={{ marginBottom: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)', color: 'white'}}} > 
                        Back to Dashboard
                </Button>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Exam Number"
                    variant="outlined"
                    name="examNumber"
                    value={formData.examNumber}
                    onChange={handleChange}
                    margin="normal"
                    type="number"
                />
                <TextField
                    fullWidth
                    label="Time (seconds)"
                    variant="outlined"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    margin="normal"
                    type="number"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginBottom: '10px', marginTop: '20px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>
                    Create Exam
                </Button>
            </form>
            {submitStatus.status !== 'idle' && (
                <Alert severity={submitStatus.status === 'error' ? 'error' : 'success'} style={{ marginTop: '20px' }}>
                    {submitStatus.message}
                </Alert>
            )}
        </Container>
    );
};

export default CreateExam;