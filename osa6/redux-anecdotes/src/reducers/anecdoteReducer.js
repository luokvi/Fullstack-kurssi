import { act } from "react-dom/test-utils"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    
    case 'VOTE':
      const id = action.data.id
      const anecToVote = state.find(a => a.id === id)
      const voted = {
        ...anecToVote,
        votes: anecToVote.votes + 1
      }
      return state.map(a => a.id !== id ? a : voted)

    case 'INIT':
      return action.data

    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default reducer