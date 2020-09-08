import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

type EntryToAdd = {
  entry: Entry;
  id: string;
};
export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_DETAILS";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
  }
  | {
      type: "ADD_ENTRY";
      payload: EntryToAdd;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_DETAILS":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      }

    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      }

    case "ADD_ENTRY":
      const patient = state.patients[action.payload.id];
      patient.entries?.push(action.payload.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: patient
        }
      }

    default:
      return state;
  }
};

export const SetPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients 
  }
};

export const AddPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  }
};

export const AddPatientDetails = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT_DETAILS",
    payload: patient
  }
};

export const SetDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  }
};

export const AddEntry = (entry: Entry, patientId: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {entry: entry, id: patientId}
  }
};
