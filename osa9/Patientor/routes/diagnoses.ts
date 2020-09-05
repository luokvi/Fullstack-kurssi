import express from 'express';
import { Diagnosis } from '../types';
import diagnoses from '../data/diagnoses.json';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = getDiagnoses();

  res.send(diagnoses);
});

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

export default router;