import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blogForm'

test('<BlogForm /> sends inputed fields to create a Blog', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createNewBlog={createBlog} />
  )

  const titleInput =  component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testi blogi' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'kirjoittaja' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'google.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  const inputed = createBlog.mock.calls[0][0]
  expect(inputed.title).toBe('testi blogi' )
  expect(inputed.author).toBe('kirjoittaja' )
  expect(inputed.url).toBe('google.com' )
})