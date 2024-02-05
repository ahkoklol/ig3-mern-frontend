import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Part {
    _id: string; // Assuming each part has a unique ID
    category: string;
    part: string;
    ref: string;
    questions: string[]; // Adjust according to your actual question model
    time: number;
}

const IncompleteSentences: React.FC = () => {
    const [parts, setParts] = useState<Part[]>([]); // State to hold the fetched parts

    useEffect(() => {
        // Function to fetch parts
        const fetchParts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/part/allparts/Incomplete-Sentences');
                setParts(response.data); // Assuming the API returns an array of parts
            } catch (error) {
                console.error('Error fetching parts:', error);
            }
        };

        fetchParts(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once on mount

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