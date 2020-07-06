import React, {useState, useEffect}from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const Countries = ({list}) =>{
  if (list.length === 1){
    return(
      list.map(country =>
      <div key={country.name}>
        <h1>{country.name}</h1>
        <p>
          Capital: {country.capital}<br />
          Population: {country.population}
          </p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(lan =>
            <li key={lan.name}>
              {lan.name}
              </li>
          )
          }
        </ul>
        <img src={country.flag} alt="" width="200" />
      </div>
      )
    )
  }
  if (list.length <= 10){
    return(
      list.map(country =>
        <p key={country.name}>
          {country.name}
        </p>
      )
    )
  }

  return(
    <p>
      Too many matches, specify another filter!
    </p>
  )
}

const App = () =>{
  const [ newFilter, setFilter] = useState('')
  const handleFilterInput = (event) =>{
    setFilter(event.target.value)
  }

  const [ countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response =>{
      setCountries(response.data)
    })
  }, [])

  const countriesToShow = countries.filter(country => country.name.match(new RegExp(newFilter, "i")))

  return(
      <div>
      find countries: <input value={newFilter} onChange={handleFilterInput} />
      <Countries list={countriesToShow} />
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
