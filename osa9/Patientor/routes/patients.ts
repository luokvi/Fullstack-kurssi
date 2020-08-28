import express from 'express';
import { Patient, NoSensitivePatient, NewPatient } from '../types';
import patients from '../data/patients.json';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = getNoSensitivePatients();
  
  res.send(patients);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const added = addNew(newPatientEntry);

    res.json(added);
  } catch (e) {
    res.status(400).send(e.message);
  }
  
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