import { useSelector } from "react-redux"
import Blog from "./Blog"

const Blogs = (props) => {
  const blogs = useSelector(state => state.blogs)
  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdateBlog={props.handleUpdateBlog} handleDeleteBlog={props.handleDeleteBlog} />
      )}
    </>
  )
}

export default Blogs