import React, { useState } from 'react'
import Persons from './namesnumbers'
import NameForm from './nameForm'
import FilterForm from './filterForm'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter ] = useState('')

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

  const namesToShow = persons.filter(person => person.name.match(new RegExp(newFilter, "i")))

  const handleFilterInput = (event) =>{
      setNewFilter(event.target.value)
      
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <FilterForm newFilter={newFilter} handleFilterInput={handleFilterInput}/>      

      <h2>Add New</h2>
      <NameForm addName={addName} newName={newName} handleNameInput={handleNameInput}
      newNumber={newNumber} handleNumInput={handleNumInput}/>

      <h2>Numbers</h2>
      <Persons persons={namesToShow} />
    </div>
  )

}

export default App