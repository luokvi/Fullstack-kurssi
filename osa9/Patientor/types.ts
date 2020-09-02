export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender | string;
    occupation: string;
    entries: Entry [];
}

export type NoSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;