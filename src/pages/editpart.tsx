import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axiosInstance from '../axiosInstance.ts';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

interface Part {
    _id: string;
    category: string;
    part: string;
    time: number;
    ref: string;
}

const EditPart: React.FC = () => {
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [currentPart, setCurrentPart] = useState<Part | null>(null);
    const [editData, setEditData] = useState({ category: '', part: '', time: 0 });

    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
        navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await axiosInstance.get<Part[]>(`/api/part/allparts`);
                setParts(response.data);
                setEditData({ category: '', part: '', time: 0 }); // Reset edit data
            } catch (error) {
                console.error('Failed to fetch parts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, []);

    const handleOpenDeleteDialog = (part: Part) => {
        setCurrentPart(part);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setCurrentPart(null); // Ensure currentPart is cleared
    };

    const handleDelete = async () => {
        if (currentPart) {
            try {
                await axiosInstance.delete(`/api/part/${currentPart.ref}`);
                setParts(parts.filter(part => part.ref !== currentPart.ref));
                handleCloseDeleteDialog();
                toast.success(`Part ${currentPart.ref} deleted successfully!`);
            } catch (error) {
                console.error('Error deleting part:', error);
                toast.error('Failed to delete part. Please try again.');
            }
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: name === 'time' ? parseInt(value) : value });
    };

    const handleEditPart = async () => {
        if (currentPart) {
            try {
                await axiosInstance.put(`/api/part/${currentPart.ref}`, editData);
                const updatedParts = parts.map(part => part.ref === currentPart.ref ? { ...part, ...editData } : part);
                setParts(updatedParts);
                setCurrentPart(null); // Reset current part to close edit mode
                toast.success(`Part ${currentPart.ref} updated successfully!`);
            } catch (error) {
                console.error('Error updating part:', error);
                toast.error('Failed to update part. Please try again.');
            }
        }
    };

    const initiateEdit = (part: Part) => {
        setCurrentPart(part); // Set current part for editing
        setEditData({ category: part.category, part: part.part, time: part.time }); // Pre-fill edit data with current part values
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container sx={{ marginTop: '20px', marginBottom: '30px' }}>
            <Typography variant="h4" sx={{ marginTop: '30px', color: 'black', marginBottom: '20px' }}>Edit Practice Parts</Typography>
            <Button component={RouterLink} to="/teacher" variant="contained" sx={{ marginBottom: '30px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)', color: 'white'}}}>
                Back to Dashboard
            </Button>
            {parts.map((part) => (
                <Grid container key={part.ref} spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <Typography sx={{ color: 'black' }}>Part {part.ref} - Category: {part.category} - Part: {part.part} - Time: {part.time} seconds</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="outlined" onClick={() => initiateEdit(part)} sx={{ marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>Edit</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="outlined" color="error" onClick={() => handleOpenDeleteDialog(part)} sx={{ marginLeft: '10px', marginTop: '10px', backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'rgb(153, 0, 0)', borderColor: 'rgb(153, 0, 0)'}}}>Delete</Button>
                    </Grid>
                </Grid>
            ))}
            {currentPart && (
                <>
                    <TextField label="Category"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="category"
                        value={editData.category}
                        onChange={handleEditChange}
                    />
                    <TextField
                        label="Part Name"
                        type="text"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="part"
                        value={editData.part}
                        onChange={handleEditChange}
                    />
                    <TextField
                        label="Time (seconds)"
                        type="number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="time"
                        value={editData.time}
                        onChange={handleEditChange}
                    />
                    <Button
                        onClick={handleEditPart}
                        color="primary"
                        variant="contained"
                        sx={{ marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}
                    >
                        Save Changes
                    </Button>
                </>
            )}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>Delete Practice Part</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this part: {currentPart?.ref}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EditPart;