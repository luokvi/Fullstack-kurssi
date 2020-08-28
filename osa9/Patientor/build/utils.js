"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = (object) => {
    const newEntry = {
        name: parseField(object.name),
        dateOfBirth: parseField(object.dateOfBirth),
        ssn: parseField(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseField(object.occupation),
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
exports.default = toNewPatient;
