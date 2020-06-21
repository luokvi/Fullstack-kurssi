import React, { useState } from 'react'

const Persons = ({persons}) => {
    return(
        persons.map(person =>
            <p key={person.name}>
                {person.name}: {person.number}
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
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) =>{
    event.preventDefault()

    const match = (person) => person.name === newName
    const alreadyInList = persons.some(match)
    if (alreadyInList){
        window.alert(`${newName} has already been added to phonebook`)

        return
    }

    const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
    }

    setPersons(persons.concat(newPerson))
  }

  const handleNameInput = (event) =>{
    
    setNewName(event.target.value)
    
  }

  const handleNumInput = (event) =>{
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumInput} />
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