
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginPage from './components/LoginPage'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import RecommendedBooks from './components/recommendedBooks'

const App = () => {
  const [page, setPage] = useState('authors')
  
  const currentToken = localStorage.getItem('library-user-token')
  const [token, setToken] = useState(currentToken)

  const client = useApolloClient()

  const allBooksResult = useQuery(ALL_BOOKS)

  const logout = () => {
    console.log("logging out!!")
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    } 
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)

      window.alert(`New book added: ${addedBook.title}`)
    }
  })

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
        result={allBooksResult}
      />

      <NewBook
        show={page === 'add'}
        updateCache={updateCacheWith}
      />

      <LoginPage
        show={page === 'login'}
        setToken={setToken}
      />

      <RecommendedBooks
        show={page === 'recommend'}
        result={allBooksResult}
      />

    </div>
  )
}

export default App