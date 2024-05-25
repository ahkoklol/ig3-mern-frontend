import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance.ts';
import { useAuthContext } from '../../hooks/useAuthContext.tsx';
import { useNavigate } from 'react-router-dom';

interface Part {
    _id: string; 
    category: string;
    part: string;
    ref: string;
    questions: string[]; 
    time: number;
}

const IncompleteSentences: React.FC = () => {
    const [parts, setParts] = useState<Part[]>([]); 

    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
        navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        // Function to fetch parts
        const fetchParts = async () => {
            try {
                const response = await axiosInstance.get(`/api/part/allparts/Incomplete-Sentences`);
                setParts(response.data); 
            } catch (error) {
                console.error('Error fetching parts:', error);
            }
        };

        fetchParts(); 
    }, []); 

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', color: 'black' }}>
                Incomplete Sentences
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: 'black' }}>
            Select the best answer of the four choices to complete the sentence. You will have 10 minutes to complete this part. Your score will be given at the end.
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List>
                        {parts.map((part) => (
                            <ListItem key={part._id} component={Link} to={`/part/${part.ref}`} sx={{ justifyContent: 'center', color: 'black', backgroundColor: 'rgb(255, 246, 236)', '&:hover': {backgroundColor: 'rgb(245, 236, 226)', borderColor: 'rgb(245, 236, 226)'} }}>
                                <ListItemText
                                    primary={`Practice ref ${part.ref}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
};

export default IncompleteSentences;