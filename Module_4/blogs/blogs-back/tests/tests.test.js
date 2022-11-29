const listHelper = require('../utils/list_helper')
const listofBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a6762123',
    title: 'Go To Statement Considered ',
    author: 'Edsger',
    url: 'htt',
    likes: 2,
    __v: 0
  },
  {
    _id: '5a422aa71b54a6762123',
    title: 'Go To Statement Considered ',
    author: 'Edsger',
    url: 'htt',
    likes: 7,
    __v: 0
  }
]

/* describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listofBlogs)
    expect(result).toBe(7)
  })

  test('favorite blog', () => {
    const favoriteBlog = listHelper.favoriteBlog(listofBlogs)
    expect(favoriteBlog).toEqual(listofBlogs[0])
  })
}
) */

/* describe('most blogs', () => {
  test('found the author with most blogs', () => {
    expect(listHelper.mostBlogs(listofBlogs)).toEqual({ author: 'Edsger', blogs: 2 })
  })
}) */

describe('most likes', () => {
  test('found the author with most likes', () => {
    expect(listHelper.mostLikes(listofBlogs)).toEqual({ author: 'Edsger', likes: 9 })
  })
})

/* test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
}) */