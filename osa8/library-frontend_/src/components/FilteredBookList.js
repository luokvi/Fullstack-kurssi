import React from 'react'

const BookList = ({ books, filter }) => {

let booksToShow = books
  if (filter !== 'allGenres'){
    booksToShow = booksToShow.filter(b => {
        return b.genres.includes(filter)
    })
}

  return(
    <div>
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
        </div>
    )
}

export default BookList