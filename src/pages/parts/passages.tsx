import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Part {
    _id: string;
    category: string;
    part: string;
    ref: string;
    questions: string[];
    time: number;
}

const Passages: React.FC = () => {
    const [parts, setParts] = useState<Part[]>([]);

    useEffect(() => {
        // Function to fetch parts
        const fetchParts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/part/allparts/Passages`);
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
                Passages
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: 'black' }}>
            A range of different texts will be printed in the test book. Read the questions, select the best answer of the four choices. Some questions may require you to select the best place to insert a sentence within a text. There are multiple questions for each text. You will have 57 minutes to complete this part. Your score will be given at the end.
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

export default Passages;