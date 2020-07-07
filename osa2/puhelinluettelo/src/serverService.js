import axios from 'axios'

const getAll = () =>{
    const data = axios.get('http://localhost:3001/persons')
    
    return data.then(response => response.data)
}

const addNew = (newPerson) =>{
    axios.post('http://localhost:3001/persons', newPerson)

}

export default {getAll, addNew}