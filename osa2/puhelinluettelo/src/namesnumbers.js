import React from 'react'

const Persons = ({persons, remove}) => {
    return(
        persons.map(person =>
            <p key={person.name}>
                {person.name}: {person.number}
                <button onClick={() => remove(person)} >delete</button>
            </p>
            )
    )
}

export default Persons