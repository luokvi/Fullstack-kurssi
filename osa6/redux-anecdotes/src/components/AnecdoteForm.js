import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
    
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))

        const notif = `added '${content}'`
        dispatch(setNotification(notif))

        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000)

      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addNew}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
      </div>
    )
}

export default AnecdoteForm