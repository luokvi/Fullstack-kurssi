import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('renders Blog with', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Blogi testauksesta',
      author: 'Testi Testaaja',
      url: 'tested.com',
      likes: 33,
      user: { username: 'Lisääjä', name: 'Matti' }
    }
    component = render( <Blog blog={blog} />)
  })

  test('only blog name and author when not opened', () => {

    expect(component.container).toHaveTextContent('Blogi testauksesta by Testi Testaaja')
    expect(component.container).not.toHaveTextContent('tested.com 33')
  })

  test('all fields of blog when opened', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Blogi testauksestahideTesti Testaajatested.com33likeMatti')
  })
})