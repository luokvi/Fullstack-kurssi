import React from 'react';
import { Entry, Diagnosis } from '../types'
import { Icon, Segment } from 'semantic-ui-react';
import { assertNever } from '../constants'

interface EntriesListProps {
    entries: Entry[] | undefined;
    diagnoses: Diagnosis[];
}

interface EntryOnList {
  entry: Entry;
  icon: JSX.Element;
  fullDiagnoses: FullDiagnose[];
}
interface FullDiagnose {
    code: String;
    name: String;
}
  
const EntriesList: React.FC<EntriesListProps> = ({ entries, diagnoses }) => {
  if (!entries || entries.length === 0){
    return(
      <div>
        <p><b>no entries yet</b></p>
      </div>
    )
  }

  let entriesOnList: EntryOnList [] = [];
  entries.map((e: Entry) => {
    let diagnosesOnEntry: FullDiagnose [] = [];
    e.diagnosisCodes?.map(d => {
      const diagnosis = diagnoses.find((full: Diagnosis) => full.code === String(d));
      if (diagnosis){
        const newDiagnose: FullDiagnose = { code: diagnosis.code, name: diagnosis.name};
        diagnosesOnEntry = [...diagnosesOnEntry, newDiagnose];
      };
    })
    let entryIcon = <Icon></Icon>
    switch (e.type) {
      case "HealthCheck":
        entryIcon = <Icon name="doctor"></Icon>
        break;
      case "Hospital":
        entryIcon = <Icon name="hospital"></Icon>
        break;
      case "OccupationalHealthcare":
        entryIcon = <span><Icon name="address card"></Icon> {e.employerName}</span>
        break;
      default:
        return(assertNever(e));
        break;
    }
    const constructedEntry: EntryOnList = {entry: e, fullDiagnoses: diagnosesOnEntry, icon: entryIcon};
    entriesOnList = [...entriesOnList, constructedEntry];
});


  return (
    <div>
      <h4>entries</h4>
      {entriesOnList.map((e: EntryOnList) =>
        <Segment key={e.entry.id}>
          <h2>{e.entry.date} {e.icon}</h2>
          <p>{e.entry.description}</p>
          <p>seen by: {e.entry.specialist}</p>
          <ul>
            {e.fullDiagnoses.map((d: FullDiagnose) =>
              <li key={String(d.code)}>
                {d.code} {d.name} 
              </li>
            )}
          </ul>
        </Segment>
      )}
    </div>
  )
}

export default EntriesList;