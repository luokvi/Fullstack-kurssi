import express from 'express';
import { NoSensitivePatient } from '../types';
import patients from '../data/patients.json';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = getNoSensitivePatients();
  
  res.send(patients);
});

const getNoSensitivePatients = (): NoSensitivePatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
  }));
};

export default router;