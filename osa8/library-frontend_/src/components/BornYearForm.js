import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BORN, ALL_AUTHORS } from '../queries'

const BornYearFrom = () => {
  const [ name, setName ] = useState('')
  const [ year, setYear ] = useState('')
  const [ editBorn ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
    editBorn({
        variables: { name, setBornTo: year}
    })

    setName('')
    setYear('')
  }

  return(
      <div>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
                name
                <input value={name}
                onChange={({ target }) => setName(target.value)} />
            </div>
            <div>
                born
                <input value={year}
                onChange={({ target }) => setYear(parseInt(target.value))} />
            </div>
            <button type='submit'>update author</button>
          </form>
      </div>
  )

}

export default BornYearFrom