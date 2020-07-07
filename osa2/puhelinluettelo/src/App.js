import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './namesnumbers'
import NameForm from './nameForm'
import FilterForm from './filterForm'
import server from './serverService'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter ] = useState('')


  const addName = (event) =>{
    event.preventDefault()

    const match = (person) => person.name === newName
    const alreadyInList = persons.some(match)
    if (alreadyInList){

        const replace = window.confirm(`${newName} is already in the phonebook. Replace their older number with ${newNumber}?`)
        if (replace){
          replaceNum(newName, newNumber)
        }

        return
    }

    const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
    }

    setPersons(persons.concat(newPerson))
    server.addNew(newPerson)
    
  }

  const removeName = (p) =>{
    const toDelete = window.confirm(`Are you sure you want to delete ${p.name} from the phonebook?`)

    if (toDelete){
      server.removeName(p.id).then(response =>{
        const names = server.getAll()
        names.then(response =>{
          setPersons(response)
        })
      })
    }  
  }

  const replaceNum = (name, number) =>{
    server.replaceNum(persons, name, number).then(r =>{
      const names = server.getAll()
      names.then(response =>{
        setPersons(response)
      })
    })
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

  useEffect(() =>{
    const data = server.getAll()
    data.then(response => {
      setPersons(response)
    })
   }, [])

  
  return (
    <div>
      <h1>Phonebook</h1>

      <FilterForm newFilter={newFilter} handleFilterInput={handleFilterInput}/>      

      <h2>Add New</h2>
      <NameForm addName={addName} newName={newName} handleNameInput={handleNameInput}
      newNumber={newNumber} handleNumInput={handleNumInput}/>

      <h2>Numbers</h2>
      <Persons persons={namesToShow} remove={removeName}/>
    </div>
  )

}

export default App