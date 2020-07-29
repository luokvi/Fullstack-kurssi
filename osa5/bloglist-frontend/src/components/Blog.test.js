import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {
  let component
  const mockLikeHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Blogi testauksesta',
      author: 'Testi Testaaja',
      url: 'tested.com',
      likes: 33,
      user: { username: 'Lisääjä', name: 'Matti' }
    }
    component = render( <Blog blog={blog} likeFunction={mockLikeHandler}/>)
  })

  test('renders only blog name and author when not opened', () => {

    expect(component.container).toHaveTextContent('Blogi testauksesta by Testi Testaaja')
    expect(component.container).not.toHaveTextContent('tested.com 33')
  })

  test('renders all fields of blog when opened', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Blogi testauksestahideTesti Testaajatested.com33likeMatti')
  })

  test('Pressing blogs "like" button is registered', () => {
    const openBtn = component.getByText('view')
    fireEvent.click(openBtn)
    const likeBtn = component.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
