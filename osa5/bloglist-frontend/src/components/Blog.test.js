import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('renders Blog with', () => {

  test('only blog name and author when not opened', () => {
    const blog = {
      title: 'Blogi testauksesta',
      author: 'Testi Testaaja',
      url: 'tested.com',
      likes: 33
    }

    const component = render( <Blog blog={blog} />)

    expect(component.container).toHaveTextContent('Blogi testauksesta by Testi Testaaja')
    expect(component.container).not.toHaveTextContent('tested.com 33')
  })
})