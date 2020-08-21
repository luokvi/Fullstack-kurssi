import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_ME_GENRE } from '../queries'

import BookList from './FilteredBookList'


const RecommendedBooks = (props) => {
  const result = useQuery(ALL_BOOKS)
  const me = useQuery(GET_ME_GENRE, {
      onError: (error) => {
          console.log('error:', error)
      }
  })

  if (!props.show) {
    return null
  }
  if(result.loading){
    return(
      <div>loading...</div>
    )
  }

  const books = result.data.allBooks
  console.log(me)
  let genreFilter = me.data.me.favoriteGenre
  if (genreFilter === null){
    genreFilter = 'allGenres'
  }
  
  

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favourite genre <b>{genreFilter}</b></p>

      <BookList books={books} filter={genreFilter}/>

    </div>
  )
}

export default RecommendedBooks