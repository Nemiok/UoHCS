import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

/* describe('Blog', () => {
  beforeEach(() => {
    let container

    beforeEach(() => {
      container = render(
        <Togglable buttonLabel="show...">
          <div className="testDiv" >
            togglable content
          </div>
        </Togglable>
      ).container
    })
  })
})
 */
test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: true,
    likes: 10,
    id: '123',
    url: 'abc',
    user: { username: 'testName' }
  }

  const { container } = render(<Blog blog={blog} />)

  const heading = container.querySelector('.blog-heading')
  expect(heading).toBeDefined()

  const url = container.querySelector('.item__url')
  expect(url).toEqual(null)

  const likes = container.querySelector('.item__likes')
  expect(likes).toEqual(null)
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: true,
    likes: 10,
    id: '123',
    url: 'abc',
    user: { username: 'testName' }
  }

  const { container } = render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const url = container.querySelector('.item__url')
  expect(url).toBeDefined()

  const likes = container.querySelector('.item__likes')
  expect(likes).toBeDefined()

})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: true,
    likes: 10,
    id: '123',
    url: 'abc',
    user: { username: 'testName' }
  }

  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(
    <Blog blog={blog} handleUpdateBlog={mockHandler} />
  )

  const buttonShow = screen.getByText('show')
  await user.click(buttonShow)

  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('<BlogForm /> creates correct blog', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleNewBlogSubmit={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const createBlogButton = screen.getByText('create')

  await user.type(inputs[0], 'title')
  await user.type(inputs[1], 'author')
  await user.type(inputs[2], 'url')
  await user.click(createBlogButton)

  screen.debug()
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title')
  expect(createBlog.mock.calls[0][0].author).toBe('author')
  expect(createBlog.mock.calls[0][0].url).toBe('url')
})