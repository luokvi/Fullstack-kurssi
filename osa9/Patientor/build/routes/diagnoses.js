"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_json_1 = __importDefault(require("../data/diagnoses.json"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const diagnoses = getDiagnoses();
    res.send(diagnoses);
});
const getDiagnoses = () => {
    return diagnoses_json_1.default;
};
exports.default = router;
