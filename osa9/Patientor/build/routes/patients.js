"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_json_1 = __importDefault(require("../data/patients.json"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = getNoSensitivePatients();
    res.send(patients);
});
const getNoSensitivePatients = () => {
    return patients_json_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.default = router;
