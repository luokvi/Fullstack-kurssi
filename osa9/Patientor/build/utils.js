"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewOccupationalEntry = exports.toNewHospitalEntry = exports.toNewHealthcheckEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
/* eslint-disable @typescript-eslint/no-explicit-any */
exports.toNewPatient = (object) => {
    const newEntry = {
        name: parseField(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseField(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseField(object.occupation),
    };
    return newEntry;
};
exports.toNewHealthcheckEntry = (object) => {
    const newEntry = {
        description: parseField(object.description),
        date: parseDate(object.date),
        specialist: parseField(object.specialist),
        diagnosisCodes: parseDiagnosisArray(object.diagnosisCodes),
        type: parseEntryTypeHealthcheck(object.type),
        healthCheckRating: parseHealthCheck(object.healthCheckRating),
    };
    return newEntry;
};
exports.toNewHospitalEntry = (object) => {
    const newEntry = {
        description: parseField(object.description),
        date: parseDate(object.date),
        specialist: parseField(object.specialist),
        diagnosisCodes: parseDiagnosisArray(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge),
        type: parseEntryTypeHospital(object.type)
    };
    return newEntry;
};
exports.toNewOccupationalEntry = (object) => {
    const newEntry = {
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
const parseField = (field) => {
    if (!field || !isString(field)) {
        throw new Error(`incorrect or missing ${field}`);
    }
    return field;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseGender = (field) => {
    if (!field || !isGender(field)) {
        throw new Error(`incorrect or missing gender ${field}`);
    }
    return field;
};
const isGender = (field) => {
    return Object.values(types_1.Gender).includes(field);
};
const parseDiagnosisArray = (field) => {
    if (Array.isArray(field)) {
        let index = 0;
        while (index < field.length) {
            if (!isString(field[index])) {
                throw new Error(`incorrect or missing diagnosis ${field[index]}`);
            }
            index += 1;
        }
    }
    return field;
};
const parseHealthCheck = (field) => {
    if (undefined || !isHealthCheckRating(field)) {
        throw new Error(`incorrect or missing healthcheckrating ${field}`);
    }
    return field;
};
const isHealthCheckRating = (field) => {
    const numericvalues = [1, 2, 3, 0];
    return numericvalues.includes(field);
};
const parseDischarge = (field) => {
    if (!field || !isDischarge(field)) {
        throw new Error(`incorrect or missing discharge ${field}`);
    }
    return field;
};
const isDischarge = (field) => {
    return isDate(field.date) && isString(field.criteria);
};
const parseSickLeave = (field) => {
    if (field === undefined) {
        return undefined;
    }
    if (!isSickleave(field)) {
        throw new Error(`incorrect or missing sickleave ${field}`);
    }
    return field;
};
const isSickleave = (field) => {
    if (!field) {
        return false;
    }
    return isDate(field.startDate) && isDate(field.endDate);
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date ${date}`);
    }
    return date;
};
const parseEntryTypeHealthcheck = (field) => {
    if (field === "HealthCheck") {
        return field;
    }
    throw new Error(`incorrect or missing type ${field}`);
};
const parseEntryTypeHospital = (field) => {
    if (field === "Hospital") {
        return field;
    }
    throw new Error(`incorrect or missing type ${field}`);
};
const parseEntryTypeOccupational = (field) => {
    if (field === "OccupationalHealthcare") {
        return field;
    }
    throw new Error(`incorrect or missing type ${field}`);
};
