import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Block = styled.div`
  border-bottom: solid lightgray 2px;
  padding: 5px;
  
  &:hover {
    margin-left: 5px;
  }
`
const StyledLink = styled.p`
  color: black;
  transition: 0.5s;

  
`

const Blog = ({ blog, }) => {

  return (
    <Block>
      <StyledLink>
        <Link to={`/blogs/${blog.id}`}>
          <b>{blog.title}</b> by {blog.author}
        </Link>
      </StyledLink>
    </Block>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
