import express from 'express';
import { Patient, NoSensitivePatient, NewPatient } from '../types';
import patients from '../data/patients.json';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = getNoSensitivePatients();
  
  res.send(patients);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = addNew( { name, dateOfBirth, ssn, gender, occupation });

  res.json(newPatient);
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

const addNew = (entry : NewPatient) : Patient => {
  const newPatient = {
    id: String( Math.random() * 50 ),
    ...entry
  };

  patients.push(newPatient);

  return newPatient;
};

export default router;