import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';

interface QuestionForm {
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
  examNumber: number;
  category: string;
  part: string;
}

const CreateQuestion: React.FC = () => {
  const [formData, setFormData] = useState<QuestionForm>({
    text: '',
    choices: ['', '', '', ''], // Adjust the number of choices as needed
    correctAnswer: '',
    teacherCorrection: '',
    examNumber: 0,
    category: '',
    part: '',
  });

  const [submitStatus, setSubmitStatus] = useState<{ status: 'idle' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    if (typeof index === 'number') {
      const newChoices = [...formData.choices];
      newChoices[index] = e.target.value;
      setFormData({ ...formData, choices: newChoices });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/question/create', {
        text: formData.text,
        choices: formData.choices,
        correctAnswer: formData.correctAnswer,
        teacherCorrection: formData.teacherCorrection,
        examNumber: formData.examNumber,
        category: formData.category,
        part: formData.part,
      });
      setSubmitStatus({ status: 'success', message: 'Question created successfully!' });
      // Optionally reset form here
      setFormData({
        text: '',
        choices: ['', '', '', ''],
        correctAnswer: '',
        teacherCorrection: '',
        examNumber: 0,
        category: '',
        part: '',
      });
    } catch (error) {
      console.error('Error creating question:', error);
      setSubmitStatus({ status: 'error', message: 'Failed to create question. Please try again.' });
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '60px', marginBottom: '50px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>Create a question</Typography>
      <Typography variant="body2" gutterBottom sx={{ color: 'black', textAlign: 'justify' }}>This section is available only to teachers. Please fill in all fields, if the students don't have the explanation they may get pissed off. Do not use "". Do not use A) B) C) D) for the answers. If you are creating a Quickfire question, please input 0 for the exam number. The category is either Listening or Reading. There are 4 parts in Listening: Photographs, Question-Response, Conversations, Talks. There are 3 parts in Reading: Incomplete Sentences, Text Completion, Single + Multiple Passages. When entering part, please use "-" if there is a space and mind the uppercase (eg: Incomplete-Sentences, different from incomplete-sentences). Please be careful when entering information and double check.</Typography>
      <Button variant="contained" href='/teacher' sx={{ marginBottom: '10px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}} > 
            Back to Dashboard
        </Button>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Question"
          variant="outlined"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          margin="normal"
        />
        {formData.choices.map((choice, index) => (
          <TextField
            key={index}
            fullWidth
            label={`Choice ${index + 1}`}
            variant="outlined"
            value={choice}
            onChange={(e) => handleInputChange(e, index)}
            margin="normal"
          />
        ))}
        <TextField
          fullWidth
          label="Correct Answer"
          variant="outlined"
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Correction/Explanation"
          variant="outlined"
          name="teacherCorrection"
          value={formData.teacherCorrection}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
            fullWidth
            label="Exam Number"
            variant="outlined"
            name="examNumber"
            type="number"
            value={formData.examNumber.toString()}
            onChange={handleInputChange}
            margin="normal"
        />
        <TextField
            fullWidth
            label="Category"
            variant="outlined"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            margin="normal"
        />
        <TextField
            fullWidth
            label="Part"
            variant="outlined"
            name="part"
            value={formData.part}
            onChange={handleInputChange}
            margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>
          Confirm
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

export default CreateQuestion;