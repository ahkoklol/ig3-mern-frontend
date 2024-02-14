import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Score {
  score: number;
  date: string; 
  examNumber: string;
}

interface ProgressChartProps {
  studentId: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ studentId }) => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        label: 'Score',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });
  const [average, setAverage] = useState<number | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get<Score[]>(`http://localhost:5000/api/score/all/${studentId}`);
        const scores = response.data;

        // Sort scores by date and calculate average
        const sortedScores = scores.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const scoreData = sortedScores.map(score => score.score);
        const avgScore = scoreData.reduce((acc, cur) => acc + cur, 0) / scoreData.length;

        setChartData({
          labels: sortedScores.map(score => format(parseISO(score.date), 'dd/MM/yyyy')),
          datasets: [
            {
              ...chartData.datasets[0],
              data: sortedScores.map(score => score.score),
            },
          ],
        });

        setAverage(avgScore);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    if (studentId) {
      fetchScores();
    }
  }, [studentId]);

  return (
    <>
      <Line data={chartData} />
      {average !== null && (
        <Typography variant="subtitle1" color="textSecondary">
          Average Score: {average.toFixed(2)}
        </Typography>
      )}
    </>
  );
};

export default ProgressChart;