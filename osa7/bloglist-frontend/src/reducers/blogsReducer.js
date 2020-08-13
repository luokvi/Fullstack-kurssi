import blogService from '../services/blogs'

const blogsReducer = (state = [ ], action) => {
  let id = null
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]

  case 'INIT_BLOGS':
    return action.data

  case 'LIKE':
    id = action.data.id
    return state.map(blog => blog.id !== id ? blog : action.data)

  case 'DELETE':
    id = action.data.id
    return state.filter(blog => blog.id !== id)

  case 'COMMENT':
    id = action.data.id
    const blogToUpdate = state.find(b => b.id === id)
    const updatedBlog = {
      ...blogToUpdate,
      comments: blogToUpdate.comments.concat(action.data.comment)
    }
    return state.map(blog => blog.id === id ? updatedBlog : blog)


  default: return state
  }
}

export const addBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const like = (blog) => {
  return async dispatch => {
    await blogService.like(blog)

    dispatch({
      type: 'LIKE',
      data: blog,
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)

    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}

export const setBlogs = list => {
  return ({
    type: 'INIT_BLOGS',
    data: list
  })
}

export const comment = (blog, comment) => {
  return async dispatch => {
    const com = { comment: comment }
    await blogService.comment(blog, com)
    com.id = blog.id
    dispatch({
      type: 'COMMENT',
      data: com
    })
  }
}

export default blogsReducer