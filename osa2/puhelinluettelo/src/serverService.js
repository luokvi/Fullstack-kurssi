import axios from 'axios'

const getAll = () =>{
    const data = axios.get('/api/persons')

    return data.then(response => response.data)
}

const addNew = (newPerson) =>{
    const promise = axios.post('/api/persons', newPerson)
    return promise.then(res => res.data)
}

const removeName = (id) =>{
    return axios.delete(`/api/persons/${id}`)
}

const replaceNum = (persons, name, number) =>{

    const toUpdate = persons.find(p => p.name === name)
    const updatedPerson = { ... toUpdate, number: number}
    const updated = axios.put(`/api/persons/${updatedPerson.id}`, updatedPerson)
    return updated.then(response => response.data)
}

export default {getAll, addNew, removeName, replaceNum}