import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography, Alert } from '@mui/material';
import axiosInstance from '../axiosInstance.ts';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

interface PartForm {
    category: string;
    part: string;
    ref: string;
    time: number;
}

const CreatePart: React.FC = () => {
    const [formData, setFormData] = useState<PartForm>({
        category: '',
        part: '',
        ref: '',
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
            [name]: name === 'time' ? (value ? parseInt(value) : 0) : value, // Only parse 'time' as an integer
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`/api/part/create`, formData);
            setSubmitStatus({ status: 'success', message: 'Part created successfully!' });
            toast.success('Part created successfully!');
        } catch (error) {
            console.error('Error creating part:', error);
            setSubmitStatus({ status: 'error', message: 'Failed to create part. Please try again.' });
            toast.error('Failed to create part. Please try again.');
        }
    };

    return (
        <Container maxWidth="lg" sx={{marginTop: '50px', marginBottom: '30px'}}>
            <Typography variant="h4" gutterBottom sx={{color: 'black'}}>
                Create Practice Part
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ color: 'black', textAlign: 'justify', marginBottom: '20px' }}>This section is available only to teachers. Please fill in all fields. If a part ref already exists, do not try to put the same number. If you have common sense, do not put random part refs, try naming them to not get confused by numbers because there will be a lot of parts. The time is in second: be careful and convert the hours to seconds. Friendly reminder that 1 hours = 3600 seconds. You just have to enter 3600, it's pretty straightforward, but I had to explain just in case. Oh, and yes, if you create a part, all of the questions that were created belonging to that part ref will be used to generate this part!</Typography>
            <Typography variant="body2" gutterBottom sx={{ color: 'black', textAlign: 'justify', marginBottom: '20px' }}>Here are the 7 parts that you can create divided into two categories, Listening and Reading. Please use "-" for spaces (eg: Incomplete-Sentences) and use uppercase letters as follows (Incomplete-Sentences is different than incomplete-sentences): The Listening part is divided into 4 parts: Photographs (6 questions), Question-Response (25 questions), Conversations (39 questions), Talks (30 questions). The Reading section is divided into 3 parts: Incomplete-Sentences (30 questions), Text-Completion (16 questions), Passages (25 Single + 29 Miltiple questions). Do not use ""</Typography>    
                <Button component={RouterLink} to="/teacher" variant="contained" sx={{ marginBottom: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)', color: 'white'}}} > 
                        Back to Dashboard
                </Button>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Category"
                    variant="outlined"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Part"
                    variant="outlined"
                    name="part"
                    value={formData.part}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Part ref"
                    variant="outlined"
                    name="ref"
                    value={formData.ref}
                    onChange={handleChange}
                    margin="normal"
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
                    Create Practice Part
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

export default CreatePart;