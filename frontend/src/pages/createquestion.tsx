import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';

interface QuestionForm {
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
}

const CreateQuestion: React.FC = () => {
  const [formData, setFormData] = useState<QuestionForm>({
    text: '',
    choices: ['', '', '', ''], // Adjust the number of choices as needed
    correctAnswer: '',
    teacherCorrection: '',
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
      });
      setSubmitStatus({ status: 'success', message: 'Question created successfully!' });
      // Optionally reset form here
      setFormData({
        text: '',
        choices: ['', '', '', ''],
        correctAnswer: '',
        teacherCorrection: '',
      });
    } catch (error) {
      console.error('Error creating question:', error);
      setSubmitStatus({ status: 'error', message: 'Failed to create question. Please try again.' });
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px', marginBottom: '50px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>Create a question</Typography>
      <Typography variant="h7" gutterBottom sx={{ color: 'black' }}>This section is available only to teachers. Please fill in all fields, if the students don't have the explanation they may get pissed off. Do not use "". Do not use A) B) C) D) for the answers. </Typography>
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
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
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