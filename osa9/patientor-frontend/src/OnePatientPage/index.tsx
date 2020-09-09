import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom'
import { Container, Icon, Button } from "semantic-ui-react";

import { Patient, Entry, Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, AddPatientDetails, SetDiagnoses, AddEntry } from "../state";
import EntriesList from './entriesList';

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";


const OnePatientPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const {data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(AddEntry(newEntry, id));
      closeModal();

    }catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
    
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  )
}

export default OnePatientPage;