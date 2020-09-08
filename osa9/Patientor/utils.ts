import { NewPatient, Gender, HealthCheckRating, Discharge, SickLeave, NewEntry } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const toNewPatient = (object : any) : NewPatient  => {
  const newEntry : NewPatient = {
      name: parseField(object.name),
      dateOfBirth: parseField(object.dateOfBirth),
      ssn: parseField(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseField(object.occupation),
  };

  return newEntry;
};

export const toNewHealthcheckEntry = (object: any) : NewEntry => {
    const newEntry: NewEntry = {
      description: parseField(object.description),
      date: parseDate(object.date),
      specialist: parseField(object.specialist),
      diagnosisCodes: parseDiagnosisArray(object.diagnosisCodes),
      type: parseEntryTypeHealthcheck(object.type),
      healthCheckRating: parseHealthCheck(object.healthCheckRating),

    };

    return newEntry;
};

export const toNewHospitalEntry = (object: any) : NewEntry => {
    const newEntry: NewEntry = {
      description: parseField(object.description),
      date: parseDate(object.date),
      specialist: parseField(object.specialist),
      diagnosisCodes: parseDiagnosisArray(object.diagnosisCodes),
      discharge: parseDischarge(object.discharge),
      type: parseEntryTypeHospital(object.type)

    };

    return newEntry;
};

export const toNewOccupationalEntry = (object: any) : NewEntry => {
    const newEntry: NewEntry = {
      description: parseField(object.description),
      date: parseDate(object.date),
      specialist: parseField(object.specialist),
      diagnosisCodes: parseDiagnosisArray(object.diagnosisCodes),
      sickLeave: parseSickLeave(object.sickLeave),
      employerName: parseField(object.employerName),
      type: parseEntryTypeOccupational(object.type)

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

const parseDiagnosisArray = (field: any[]) : string[] => {
    if (Array.isArray(field)){
      let index = 0;
      while (index < field.length){
         if(!isString(field[index])){
           throw new Error(`incorrect or missing diagnosis ${field[index]}`);
        }
        index += 1;
      }
   }

    return field;
};

const parseHealthCheck = (field: any): HealthCheckRating => {
    if (undefined || !isHealthCheckRating(field)){
        throw new Error(`incorrect or missing healthcheckrating ${field}`);
    }
    return field;
};

const isHealthCheckRating = (field: any): field is HealthCheckRating => {
    const numericvalues = [1, 2, 3, 0];
    return numericvalues.includes(field);
};

const parseDischarge = (field: any): Discharge => {
    if(!field || !isDischarge(field)){
        throw new Error(`incorrect or missing discharge ${field}`);
    }

    return field;
};
const isDischarge = (field: any): field is Discharge => {
    return isDate(field.date) && isString(field.criteria);
};

const parseSickLeave = (field: any): SickLeave | undefined => {
    if (field === undefined){
        return undefined;
    }
    if (!isSickleave(field)){
        throw new Error(`incorrect or missing sickleave ${field}`);
    }
    return field;
};

const isSickleave = (field: any): field is SickLeave => {
    if (!field){
        return false;
    }
    return isDate(field.startDate) && isDate(field.endDate);
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date ${date}`);
  }
  return date;
};

const parseEntryTypeHealthcheck = (field: any): "HealthCheck" => {
    if(field === "HealthCheck"){
      return field;
    }

    throw new Error(`incorrect or missing type ${field}`);
};

const parseEntryTypeHospital = (field: any): "Hospital" => {
    if (field === "Hospital"){
        return field;
    }

    throw new Error(`incorrect or missing type ${field}`);
};

const parseEntryTypeOccupational = (field: any): "OccupationalHealthcare" => {
    if (field === "OccupationalHealthcare"){
        return field;
    }

    throw new Error(`incorrect or missing type ${field}`);
};
