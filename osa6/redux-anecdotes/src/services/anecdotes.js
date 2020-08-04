import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)

    return res.data
}

const createNew = async (content) => {
    const newAnecdote = {
        content: content,
        votes: 0
    }
    const res = await axios.post(baseUrl, newAnecdote)

    return res.data
}

const voteForAnecdote = async (id) => {
    const toVoteFor = await axios.get(`${baseUrl}/${id}`)
    const voted = {
        ...toVoteFor.data,
        votes: toVoteFor.data.votes + 1
    }

    const res = await axios.put(`${baseUrl}/${id}`, voted)

    return res.data
}

export default { getAll, createNew, voteForAnecdote }