"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_json_1 = __importDefault(require("../data/patients.json"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = getNoSensitivePatients();
    res.send(patients);
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.default(req.body);
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
const getNoSensitivePatients = () => {
    return patients_json_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: []
    }));
};
const addNew = (entry) => {
    const newPatient = Object.assign({ id: String(Math.random() * 50), entries: [] }, entry);
    patients_json_1.default.push(newPatient);
    return newPatient;
};
const getOnePatient = (id) => {
    const onePatient = patients_json_1.default.find(p => p.id === id);
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
        entries: []
    };
};
exports.default = router;
