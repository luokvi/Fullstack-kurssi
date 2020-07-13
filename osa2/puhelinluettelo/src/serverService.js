import axios from 'axios'

const getAll = () =>{
    const data = axios.get('/api/persons')

    return data.then(response => response.data)
}

const addNew = (newPerson) =>{
    axios.post('/api/persons', newPerson)

}

const removeName = (id) =>{
    return axios.delete(`/api/persons/${id}`)
}

//Not Functional
const replaceNum = (persons, name, number) =>{

    const toUpdate = persons.find(p => p.name === name)
    const updatedPerson = { ... toUpdate, number: number}
    const updated = axios.put(`http://localhost:3001/persons/${updatedPerson.id}`, updatedPerson)
    return updated.then(response => response.data)
}

export default {getAll, addNew, removeName, replaceNum}