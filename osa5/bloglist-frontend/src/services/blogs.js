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

const like = async (blog) => {
  const likedBlog = {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: (blog.likes + 1),
    user: blog.user
  }

  await axios.put((baseUrl + `/${blog.id}`), likedBlog)
}

const remove = async (blog) => {
  const config = { headers: { authorization: token }, }
  await axios.delete((baseUrl + `/${blog.id}`), config)
}

export default { getAll, setToken, createBlog, like, remove }