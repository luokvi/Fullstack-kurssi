"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("../data/patients"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = getNoSensitivePatients();
    res.send(patients);
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.toNewPatient(req.body);
        const added = addNew(newPatientEntry);
        res.json(added);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = getOnePatient(id);
    if (!patient) {
        res.status(404);
    }
    res.status(200).send(patient);
});
router.post('/:id/entries', (req, res) => {
    try {
        let newEntry;
        switch (req.body.type) {
            case ("HealthCheck"):
                newEntry = utils_1.toNewHealthcheckEntry(req.body);
                break;
            case ("Hospital"):
                newEntry = utils_1.toNewHospitalEntry(req.body);
                break;
            case ("OccupationalHealthcare"):
                newEntry = utils_1.toNewOccupationalEntry(req.body);
                break;
            default:
                throw new Error('Entry not of any type');
        }
        const added = addNewEntry(newEntry);
        const id = req.params.id;
        const patient = getOnePatient(id);
        patient === null || patient === void 0 ? void 0 : patient.entries.push(added);
        res.json(added);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
const getNoSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addNew = (entry) => {
    const newPatient = Object.assign({ id: String(Math.random() * 50), entries: [] }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
const getOnePatient = (id) => {
    const onePatient = patients_1.default.find(p => p.id === id);
    if (!onePatient) {
        return undefined;
    }
    return {
        id: onePatient === null || onePatient === void 0 ? void 0 : onePatient.id,
        name: onePatient === null || onePatient === void 0 ? void 0 : onePatient.name,
        ssn: onePatient === null || onePatient === void 0 ? void 0 : onePatient.ssn,
        dateOfBirth: onePatient === null || onePatient === void 0 ? void 0 : onePatient.dateOfBirth,
        gender: onePatient === null || onePatient === void 0 ? void 0 : onePatient.gender,
        occupation: onePatient === null || onePatient === void 0 ? void 0 : onePatient.occupation,
        entries: onePatient === null || onePatient === void 0 ? void 0 : onePatient.entries
    };
};
const addNewEntry = (entry) => {
    const newentry = Object.assign({ id: String(Math.random() * 40) }, entry);
    return newentry;
};
exports.default = router;
