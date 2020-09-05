import express from 'express';
import { Patient, NewPatient, PublicPatient } from '../types';
import patients from '../data/patients';
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

router.get('/:id', (req, res) => {
  const id : string = req.params.id;
  const patient : Patient | undefined = getOnePatient(id);
  
  if(!patient){
    res.status(404);
  }
  res.status(200).send(patient);
});

const getNoSensitivePatients = (): PublicPatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
  }));
};

const addNew = (entry : NewPatient) : Patient => {
  const newPatient = {
    id: String( Math.random() * 50 ),
    entries: [],
    ...entry
  };

  patients.push(newPatient);

  return newPatient;
};

const getOnePatient = (id: string): Patient | undefined => {
  const onePatient = patients.find(p => p.id === id);
  if (!onePatient){
    return undefined;
  }
  return {
    id: onePatient?.id,
    name: onePatient?.name,
    ssn: onePatient?.ssn,
    dateOfBirth: onePatient?.dateOfBirth,
    gender: onePatient?.gender,
    occupation: onePatient?.occupation,
    entries: onePatient?.entries
  };
};

export default router;