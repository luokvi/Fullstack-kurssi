import React, { useState } from 'react'

import BookList from './FilteredBookList'


const Books = (props) => {
  const [genreFilter, setGenreFilter ] = useState('allGenres')
  const result = props.result

  if (!props.show) {
    return null
  }
  if(result.loading){
    return(
      <div>loading...</div>
    )
  }

  const books = result.data.allBooks
  
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
      <BookList books={books} filter={genreFilter}/>
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