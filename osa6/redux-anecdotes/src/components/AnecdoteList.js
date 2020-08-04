import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    const id = anecdote.id
    console.log('vote', id)
    dispatch(voteForAnecdote(id))

    const notif = `you voted '${anecdote.content}'`
    dispatch(setNotification(notif))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

    return(
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList