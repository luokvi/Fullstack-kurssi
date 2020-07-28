import React, {} from 'react'

const BlogForm = ({
    createNewBlog,
    blogTitle,
    setTitle,
    blogAuthor,
    setAuthor,
    blogUrl,
    setUrl
}) => {

    return(
      <div>
        <h3>create new</h3>
        <form onSubmit={createNewBlog}>
            <div>Title
                <input type="text" value={blogTitle} name="Title"
                onChange={({ target }) => setTitle(target.value)}/>
            </div>
            <div>Author
                <input type="text" value={blogAuthor} name="Author"
                onChange={({ target }) => setAuthor(target.value)}/>
            </div>
            <div>Url
                <input type="text" value={blogUrl} name="Url"
                onChange={({ target }) => setUrl(target.value)}/>
            </div>
            <button type="submit">create</button>
        </form>
      </div>
    )
}

export default BlogForm