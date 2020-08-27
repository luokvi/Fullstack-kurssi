import express from 'express';
import pingpong from './routes/pingpong';
import diagnosesRoute from './routes/diagnoses';
import patientsRoute from './routes/patients';

const app = express();
app.use(express.json());


app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/ping', pingpong);
app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientsRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});