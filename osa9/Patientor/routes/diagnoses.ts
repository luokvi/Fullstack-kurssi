import express from 'express';
import { Diagnose } from '../types';
import diagnoses from '../data/diagnoses.json';

const router = express.Router();

router.get('/', (_req, rep) => {
  const diagnoses = getDiagnoses();

  rep.json(diagnoses);
});

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default router;