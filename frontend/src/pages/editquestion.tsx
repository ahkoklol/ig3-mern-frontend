import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Question {
  _id: string;
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
}

const EditQuestion: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedQuestion, setEditedQuestion] = useState<Question | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [deleteQuestionId, setDeleteQuestionId] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/question/allquestions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleClickOpenDeleteDialog = (id: string) => {
    setOpenDeleteDialog(true);
    setDeleteQuestionId(id);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  const handleConfirmDelete = async () => {
    if (deleteQuestionId) {
      try {
        await axios.delete(`http://localhost:5000/api/question/${deleteQuestionId}`);
        fetchQuestions(); // Refresh the list after deletion
        setOpenDeleteDialog(false); // Close the dialog
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedQuestion({ ...questions[index] });
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/question/${id}`);
      fetchQuestions(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedQuestion) return;
    const { name, value } = e.target;
    if (name.startsWith('choices')) {
      const index = parseInt(name.split('-')[1], 10);
      const newChoices = [...editedQuestion.choices];
      newChoices[index] = value;
      setEditedQuestion({ ...editedQuestion, choices: newChoices });
    } else {
      setEditedQuestion({ ...editedQuestion, [name]: value });
    }
  };

  const handleConfirmEdit = async () => {
    if (!editedQuestion) return;
    try {
      await axios.put(`http://localhost:5000/api/question/edit/${editedQuestion._id}`, editedQuestion);
      setEditIndex(null); // Exit edit mode
      fetchQuestions(); // Refresh the list after editing
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{color: 'black'}}>Edit Questions</Typography>
      <Typography variant="h7" gutterBottom sx={{color: 'black'}}>This section is only available to teachers. You can edit questions, answers and explanations. You can also delete a question, but be careful doing so. Do not use "" or A) B) C) D) for the answers. Please fill in all fields, and if you don't give the explanation, students may get pissed.</Typography>
      {questions.map((question, index) => (
        <Box key={question._id} mb={2} p={2} border={1} borderRadius={2} sx={{color: 'black', marginTop: '20px', marginBottom: '20px'}}>
          {editIndex === index ? (
            <>
              <TextField
                fullWidth
                label="Question Text"
                variant="outlined"
                name="text"
                value={editedQuestion?.text}
                onChange={handleEditChange}
                margin="normal"
              />
              {editedQuestion?.choices.map((choice, choiceIndex) => (
                <TextField
                  key={choiceIndex}
                  fullWidth
                  label={`Choice ${choiceIndex + 1}`}
                  variant="outlined"
                  name={`choices-${choiceIndex}`}
                  value={choice}
                  onChange={handleEditChange}
                  margin="normal"
                />
              ))}
              <TextField
                fullWidth
                label="Correct Answer"
                variant="outlined"
                name="correctAnswer"
                value={editedQuestion?.correctAnswer}
                onChange={handleEditChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Teacher Correction"
                variant="outlined"
                name="teacherCorrection"
                value={editedQuestion?.teacherCorrection}
                onChange={handleEditChange}
                margin="normal"
              />
              <Button onClick={handleConfirmEdit} variant="contained" color="primary" sx={{marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>Confirm</Button>
            </>
          ) : (
            <>
              <Typography variant="h6">{question.text}</Typography>
              {question.choices.map((choice, choiceIndex) => (
                <Typography key={choiceIndex}>{`Choice ${choiceIndex + 1}: ${choice}`}</Typography>
              ))}
              <Button onClick={() => handleEditClick(index)} variant="outlined" color="primary" sx={{ marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>Edit</Button>
              <Button onClick={() => handleClickOpenDeleteDialog(question._id)} variant="outlined" color="primary" sx={{ marginLeft: '10px', marginTop: '10px', backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'rgb(153, 0, 0)', borderColor: 'rgb(153, 0, 0)'} }}>Delete</Button>
              <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this question? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                    Confirm
                    </Button>
                </DialogActions>
                </Dialog>
            </>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default EditQuestion;