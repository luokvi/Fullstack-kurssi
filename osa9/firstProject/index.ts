import { validateHeightAndWeight, calculateBmi } from './bmiCalculator';
import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res ) => {
  const height = String(req.query.height);
  const weight = String(req.query.weight);
  
  try {
      const values = validateHeightAndWeight(height, weight);
      const response = calculateBmi(values);
      res.send(response);
  } catch (e) {
    res.send(`Error: ${e.message}`);
    res.status(400);
  };
  
});

const PORT = '3001';
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});