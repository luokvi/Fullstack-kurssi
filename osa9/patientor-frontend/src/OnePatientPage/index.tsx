import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom'
import { Container, Icon } from "semantic-ui-react";

import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, AddPatientDetails, SetDiagnoses } from "../state";
import EntriesList from './entriesList';


const OnePatientPage: React.FC = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    
    let patient = Object.values(patients).find((p : Patient) => p.id === id);

    React.useEffect(() => {
      const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                  `${apiBaseUrl}/patients/${id}`
                );
                dispatch(AddPatientDetails(patientFromApi));
              } catch (e) {
                console.error(e);
              }
        }
      const fetchDiagnoses = async () => {
        try {
          const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses`
          );
          dispatch(SetDiagnoses(diagnosesFromApi));
        } catch (e) {
          console.error(e);
        }
      }

      fetchPatient();
      fetchDiagnoses();
    }, [dispatch]);
    
    let genderIcon = <Icon name="genderless"></Icon>;
    switch (patient?.gender){
        case ("male"):
            genderIcon = <Icon name="mars"></Icon>;
            break;
        case ("female"):
            genderIcon = <Icon name="venus"></Icon>;
            break;
        case ("other"):
            genderIcon = <Icon name="transgender alternate"></Icon>;
            break;
        default:
            break;
    }

    return (
      <div>
        <Container textAlign="justified">
          <h2>{patient?.name} {genderIcon}</h2>
          <p>ssn: {patient?.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
          <p>date of birth: {patient?.dateOfBirth}</p>
          <EntriesList entries={patient?.entries} diagnoses={diagnoses}/>
          
        </Container>
      </div>
    )
}

export default OnePatientPage;