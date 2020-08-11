import blogService from '../services/blogs'

const blogsReducer = (state = [ ], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]

  case 'INIT_BLOGS':
    return action.data

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

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const setBlogs = (list) => {
  return ({
    type: 'INIT_BLOGS',
    data: list
  })
}

export default blogsReducer