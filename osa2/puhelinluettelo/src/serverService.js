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

const replaceNum = (persons, name, number) =>{

    const toUpdate = persons.find(p => p.name === name)
    const updatedPerson = { ... toUpdate, number: number}
    const updated = axios.put(`http://localhost:3001/api/persons/${updatedPerson.id}`, updatedPerson)
    return updated.then(response => response.data)
}

export default {getAll, addNew, removeName, replaceNum}