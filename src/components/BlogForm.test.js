import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogFrom from './BlogForm'


test('BlogForm should receive right details when new blog created', () => {
  const addBlog = jest.fn()
  const setTitle = jest.fn()
  const setAuthor = jest.fn()
  const setUrl = jest.fn()
  const setBlogFormVis = jest.fn()

  const component = render(
    <BlogFrom addBlog={addBlog} title="" setTitle={setTitle} author="" setAuthor={setAuthor} url="" setUrl={setUrl} setBlogFormVis={setBlogFormVis}/>
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  fireEvent.change(title, {
    target: { value: 'Title' }
  })
  fireEvent.change(author, {
    target: { value: 'Author' }
  })
  fireEvent.change(url, {
    target: { value: 'URL' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)

  expect(setTitle.mock.calls[0][0]).toBe('Title')
  expect(setAuthor.mock.calls[0][0]).toBe('Author')
  expect(setUrl.mock.calls[0][0]).toBe('URL')
})
