import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const [genreFilter, setGenreFilter ] = useState('allGenres')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if(result.loading){
    return(
      <div>loading...</div>
    )
  }

  const books = result.data.allBooks
  let booksToShow = books
  if (genreFilter !== 'allGenres'){
    booksToShow = booksToShow.filter(b => {
      return b.genres.includes(genreFilter)
    })
  }

  let genres = []
  books.forEach(b => {
    genres = genres.concat(b.genres)
  })
  const uniqueGenres = new Set(genres)
  genres = [...uniqueGenres]
  

  return (
    <div>
      <h2>books</h2>
      {genreFilter !== 'allGenres'? <p>in genre <b>{genreFilter}</b></p>
        : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(g =>
          <button key={g} onClick={() => setGenreFilter(g)}>{g}</button>
          )}
          <button onClick={() => setGenreFilter('allGenres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books