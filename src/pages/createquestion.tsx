import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography, Alert } from '@mui/material';
import axiosInstance from '../axiosInstance.ts';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

interface QuestionForm {
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
  examNumber: number;
  category: string;
  part: string;
  ref: string;
  imagePath?: File | null;
  audioPath?: File | null;
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
    ref: '',
    imagePath: null,
    audioPath: null,
  });

  const [submitStatus, setSubmitStatus] = useState<{ status: 'idle' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    if (typeof index === 'number') {
      const newChoices = [...formData.choices];
      newChoices[index] = e.target.value;
      setFormData({ ...formData, choices: newChoices });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleZipFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setZipFile(event.target.files[0]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
      if (event.target.name === 'imagePath') {
        setUploadedImage(event.target.files[0]);
      } else if (event.target.name === 'audioPath') {
        setUploadedAudio(event.target.files[0]);
      }
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setFormData({ ...formData, imagePath: null });
  };

  const removeUploadedAudio = () => {
    setUploadedAudio(null);
    setFormData({ ...formData, audioPath: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('text', formData.text);
    formData.choices.forEach((choice, index) => {
      data.append(`choices[${index}]`, choice);
    });
    data.append('correctAnswer', formData.correctAnswer);
    data.append('teacherCorrection', formData.teacherCorrection);
    if (formData.examNumber) {
      data.append('examNumber', formData.examNumber.toString());
    }
    data.append('category', formData.category);
    data.append('part', formData.part);
    data.append('ref', formData.ref);
    if (formData.imagePath) {
      data.append('imagePath', formData.imagePath);
    }
    if (formData.audioPath) {
      data.append('audioPath', formData.audioPath);
    }

    try {
      await axiosInstance.post(`/api/question/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitStatus({ status: 'success', message: 'Question created successfully!' });
      toast.success('Question created successfully!');
    } catch (error) {
      console.error('Error creating question:', error);
      setSubmitStatus({ status: 'error', message: 'Failed to create question. Please try again.' });
      toast.error('Failed to create question. Please try again.');
    }
  };

  const handleZipFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!zipFile) {
      toast.error('Please select a ZIP file to upload.');
      return;
    }

    const data = new FormData();
    data.append('questionZip', zipFile);  // Ensure this matches the field name in multer config

    try {
      await axiosInstance.post('/api/question/createmultiplezip', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitStatus({ status: 'success', message: 'ZIP file uploaded and questions created successfully!' });
      toast.success('ZIP file uploaded and questions created successfully!');
    } catch (error) {
      console.error('Error uploading ZIP file:', error);
      setSubmitStatus({ status: 'error', message: 'Failed to upload ZIP file. Please try again.' });
      toast.error('Failed to upload ZIP file. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '60px', marginBottom: '50px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>Create a question</Typography>
      <Typography variant="body2" gutterBottom sx={{ color: 'black', textAlign: 'justify' }}>This section is available only to teachers. Please fill in all fields, if the students don't have the explanation they may get pissed off. Do not use "". Please use numbers if you are creating an exam and A) B) C) D) for the answers. The correct answer has to be the same as a choice (if correct choice is A) car, input "A) car") If you are creating a Quickfire question, please input 0 for the exam number. The category is either Listening or Reading. There are 4 parts in Listening: Photographs, Question-Response, Conversations, Talks. There are 3 parts in Reading: Incomplete-Sentences, Text-Completion, Passages. When entering part, please use "-" if there is a space and mind the uppercase (eg: Incomplete-Sentences, different from incomplete-sentences). Please be careful when entering information and double check.</Typography>
      <Button component={RouterLink} to="/teacher" variant="contained" sx={{ marginBottom: '20px', marginTop: '20px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)', color: 'white'}}} > 
        Back to Dashboard
      </Button>
      <Typography variant="h5" gutterBottom sx={{ color: 'black', marginTop: '10px' }}>Send a .zip file</Typography>
      <form onSubmit={handleZipFileSubmit}>
        {!zipFile && (
          <label htmlFor="zip-upload">
            <Input
              accept=".zip"
              id="zip-upload"
              type="file"
              name="zipFile"
              onChange={handleZipFileChange}
            />
            <Button variant="contained" component="span" color="primary" sx={{ marginBottom: '20px', marginRight: '5px', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'grey', borderColor: 'grey' } }}>
              Select ZIP File
            </Button>
          </label>
        )}
        {zipFile && (
          <>
            <Typography variant="subtitle1" sx={{ color: 'black' }}>{zipFile.name}</Typography>
            <Button type="submit" variant="contained" color="primary" sx={{ marginBottom: '20px', marginLeft: '5px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': { backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)' } }}>
              Send ZIP File
            </Button>
          </>
        )}
      </form>
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
        <TextField
          fullWidth
          label="Part ref"
          variant="outlined"
          name="ref"
          value={formData.ref}
          onChange={handleInputChange}
          margin="normal"
        />
        {!uploadedImage ? (
          <label htmlFor="image-upload">
            <Input
              accept="imagePath/*"
              id="image-upload"
              type="file"
              name="imagePath"
              onChange={handleFileChange}
            />
            <Button variant="contained" component="span" color="primary" sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '10px', backgroundColor: 'black', color: 'white', '&:hover': {backgroundColor: 'grey', borderColor: 'grey'}}}>
              Upload Image
            </Button>
          </label>
        ) : (
          <div>
            <Typography variant="subtitle1" sx={{ color: 'black'}}>{uploadedImage.name}</Typography>
            <Button onClick={removeUploadedImage} sx={{ marginLeft: '10px', backgroundColor: 'black', color: 'white', '&:hover': {backgroundColor: 'grey', borderColor: 'grey'}}}>
              Remove Image
            </Button>
          </div>
        )}
        {!uploadedAudio ? (
          <label htmlFor="audio-upload">
            <Input
              accept="audioPath/*"
              id="audio-upload"
              type="file"
              name="audioPath"
              onChange={handleFileChange}
            />
            <Button variant="contained" component="span" color="primary" sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '10px', marginRight: '100px', backgroundColor: 'black', color: 'white', '&:hover': {backgroundColor: 'grey', borderColor: 'grey'}}}>
              Upload Audio
            </Button>
          </label>
        ) : (
          <div>
            <Typography variant="subtitle1" sx={{color: 'black'}}>{uploadedAudio.name}</Typography>
            <Button onClick={removeUploadedAudio} sx={{ marginLeft: '10px', backgroundColor: 'black', color: 'white', '&:hover': {backgroundColor: 'grey', borderColor: 'grey'}}}>
              Remove Audio
            </Button>
          </div>
        )}
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px', marginBottom: '20px', backgroundColor: 'rgb(85, 194, 195)', color: 'white', '&:hover': {backgroundColor: 'rgb(75, 184, 185)', borderColor: 'rgb(75, 184, 185)'}}}>
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
