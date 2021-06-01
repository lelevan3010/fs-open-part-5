import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  updateLike,
  deleteBlog
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const addOneLike = (blog) => {
    updateLike(blog.id, {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const deleteOneBlog = (blog) => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirm) {
      deleteBlog(blog.id)
    }
  }

  return (<div style={{ border: '1px solid black' }}>
    {blog.title}
    {' '}

    {!showDetails
    &&
    <button onClick={() => setShowDetails(true)}>View</button>
    }
    {showDetails
      &&
      <>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        <div className='like-item'>Likes {blog.likes ? blog.likes : '-'}</div>
        <button id='like-button' onClick={() => addOneLike(blog)}>Like</button>
        <button id='like-button' onClick={() => deleteOneBlog(blog)}>Delete</button>
        <button onClick={() => setShowDetails(false)}>Show less</button>
      </>}
  </div>)
}

Blog.propTypes = {
  blog       : PropTypes.object.isRequired,
  updateLike : PropTypes.func.isRequired,
  deleteBlog : PropTypes.func.isRequired
}

export default Blog
