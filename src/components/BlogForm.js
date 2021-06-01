import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl, setBlogFormVis }) => {


  return (<form onSubmit={addBlog}>
    <div>
      <label>title</label>
      <input
        id="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      <label>author</label>
      <input
        id="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      <label>url</label>
      <input
        id="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">save</button>
    <button onClick={() => setBlogFormVis(false)}>cancel</button>
  </form>)
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title:  PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author:PropTypes.string.isRequired,
  setAuthor:PropTypes.func.isRequired,
  url:PropTypes.string.isRequired,
  setUrl:PropTypes.func.isRequired,
  setBlogFormVis:PropTypes.func.isRequired,
}

export default BlogForm
