const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { blogsInDb } = require('../utils/list_helper')


const initialBlogs = [
  {
    title: 'heading',
    author: 'Oqtay',
    url: 'someurl.com',
    likes: 7,
  },
  {
    title: 'heading',
    author: 'Akar',
    url: 'someurl.com',
    likes: 24,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('all notes have unique id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.map(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('successfully added new blog', async () => {
  const newBlog = {
    title: 'heading',
    author: 'New Author',
    url: 'someurl.com',
    likes: 21,
  }

  const user = {
    'username': 'testUser',
    'name': 'testy',
    'password': '12345'
  }

  await api
    .post('/api/users')
    .send(user)

  const userIsSignedIn = await api.post('/api/login').send(user)
  const token = userIsSignedIn.body.token
  console.log(token.toString())

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)


  const response = await api.get('/api/blogs')
  const authorsUpdated = response.body.map(blog => blog.author)
  expect(authorsUpdated).toHaveLength(initialBlogs.length + 1)
  expect(authorsUpdated).toContain('New Author')
})

test('unset likes default to zero', async () => {
  const newBlogWithMissingLikes = {
    title: 'heading',
    author: 'New Author',
    url: 'someurl.com',
  }

  const user = {
    'username': 'testUser',
    'name': 'testy',
    'password': '12345'
  }

  await api
    .post('/api/users')
    .send(user)

  const userIsSignedIn = await api.post('/api/login').send(user)
  const token = userIsSignedIn.body.token
  console.log(token.toString())

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlogWithMissingLikes)
    .expect(200)

  const response = await api.get('/api/blogs')
  const authorsUpdated = response.body.map(blog => blog.likes)
  expect(authorsUpdated).toContain(0)
})

test('missing title or url responds with 400', async () => {
  const newBlogWithMissingUrl = {
    title: 'heading',
    author: 'New Author',
    likes: 1
  }

  const user = {
    'username': 'testUser',
    'name': 'testy',
    'password': '12345'
  }

  await api
    .post('/api/users')
    .send(user)

  const userIsSignedIn = await api.post('/api/login').send(user)
  const token = userIsSignedIn.body.token
  console.log(token.toString())

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlogWithMissingUrl)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('successfully deleted blog', async () => {

  const newBlog = {
    title: 'test',
    author: 'test',
    url: 'someurl.com',
    likes: 21,
  }

  const user = {
    'username': 'testUser',
    'name': 'testy',
    'password': '12345'
  }

  await api
    .post('/api/users')
    .send(user)

  const userIsSignedIn = await api.post('/api/login').send(user)
  const token = userIsSignedIn.body.token
  console.log(token.toString())

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)

  const blogsAtLast = await blogsInDb()
  const blogToDelete = blogsAtLast[blogsAtLast.length - 1]
  console.log(blogToDelete, blogToDelete.id)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  const blogs = response.body
  expect(blogs).toHaveLength(initialBlogs.length)
})

test('successfully updated blog', async () => {
  const blogsAtFirst = await blogsInDb()
  const blogToUpdate = blogsAtFirst[0]

  const newBlogData = {
    title: 'heading',
    author: 'New Author',
    url: 'someurl.com',
    likes: 21,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlogData)
    .expect(200)

  const response = await api.get('/api/blogs')
  const updatedBlogs = response.body
  expect(updatedBlogs[0].author).toContain('New Author')
})

afterAll(() => {
  mongoose.connection.close()
})