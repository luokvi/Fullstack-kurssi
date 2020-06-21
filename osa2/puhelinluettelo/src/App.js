import React, { useState } from 'react'

const Persons = ({persons}) => {
    return(
        persons.map(person =>
            <p key={person.name}>
                {person.name}
            </p>
            )
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    const newPerson = {
        name: newName,
        number: '00',
        id: persons.length + 1
    }
    
    setPersons(persons.concat(newPerson))
  }

  const handleInput = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App