/* eslint-disable no-unused-vars */
const lodashForEach = require('lodash/forEach')
const lodashFind = require('lodash/find')
const Blog = require('../models/blog')
const User = require('../models/user')

const totalLikes = (blogs) => {

  return blogs.reduce((prevValue, currValue) => {
    return prevValue += currValue.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = 0
  blogs.map(blog => {
    blog.likes > favorite ? favorite = blog.likes : null
  })
  return blogs.find(blog => blog.likes === favorite)
}

const mostBlogs = (blogs) => {
  const counterObj = {}
  blogs.map(blog => {
    counterObj[blog.author] = counterObj[blog.author] + 1 || 1
  })
  let maxCount = 0
  const arrayOfAuthorsWithBlogsCount = []
  lodashForEach(counterObj, (value, key) => {
    arrayOfAuthorsWithBlogsCount.push({
      author: key,
      blogs: value
    })
  })

  lodashForEach(arrayOfAuthorsWithBlogsCount, o => {
    o.blogs > maxCount ? maxCount = o.blogs : null
  })

  const fancyAuthor = lodashFind(arrayOfAuthorsWithBlogsCount, o => {
    return o.blogs === maxCount
  })

  return fancyAuthor
}

const mostLikes = (blogs) => {
  const counterObj = {}
  blogs.map(blog => {
    counterObj[blog.author] = 0
  })

  blogs.map(blog => {
    counterObj[blog.author] = counterObj[blog.author] + blog.likes || blog.likes
  })

  let maxCount = 0
  const arrayOfAuthorsWithLikesCount = []
  lodashForEach(counterObj, (value, key) => {
    arrayOfAuthorsWithLikesCount.push({
      author: key,
      likes: value
    })
  })

  lodashForEach(arrayOfAuthorsWithLikesCount, o => {
    o.likes > maxCount ? maxCount = o.likes : null
  })

  const fancyAuthor = lodashFind(arrayOfAuthorsWithLikesCount, o => {
    return o.likes === maxCount
  })

  return fancyAuthor
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb,
  usersInDb
}