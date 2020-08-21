
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginPage from './components/LoginPage'
import { useApolloClient } from '@apollo/client'
import RecommendedBooks from './components/recommendedBooks'

const App = () => {
  const [page, setPage] = useState('authors')
  
  const currentToken = localStorage.getItem('library-user-token')
  const [token, setToken] = useState(currentToken)

  const client = useApolloClient()

  const logout = () => {
    console.log("logging out!!")
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null ?
          <button onClick={() => setPage('login')}>login</button>
        :
          <span>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </span>
        }
        
      </div>

      <Authors
        show={page === 'authors'}
        hasToken={token !== null}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginPage
        show={page === 'login'}
        setToken={setToken}
      />

      <RecommendedBooks
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App