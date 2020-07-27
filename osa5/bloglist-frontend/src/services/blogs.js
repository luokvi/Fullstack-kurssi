import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createBlog = async newBlog => {
  const config = { headers: { authorization: token }, }
  const res = await axios.post(baseUrl, newBlog, config)

  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { getAll, setToken, createBlog }