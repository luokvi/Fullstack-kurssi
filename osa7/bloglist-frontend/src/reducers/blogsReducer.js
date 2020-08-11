import blogService from '../services/blogs'

const blogsReducer = (state = [ ], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]

  case 'INIT_BLOGS':
    return action.data

  case 'LIKE':
    return state

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

export const setBlogs = list => {
  return ({
    type: 'INIT_BLOGS',
    data: list
  })
}

export default blogsReducer