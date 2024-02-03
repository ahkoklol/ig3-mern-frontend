import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Question {
  _id: string;
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
  examNumber: number;
  category: string;
  part: string;
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
    } else if (name === 'examNumber') {
        setEditedQuestion({ ...editedQuestion, [name]: parseInt(value, 10) });
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
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{color: 'black', marginTop: '60px'}}>Edit Questions</Typography>
      <Typography variant="body2" gutterBottom sx={{color: 'black', textAlign: 'justify'}}>This section is only available to teachers. You can edit questions, answers and explanations. You can also delete a question, but be careful doing so. Do not use "" or A) B) C) D) for the answers. Please fill in all fields, and if you don't give the explanation, students may get pissed. If you are creating a Quickfire question, please input 0 for the exam number. The category is either Listening or Reading. There are 4 parts in Listening: Photographs, Question-Response, Conversations, Talks. There are 3 parts in Reading: Incomplete Sentences, Text Completion, Single + Multiple Passages. When entering part, please use "-" if there is a space and mind the uppercase (eg: Incomplete-Sentences, different from incomplete-sentences). Please be careful when entering information and double check.</Typography>
      <Button variant="contained" href='/teacher' sx={{ marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}} > 
            Back to Dashboard
        </Button>
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
              <TextField
                fullWidth
                label="Exam Number"
                variant="outlined"
                name="examNumber"
                value={editedQuestion?.examNumber}
                onChange={handleEditChange}
                margin="normal"
                type="number"
              />
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                name="category"
                value={editedQuestion?.category}
                onChange={handleEditChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Part"
                variant="outlined"
                name="part"
                value={editedQuestion?.part}
                onChange={handleEditChange}
                margin="normal"
              />
              <Button onClick={handleConfirmEdit} variant="contained" color="primary" sx={{marginTop: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>Confirm</Button>
            </>
          ) : (
            <>
              <Typography variant="h6">{question.text}</Typography>
              {question.choices.map((choice, choiceIndex) => (
                <Typography key={choiceIndex} sx={{textAlign: 'justify'}}>{`Choice ${choiceIndex + 1}: ${choice}`}</Typography>
              ))}
                <Typography sx={{textAlign: 'justify'}}>{`Correct Answer: ${question.correctAnswer}`}</Typography>
                <Typography sx={{textAlign: 'justify'}}>{`Teacher Correction: ${question.teacherCorrection}`}</Typography>
                <Typography sx={{textAlign: 'justify'}}>{`Exam Number: ${question.examNumber}`}</Typography>
                <Typography sx={{textAlign: 'justify'}}>{`Category: ${question.category}`}</Typography>
                <Typography sx={{textAlign: 'justify'}}>{`Part: ${question.part}`}</Typography>
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
                    <Button onClick={handleConfirmDelete} autoFocus color="error">
                    Confirm
                    </Button>
                </DialogActions>
                </Dialog>
            </>
          )}
        </Box>
      ))}
        <Button variant="contained" href='/teacher' sx={{ marginBottom: '20px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}} > 
            Back to Dashboard
        </Button>
    </Container>
  );
};

export default EditQuestion;