import { NewPatient, Gender } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const toNewPatient = (object : any) : NewPatient  => {
  const newEntry : NewPatient = {
      name: parseField(object.name),
      dateOfBirth: parseField(object.dateOfBirth),
      ssn: parseField(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseField(object.occupation),
  };

  return newEntry;
};

const parseField = (field : any ) : string => {
    if (!field || !isString(field)){
        throw new Error(`incorrect or missing ${field}`);
    }
    return field;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseGender = (field : any ) : Gender => {
    if (!field || !isGender(field)){
        throw new Error(`incorrect or missing gender ${field}`);
    }

    return field;
};

const isGender = (field : any) : field is Gender => {
    return Object.values(Gender).includes(field);
};

export default toNewPatient;