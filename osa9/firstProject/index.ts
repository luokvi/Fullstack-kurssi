import { validateHeightAndWeight, calculateBmi, bmiValues } from './bmiCalculator';
import { exerciseValues, validateExerciseArguments, calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res ) => {
  const height = String(req.query.height);
  const weight = String(req.query.weight);

  try {
      const values: bmiValues = validateHeightAndWeight(height, weight);
      const response = calculateBmi(values);
      const jsonResponse = {
          weight,
          height,
          bmi: response
      };
      res.json(jsonResponse);
  } catch {
    const error = {
        error: 'Malformed parameters!'
    };
    res.json(error);
    res.status(400);
  }
  
});

app.post('/exercises', (req, res) => {
  const request: any = req.body; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  if (!request.target || !request.daily_exercises){
      const e = {
        error: 'Parameters missing!'
      };
      res.json(e);
      res.status(400);
  }
  const values: exerciseValues = {
    exercises : request.daily_exercises,
    target: request.target
   };
  const err = validateExerciseArguments(values);
  if (err.error !== '0'){
      res.json(err);
      res.status(400);
  }

  const response = calculateExercises(values);

  res.json(response);

});

const PORT = '3001';
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});