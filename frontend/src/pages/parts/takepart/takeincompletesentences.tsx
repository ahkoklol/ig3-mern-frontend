import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, RadioGroup, FormControlLabel, Radio, CircularProgress, Box, Paper } from '@mui/material';
import axios from 'axios';

interface Question {
  _id: string;
  text: string;
  choices: string[];
  correctAnswer: string;
  teacherCorrection: string;
}

interface PartData {
  category: string;
    part: string;
    ref: string;
    questions: string[];
    time: number;
}

const TakeIncompleteSentences: React.FC = () => {
}

export default TakeIncompleteSentences;