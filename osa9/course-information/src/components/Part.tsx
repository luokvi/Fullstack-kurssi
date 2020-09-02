import React from 'react';
import { CoursePart } from '../index';

interface PartProps {
    course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Part: React.FC<PartProps> = (props) => {
  let toReturn = (<p></p>);
  const c = props.course;
    switch (c.name) {
        case 'Fundamentals':
          toReturn = (<p><b>{c.name}</b> ({c.exerciseCount}): {c.description}</p>);
          break;

        case 'Using props to pass data':
          toReturn = (<p><b>{c.name}</b> ({c.exerciseCount}): 
            Includes {c.groupProjectCount} Group projects</p>);
          break;

        case 'Deeper type usage':
          toReturn = (<p><b>{c.name}</b> ({c.exerciseCount}): {c.description} <br></br>
            Submissions here: <a href={c.exerciseSubmissionLink}>{c.exerciseSubmissionLink}</a></p>);
          break;

        case 'Custom Course Part':
          toReturn = (<p><b>{c.name}</b> ({c.exerciseCount}): {c.description} <br></br>
          <i>Joke Factor: {c.jokeFactor}, hahahaha!</i></p>);
          break;

          default:
            return assertNever(c);
    }

  return toReturn;
}

export default Part;