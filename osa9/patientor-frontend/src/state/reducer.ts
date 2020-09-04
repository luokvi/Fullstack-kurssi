import { State } from "./state";
import { Patient } from "../types";
import { type } from "os";

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
